const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

// Added routes

// todo maybe use old routes till phase 3 is done
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

// For base url
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/html/todo.html"));
});

// Added functions from database.js
const {
  createUser,
  getUserById,
  deleteUserById,
  getTodosByUserEmail,
  createTodo,
  completedTodoById,
  deleteTodoById,
} = require("./database.js");

// HTTP requests methods

// * Http requests for user
app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getUserById(id);
  res.json({ user });
});

app.post("/user", async (req, res) => {
  const { email, first_name, password } = req.body;
  const user = await createUser(email, first_name, password);
  res.status(201).json({ user });
});

app.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deleteUserById(id);
  console.log("user id: " + id + " deleted");
  res.status(200).json({ result });
});

// * Http requests for todo
// ! Might be getting cut out
// GET /todos
// app.get("/todo", async (req, res) => {
//   const todo = await getTodos();
//   res.json({ todo });
// });

// * Updated for phase 3
// GET todo by userId /todo/:UserId
app.get("/todo/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;
  const todos = await getTodosByUserEmail(userEmail);
  res.send({todos});
});

// * Updated for phase 3
// POST /todo/:userId
app.post("/todo/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;
  const { title, description } = req.body;
  const todo = await createTodo(userEmail, title, description);
  const todos = await getTodosByUserEmail(userEmail);
  console.log("todo id: " + todo.id + " created");
  res.status(201).json({ todo, todos });
});

// * This will have to have getTodoByUserEmail()
// Change complete status
app.put("/todo/:userEmail/:id", async (req, res) => {
  const id = req.params.id;
  const userEmail = req.params.userEmail;
  const result = await completedTodoById(id);
  const todos = await getTodosByUserEmail(userEmail);
  //console.log("todo id: " + id + " completed");
  //console.log(result);
  res.status(200).json({ result, todos });
});

// * Updated for phase 3
// Delete todo by id /todos/:id
app.delete("/todo/:userEmail/:id", async (req, res) => {
  const id = req.params.id;
  const userEmail = req.params.userEmail;
  const result = await deleteTodoById(id);
  const todos = await getTodosByUserEmail(userEmail)
  console.log("todo id: " + id + " deleted");
  res.status(200).json({ result, todos });
});

// * Every thing below here should be able to stay the same for phase 3
// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// for output addresses
const os = require("os");
const interfaces = os.networkInterfaces();
let localIpAddress;

// Find local IP address for admin display in terminal
for (const interfaceName in interfaces) {
  const interface = interfaces[interfaceName];
  for (const address of interface) {
    if (address.family === "IPv4" && !address.internal) {
      localIpAddress = address.address;
      break; // If you want to stop after finding the first local IP address
    }
  }
}

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
