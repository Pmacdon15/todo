const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

// Added routes
app.get("/js/app.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/js/app.js"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/html/todo.html"));
});

// Added functions from database.js
const {
  getTodos,
  getTodo,
  createTodo,
  completedTodoById,
  deleteTodoById,
} = require("./database.js");

// HTTP methods

// GET /todos
app.get("/todo", async (req, res) => {
  const todo = await getTodos();
  res.json({ todo });
});

// GET todo by id /todos/:id
app.get("/todo/:id", async (req, res) => {
  const id = req.params.id;
  const note = await getTodo(id);
  res.send(note);
});

// POST /todos
app.post("/todo", async (req, res) => {
  const { title, description } = req.body;
  const todo = await createTodo(title, description);
  const todos = await getTodo();
  console.log("todo id: " + todo.id + " created");
  res.status(201).json({ todo, todos });
});

// Change complete status
app.put("/todo/:id", async (req, res) => {
  const id = req.params.id;
  const result = await completedTodoById(id);
  const todo = await getTodos();
  //console.log("todo id: " + id + " completed");
  //console.log(result);
  res.status(200).json({ result, todo });
});

// Delete todo by id /todos/:id
app.delete("/todo/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deleteTodoById(id);
  const todo = await getTodos();
  console.log("todo id: " + id + " deleted");
  res.status(200).json({ result, todo });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// for output addresses
const os = require("os");
const interfaces = os.networkInterfaces();
let localIpAddress;

for (const interfaceName in interfaces) {
  const interface = interfaces[interfaceName];
  for (const address of interface) {
    if (address.family === "IPv4" && !address.internal) {
      localIpAddress = address.address;
      break; // If you want to stop after finding the first local IP address
    }
  }
}

//console.clear();
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

          \x1b[33m \u{1F5F9}\x1b[0m http://localhost:44555
          \x1b[33m \u{1F5F9}\x1b[0m http://${localIpAddress}:4455
          
          \x1b[0m`);
});
