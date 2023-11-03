const express = require("express");
const app = express();
const path = require("path");
const getIp = require('./getIp.js');
const os = require("os");
const interfaces = os.networkInterfaces();
const { confirmLogin } = require('./auth.js'); // Import the functions individually

const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Added routes
// For external files
app.use(
  "/client",
  express.static(path.join(__dirname, "../client/"))
);

app.use(
  "/js/",
  express.static(path.join(__dirname, "../client/js/"))
);

app.use(
  "/css/",
  express.static(path.join(__dirname, "../client/css/"))
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/html/login.html"));
});

// Routes for Pages
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/html/signup.html"));
});

// app.get("/logout", (req, res) => {  
//   console.log("user: " + req.params.email + " logged out");
//   res.clearCookie("userToken_" + req.params.email);
//   res.redirect("/");
// });

app.get("/:email", confirmLogin , (req, res) => {
  res.sendFile(path.join(__dirname, "../client/html/todo.html"));
});

// Added functions from database.js
const {  
  createUser,
  getUserByEmail,
  deleteUserByEmail,
  getTodosByUserEmail,
  createTodo,
  completedTodoById,
  deleteTodoById,
} = require("./database.js");

//!! 99.9% sure this is not needed
//const e = require("express");

// * Http requests for login
// POST /login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  const secret_key = process.env.SECRET_KEY;
  const key = secret_key + email;
  if (user && user.password === password) {
    // Use the email as both the payload and the secret key for signing the JWT
    const token = jwt.sign({ user: email }, key );

    // Create a unique cookie name for each user based on their email
    const userTokenCookieName = `userToken_${email}`;

    // Set the cookie with the userTokenCookieName and the token value
    res.cookie(userTokenCookieName, token, {
      httpOnly: true,
      maxAge: 3600000, // Set the cookie's maximum age in milliseconds
      path: '/', // Specify the cookie's path
    });

    // Redirect to the user's profile page with their email
    console.log("user: " + email + " logged in");
    res.redirect("/" + email);
  } else {
    // Redirect to the login page
    res.redirect("/");
  }
});

// GET /logout
app.get("/logout/:email", async (req, res) => {
  const email = req.params.email.replace(/:/g, ''); 
  
  const userTokenCookieName = `userToken_${email}`;
  console.log("user: " + email + " logged out");
  
  // Clear the cookie by setting an expired date
  res.cookie( userTokenCookieName, "", {
    expires: new Date(0), // Set the expiration date to a past date
    path: "/", // Make sure the path matches the one used when setting the cookie
  });

  res.redirect("/");
});

// TODO: Error handling for all requests
// * Http requests for user
// GET user by id /user/:id
app.get("/user/:email", async (req, res) => {
  const email = req.params.email;
  const user = await getUserByEmail(email);
  res.json({ user });
});

// Create user
app.post("/user", async (req, res) => {
  const { email, first_name, password } = req.body;
  try {
    const user = await createUser(email, first_name, password);
    res.redirect("/"); // Redirect to the login page
  } catch (error) {
    console.log(error.message);
    res.redirect("/signup"); // Redirect to the signup page
  }
});

// Delete user by id /user/:id
app.delete("/user/:email", async (req, res) => {
  const email = req.params.email;
  const result = await deleteUserByEmail(email);
  if (result.affectedRows === 1) {console.log("user email: " + email + " deleted")}
  else {console.log("user email: " + email + " not found")}
  res.status(200).json({ result });
});

// * Http requests for todo
// GET todo by userId /todo/:UserId
app.get("/todo/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;
  //const verify = await verifyToken(userEmail)(req, res);
  const todos = await getTodosByUserEmail(userEmail); 
  res.send({ todos });  
});

// POST /todo/:userEmail
app.post("/todo/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;
  const { title, description } = req.body;
  const todo = await createTodo(userEmail, title, description);
  const todos = await getTodosByUserEmail(userEmail);
  console.log("todo id: " + todo.id + " created");
  res.status(201).json({ todo, todos });
});

// Change complete status
app.put("/todo/:userEmail/:id", async (req, res) => {
  const id = req.params.id;
  const userEmail = req.params.userEmail;
  const result = await completedTodoById(id);
  const todos = await getTodosByUserEmail(userEmail);
  console.log("todo id: " + id + " completed toggled");
  //console.log(result);
  res.status(200).json({ result, todos });
});

// Delete todo by id /todos/:id
app.delete("/todo/:userEmail/:id", async (req, res) => {
  const id = req.params.id;
  const userEmail = req.params.userEmail;
  const result = await deleteTodoById(id);
  const todos = await getTodosByUserEmail(userEmail)
  console.log("todo id: " + id + " deleted");
  res.status(200).json({ result, todos });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const localIpAddress = getIp(interfaces);

// Display server address to admin in terminal
app.listen(4455, () => {
  if (process.platform === "win32") {
    console.log("\x1B[2J\x1B[3J\x1Bc"); // Clear the terminal (Windows Command Prompt)
  } else {
    console.log("\x1Bc"); // Clear the terminal (Unix-like terminals)
  }

  console.log(`\x1b[31m
  ___________        .___          _____                 
  \\__    ___/___   __| _/____     /  _  \\ ______ ______  
    |    | /  _ \\ / __ |/  _ \\   /  /_\\  \\\\____ \\\\____ \\ 
    |    |(  <_> ) /_/ (  <_> ) /    |    \\  |_> >  |_> >
    |____| \\____/\\____ |\\____/  \\____|__  /   __/|   __/ 
                      \\/                \\/|__|   |__|
  \x1b[0m\x1b[32m  
        listening on port 4455\x1b[0m\x1b[37m
        
        \x1b[34mLocal links:\x1b[0m

        \x1b[33m \u{1F5F9}\x1b[0m http://localhost:4455
        \x1b[33m \u{1F5F9}\x1b[0m http://${localIpAddress}:4455
        
        \x1b[0m`);        
});

