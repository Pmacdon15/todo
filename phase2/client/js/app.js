document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("todoList");
  const completedList = document.getElementById("completedList");
  const form = document.getElementById("addTodoForm");

  loadTodos();
  console.log("DOM fully loaded and parsed");

  // Event listeners below --------------------------------------------
  form.addEventListener("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Call the addTodo function
    addTodo();
  });

  // Functions below --------------------------------------------------

  function createListItem(todo, parentList) {
    const li = document.createElement("li");
  
    // Create a completed button if the todo is not completed
    const completedCheckbox = document.createElement("input");
    completedCheckbox.type = "checkbox";
    completedCheckbox.checked = todo.completed; // Set the initial checked state based on the todo's completion status
    completedCheckbox.addEventListener("change", () => {
      // Call the completedTodo function when the checkbox state changes
      completedTodo(todo.id);
    });
  
    // Append the checkbox to the list item before the text
    li.appendChild(completedCheckbox);
  
    // Create a text span to display the title and description
    const textSpan = document.createElement("span");
    textSpan.innerText = todo.title + " - " + todo.description;
  
    // Append the text span to the list item after the checkbox
    li.appendChild(textSpan);
  
    // Create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteTodo(todo.id);
    });
  
    // Append the delete button to the list item after the text
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

  function addTodo() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const todo = { title, description };

    fetch("/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
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
