const express = require("express");
const app = express();

const path = require("path");

app.use(express.json());

// Add routes here
// Serve the entire "client" directory as static content
//app.use(express.static(path.join(__dirname, "../client/js")));
// app.use(
//   "/client/js",
//   express.static(path.join(__dirname, "../client/js"))
// );

app.get("/js/app.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/js/app.js"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/html/todo.html"));
});

const {
  getTodos,
  getTodo,
  createTodo,
  completedTodoById,
  deleteTodoById,
} = require("./database.js");

app.get("/todo", async (req, res) => {
  const todo = await getTodos();
  res.json({ todo });
});

app.get("/todo/:id", async (req, res) => {
  const id = req.params.id;
  const note = await getTodo(id);
  res.send(note);
});

app.post("/todo", async (req, res) => {
  const { title, description } = req.body;
  const todo = await createTodo(title, description);
  const todos = await getTodo(); 
  console.log("todo id: " + todo.id + " created");
  res.status(201).json({ todo, todos });
});

app.put("/todo/:id", async (req, res) => {
  const id = req.params.id;
  const result = await completedTodoById(id);
  const todo = await getTodos();
  //console.log("todo id: " + id + " completed");
  //console.log(result);
  res.status(200).json({ result, todo });
});

app.delete("/todo/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deleteTodoById(id);
  const todo = await getTodos();
  console.log("todo id: " + id + " deleted");
  res.status(200).json({ result, todo });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// for output addresses
const os = require('os');
const interfaces = os.networkInterfaces();
let localIpAddress;

for (const interfaceName in interfaces) {
  const interface = interfaces[interfaceName];
  for (const address of interface) {
    if (address.family === 'IPv4' && !address.internal) {
      localIpAddress = address.address;
      break; // If you want to stop after finding the first local IP address
    }
  }
}

app.listen(4455, () => {
  console.log(`\x1b[31m
    ___________        .___          _____                 
    \\__    ___/___   __| _/____     /  _  \\ ______ ______  
      |    | /  _ \\ / __ |/  _ \\   /  /_\\  \\\\____ \\\\____ \\ 
      |    |(  <_> ) /_/ (  <_> ) /    |    \\  |_> >  |_> >
      |____| \\____/\\____ |\\____/  \\____|__  /   __/|   __/ 
                        \\/                \\/|__|   |__|
  \x1b[0m\x1b[32m  
          listening on port 4455\x1b[0m\x1b[37m
          
          Local links:
          
          http://localhost:4455
          http://${localIpAddress}:4455
          
          \x1b[0m`);
});
