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
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/google", (req, res, next) => {
  const { redirectToPlans } = req.query;
  const state = redirectToPlans === "true" ? "redirectToPlans" : "noRedirect";
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state,
  })(req, res, next);
});

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: true }),
  (req, res) => {
    const redirectToPlans = req.query.state === "redirectToPlans";
    if (redirectToPlans) {
      res.redirect("http://localhost:3000/dashboard/plans");
    } else {
      res.redirect("http://localhost:3000/dashboard");
    }
  }
);

app.get("/auth/microsoft", (req, res, next) => {
  const { redirectToPlans } = req.query;
  const state = redirectToPlans === "true" ? "redirectToPlans" : "noRedirect";
  passport.authenticate("azure_ad_oauth2", {
    scope: ["openid", "profile", "email"],
    state,
  })(req, res, next);
});

app.get(
  "/auth/microsoft/callback",
  passport.authenticate("azure_ad_oauth2", {
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    const redirectToPlans = req.query.state === "redirectToPlans";
    if (redirectToPlans) {
      res.redirect("http://localhost:3000/dashboard/plans");
    } else {
      res.redirect("http://localhost:3000/dashboard");
    }
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
    const [existingUser] = await db.query(
      "SELECT * FROM Users WHERE Email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      if (!existingUser[0].password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const updateQuery =
          "UPDATE Users SET First_Name = ?, Second_Name = ?, Phone = ?, password = ? WHERE Email = ?";
        const updateValues = [
          firstName,
          lastName,
          phoneNumber,
          hashedPassword,
          email,
        ];

        await db.query(updateQuery, updateValues);
        return res.status(200).json({ message: "User updated successfully" });
      } else {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery =
      "INSERT INTO Users (First_Name, Second_Name, Email, Phone, password) VALUES (?, ?, ?, ?, ?)";
    const insertValues = [
      firstName,
      lastName,
      email,
      phoneNumber,
      hashedPassword,
    ];

    await db.query(insertQuery, insertValues);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
});

app.post("/api/addUser", async (req, res) => {
  const { firstName, lastName, email, phone, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery = `
      INSERT INTO Users (First_Name, Second_Name, Email, Phone, password, role)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE First_Name = VALUES(First_Name), Second_Name = VALUES(Second_Name), Phone = VALUES(Phone), password = VALUES(password), role = VALUES(role)
    `;
    const insertValues = [
      firstName,
      lastName,
      email,
      phone,
      hashedPassword,
      role,
    ];
    await db.query(insertQuery, insertValues);
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding user" });
  }
});

app.get("/api/userRole", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ role: req.user.role });
  } else {
    res.status(401).json({ message: "Unauthorized" });
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
      const isAdmin = user.role === "admin";
      return res.status(200).json({
        message: "Login successful",
        isAdmin,
        user: { firstName: user.First_Name, lastName: user.Second_Name },
      });
    });
  })(req, res, next);
});

app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    res.json({
      firstName: user.First_Name,
      lastName: user.Second_Name,
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

//Database Connections - Tickets

//Submit Ticket
app.post('/submit-ticket', (req, res) => {
  const { title, description, category, priority, user, admin } = req.body;

  const submitTicketQuery = 'CALL insertTicket(?, ?, ?, ?, ?)';
  db.query(submitTicketQuery, [title, description, category, priority, user], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Server Error');
      return;
    }
    res.send('Ticket submitted successfully');
  });
});

//Get Ticket via ID
app.get('/ticket/:id', (req, res) => {
  const ticketId = req.params.id;

  const getTicketQuery = 'CALL getTicket(?)';
  db.query(getTicketQuery, [ticketId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Server Error');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Ticket not found');
      return;
    }

    res.json(results[0]);
  });
});

//Get Ticket via Admin ID - To display on Admin Dashboard
app.get('/ticket/:adminid', (req, res) => {
  const adminID = req.params.adminid;

  const getAdminTicketQuery = 'CALL adminTickets(?)';
  db.query(getAdminTicketQuery, [adminID], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Server Error');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('No Tickets Available');
      return;
    }

    res.json(results[0]);
  });
});

//Get Ticket via User ID - To display on User Dashboard
app.get('/ticket/:userid', (req, res) => {
  const userID = req.params.userid;

  const getUserTicketQuery = 'CALL userTickets(?)';
  db.query(getUserTicketQuery, [userID], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Server Error');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('No Tickets Available');
      return;
    }

    res.json(results[0]);
  });
});