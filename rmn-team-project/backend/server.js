require("dotenv").config();
require("./passport-config");
const db = require("./dbconfig");

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard");
  }
);

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
    }
    res.redirect("http://localhost:3000/");
  });
});

app.post("/api/register", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO Users (First_Name, Second_Name, Email, Phone, password) VALUES (?, ?, ?, ?, ?)";
    const values = [firstName, lastName, email, phoneNumber, hashedPassword];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Error registering user" });
      } else {
        res.status(201).json({ message: "User registered successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Login failed" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: "Login successful" });
    });
  })(req, res, next);
});

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
