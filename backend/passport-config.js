const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const AzureAdOAuth2Strategy = require("passport-azure-ad-oauth2");
const bcrypt = require("bcrypt");
const db = require("./dbconfig");
const jwt = require("jsonwebtoken");

// Serialize user into the session
passport.serializeUser((user, done) => {
  // Store the user ID in the session
  done(null, user.User_ID);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    // Get the user details from the database using the user ID
    const [rows] = await db.query("SELECT * FROM Users WHERE User_ID = ?", [
      id,
    ]);
    done(null, rows[0]);
  } catch (error) {
    done(error, null);
  }
});

// Set up Google OAuth strategy for authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (token, tokenSecret, profile, done) => {
      try {
        // Extract user information from the Google profile
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const email = profile.emails[0].value;

        // Check if the user already exists in the database
        const [existingUser] = await db.query(
          "SELECT * FROM Users WHERE Email = ?",
          [email]
        );

        // User exists, return the existing user
        if (existingUser.length > 0) {
          return done(null, existingUser[0]);
        } else {
          // User does not exist, create a new user
          const query =
            "INSERT INTO Users (First_Name, Second_Name, Email, Phone) VALUES (?, ?, ?, ?)";
          const values = [firstName, lastName, email, ""];

          // Insert the new user into the database
          const [result] = await db.query(query, values);
          // Retrieve the newly created user details
          const [newUser] = await db.query(
            "SELECT * FROM Users WHERE User_ID = ?",
            [result.insertId]
          );
          // Return the new user
          return done(null, newUser[0]);
        }
      } catch (error) {
        console.error("Error authenticating user with Google:", error);
        return done(error, null);
      }
    }
  )
);

// Azure AD OAuth
passport.use(
  new AzureAdOAuth2Strategy(
    //
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
        // Decode the ID token from Azure AD
        const decodedToken = jwt.decode(params.id_token);

        // Extract user information from the decoded token
        const email =
          decodedToken.preferred_username || decodedToken.email || "Unknown";
        const name = decodedToken.name || "Unknown Unknown";

        // Split the name into first and last name
        const [firstName, ...rest] = name.split(" ");
        const lastName = rest.join(" ") || "Unknown";

        // Check if the user already exists in the database
        const [existingUser] = await db.query(
          "SELECT * FROM Users WHERE Email = ?",
          [email]
        );

        // User exists, return the existing user. otherwise create a new user
        if (existingUser.length > 0) {
          return done(null, existingUser[0]);
        } else {
          const query =
            "INSERT INTO Users (First_Name, Second_Name, Email, Phone) VALUES (?, ?, ?, ?)";
          const values = [firstName, lastName, email, ""];

          // Insert the new user into the database
          const [result] = await db.query(query, values);
          // Retrieve the newly created user details
          const [newUser] = await db.query(
            "SELECT * FROM Users WHERE User_ID = ?",
            [result.insertId]
          );
          // Return new user
          return done(null, newUser[0]);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// local strategy for username and password authentication
passport.use(
  new LocalStrategy(
    // Set the username field to email
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Get the user from the database using the email
        const [rows] = await db.query("SELECT * FROM Users WHERE Email = ?", [
          email,
        ]);
        // if no user found with the given email return incorrect email
        if (rows.length === 0) {
          return done(null, false, { message: "Incorrect email." });
        }

        const user = rows[0];

        // Check if the user has set a password
        if (!user.password) {
          return done(null, false, {
            message:
              "Password not set for this user. Please log in using Google or Microsoft.",
          });
        }

        // Compare the provided password with the stored hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // Password does not match
          return done(null, false, { message: "Incorrect password." });
        }

        // Reach here, user authenticatec successfully
        return done(null, user);
      } catch (error) {
        console.error("Error during authentication:", error);
        return done(error);
      }
    }
  )
);

module.exports = passport;
