document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("todoList");
  const completedList = document.getElementById("completedList");
  const form = document.getElementById("addTodoForm");

  loadTodos();
  console.log("DOM fully loaded and parsed");

  // Functions below --------------------------------------------------

  function createListItem(todo, parentList) {
    const li = document.createElement("li");
    li.innerText = todo.title + " - " + todo.description;

    // Create a completed button if the todo is not completed
    const completedButton = document.createElement("button");
    completedButton.innerText = "Completed";
    completedButton.addEventListener("click", () => {
      completedTodo(todo.id);
    });

    if (!todo.completed) {
      li.appendChild(completedButton);
    }

    // Create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteTodo(todo.id);
    });

    // Append the delete button to the list item
    li.appendChild(deleteButton);

    // Append the list item to the specified parent list
    parentList.appendChild(li);
  }

  function loadTodos() {
    fetch("/todo")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.todo)) {
          data.todo.forEach((todo) => {
            if (todo.completed) {
              createListItem(todo, completedList);
            } else {
              createListItem(todo, taskList);
            }
          });
        } else {
          console.error("Data.todo is not an array:", data.todo);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function completedTodo(todoId) {
    fetch(`/todo/${todoId}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // todo convert to jquery
        taskList.innerHTML = "";
        completedList.innerHTML = "";

        loadTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function deleteTodo(todoId) {
    fetch(`/todo/${todoId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // todo convert to jquery
        taskList.innerHTML = "";
        completedList.innerHTML = "";

        loadTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  }
});
