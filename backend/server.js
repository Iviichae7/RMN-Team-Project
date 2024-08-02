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

// app.get("/", (req, res) => {
//   res.send("This works!");
// });

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

  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    return res.status(400);
  }

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
      userId: user.User_ID,
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.get("/api/tickets/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const getTicketsQuery = `
      SELECT Tickets.*, 
             Users.First_Name, 
             Users.Second_Name, 
             Agents.First_Name AS Agent_First_Name, 
             Agents.Second_Name AS Agent_Second_Name 
      FROM Tickets
      JOIN Users ON Tickets.User_ID = Users.User_ID 
      LEFT JOIN Users AS Agents ON Tickets.Agent = Agents.User_ID
      WHERE Tickets.User_ID = ?`;
    const [tickets] = await db.query(getTicketsQuery, [userId]);
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch ticket correspondence
app.get("/api/ticket-correspondence/:ticketId", async (req, res) => {
  const ticketId = req.params.ticketId;

  try {
    const getCorrespondenceQuery = `
      SELECT Messages.*, Users.First_Name, Users.Second_Name 
      FROM Messages
      JOIN Tickets ON Messages.Ticket_ID = Tickets.Ticket_ID
      JOIN Users ON Tickets.User_ID = Users.User_ID
      WHERE Messages.Ticket_ID = ? 
      ORDER BY Messages.Created_At ASC`;
    const [correspondence] = await db.query(getCorrespondenceQuery, [ticketId]);
    res.status(200).json(correspondence);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new correspondence message to a ticket
app.post("/api/ticket-correspondence", async (req, res) => {
  const { ticketId, message, sender } = req.body;

  if (!ticketId || !message || !sender) {
    return res
      .status(400)
      .json({ message: "Ticket ID, message, and sender are required" });
  }

  const isAdmin = sender === "IT Support";

  try {
    const insertMessageQuery = `
      INSERT INTO Messages (Ticket_ID, Message, Sender)
      VALUES (?, ?, ?)`;
    await db.query(insertMessageQuery, [
      ticketId,
      message,
      isAdmin ? "IT Support" : sender,
    ]);

    const [newMessage] = await db.query(
      "SELECT * FROM Messages WHERE Ticket_ID = ? ORDER BY Created_At DESC LIMIT 1",
      [ticketId]
    );

    res.status(201).json(newMessage[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Submit Ticket
app.post("/submit-ticket", async (req, res) => {
  const { subject, description, category, userId: userIdFromBody } = req.body;
  const userId = req.user ? req.user.User_ID : userIdFromBody;
  const status = "open";

  if (!subject || !description || !category) {
    return res
      .status(400)
      .json({ message: "Subject, description, and category are required" });
  }

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const insertTicketQuery =
      "INSERT INTO Tickets (Subject, Description, Category, Status, User_ID) VALUES (?, ?, ?, ?, ?)";
    await db.query(insertTicketQuery, [
      subject,
      description,
      category,
      status,
      userId,
    ]);
    res.status(201).json({ message: "Ticket submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch all tickets for Admins
app.get("/api/tickets", async (req, res) => {
  try {
    const getTicketsQuery = `
      SELECT Tickets.*, 
             Users.First_Name, 
             Users.Second_Name, 
             Agents.First_Name AS Agent_First_Name, 
             Agents.Second_Name AS Agent_Second_Name 
      FROM Tickets
      LEFT JOIN Users ON Tickets.User_ID = Users.User_ID
      LEFT JOIN Users AS Agents ON Tickets.Agent = Agents.User_ID
      ORDER BY Tickets.Ticket_ID DESC`;
    const [tickets] = await db.query(getTicketsQuery);
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update ticket status, priority, and agent
app.put("/api/tickets/:ticketId", async (req, res) => {
  const ticketId = req.params.ticketId;
  const updates = req.body;

  try {
    const updateTicketQuery = `UPDATE Tickets SET ? WHERE Ticket_ID = ?`;
    await db.query(updateTicketQuery, [updates, ticketId]);
    res.status(200).json({ message: "Ticket updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch admin users
app.get("/api/admins", async (req, res) => {
  try {
    const getAdminsQuery = `SELECT User_ID, First_Name, Second_Name FROM Users WHERE Role = 'admin'`;
    const [admins] = await db.query(getAdminsQuery);
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new remote support ticket
app.post("/api/remote-support-tickets", async (req, res) => {
  const { userId, anydeskID, description } = req.body;

  if (!userId || !anydeskID || !description) {
    return res
      .status(400)
      .json({ message: "User ID, AnyDesk ID, and description are required" });
  }

  try {
    const insertTicketQuery =
      "INSERT INTO RemoteSupportTickets (User_ID, AnyDesk_ID, Description, Status) VALUES (?, ?, ?, 'Pending')";
    await db.query(insertTicketQuery, [userId, anydeskID, description]);

    res
      .status(201)
      .json({ message: "Remote support ticket created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch all remote support tickets for Admin
app.get("/api/remote-support-tickets", async (req, res) => {
  try {
    const getTicketsQuery = `
      SELECT RemoteSupportTickets.*, Users.First_Name, Users.Second_Name
      FROM RemoteSupportTickets
      JOIN Users ON RemoteSupportTickets.user_id = Users.User_ID
      ORDER BY RemoteSupportTickets.id ASC`;
    const [tickets] = await db.query(getTicketsQuery);
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update remote support ticket
app.put("/api/remote-support-tickets/:ticketId", async (req, res) => {
  const ticketId = req.params.ticketId;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    const updateTicketQuery = `
      UPDATE RemoteSupportTickets
      SET status = ?
      WHERE id = ?`;
    await db.query(updateTicketQuery, [status, ticketId]);
    res.status(200).json({ message: "Ticket updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const stripeRoutes = require("./stripe");

app.use("/api", stripeRoutes);

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
