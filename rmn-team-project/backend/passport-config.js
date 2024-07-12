const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const AzureAdOAuth2Strategy = require("passport-azure-ad-oauth2");
const bcrypt = require("bcrypt");
const db = require("./dbconfig");
const jwt = require("jsonwebtoken");

passport.serializeUser((user, done) => {
  done(null, user.User_ID);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await db.query("SELECT * FROM Users WHERE User_ID = ?", [
      id,
    ]);
    done(null, rows[0]);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (token, tokenSecret, profile, done) => {
      try {
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const email = profile.emails[0].value;

        const [existingUser] = await db.query(
          "SELECT * FROM Users WHERE Email = ?",
          [email]
        );

        if (existingUser.length > 0) {
          return done(null, existingUser[0]);
        } else {
          const query =
            "INSERT INTO Users (First_Name, Second_Name, Email, Phone) VALUES (?, ?, ?, ?)";
          const values = [firstName, lastName, email, ""];

          const [result] = await db.query(query, values);
          const [newUser] = await db.query(
            "SELECT * FROM Users WHERE User_ID = ?",
            [result.insertId]
          );
          return done(null, newUser[0]);
        }
      } catch (error) {
        console.error("Error authenticating user with Google:", error);
        return done(error, null);
      }
    }
  )
);

passport.use(
  new AzureAdOAuth2Strategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/microsoft/callback",
      authorizationURL:
        "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
      tokenURL: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      scope: ["openid", "profile", "email"],
    },
    async (accessToken, refreshToken, params, profile, done) => {
      try {
        const decodedToken = jwt.decode(params.id_token);

        const email =
          decodedToken.preferred_username || decodedToken.email || "Unknown";
        const name = decodedToken.name || "Unknown Unknown";

        const [firstName, ...rest] = name.split(" ");
        const lastName = rest.join(" ") || "Unknown";

        const [existingUser] = await db.query(
          "SELECT * FROM Users WHERE Email = ?",
          [email]
        );

        if (existingUser.length > 0) {
          return done(null, existingUser[0]);
        } else {
          const query =
            "INSERT INTO Users (First_Name, Second_Name, Email, Phone) VALUES (?, ?, ?, ?)";
          const values = [firstName, lastName, email, ""];

          const [result] = await db.query(query, values);
          const [newUser] = await db.query(
            "SELECT * FROM Users WHERE User_ID = ?",
            [result.insertId]
          );
          return done(null, newUser[0]);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const [rows] = await db.query("SELECT * FROM Users WHERE Email = ?", [
          email,
        ]);
        if (rows.length === 0) {
          return done(null, false, { message: "Incorrect email." });
        }

        const user = rows[0];

        if (!user.password) {
          return done(null, false, {
            message:
              "Password not set for this user. Please log in using Google or Microsoft.",
          });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (error) {
        console.error("Error during authentication:", error);
        return done(error);
      }
    }
  )
);

module.exports = passport;
