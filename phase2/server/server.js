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



// add route for /
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

  // if (req.accepts("html")) {
  //   // Send HTML response
  //   res.sendFile(path.join(__dirname, "/client_side/todo.html"));
  // } else if (req.accepts("json")) {
  //   // Send JSON response
  //   res.json({ todo });
  // } else {
  //   // Handle other formats (optional)
  //   res.status(406).send("Not Acceptable");
  // }
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
  console.log("todo id: " + id + " completed");
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

app.listen(4455, () => {
  console.log("App listening on port 4455");
});
