$(document).ready(function () {
  const taskList = $("#todoList");
  const completedList = $("#completedList");
  const form = $("#addTodoForm");

  // Get user email from url

  const userEmail = getUserEmail();
  // Load todos by user email
  loadTodos(userEmail);

  // * Event listeners below --------------------------------------------
  form.on("submit", function (event) {
    event.preventDefault();
    addTodo(userEmail);
  });

  // * Functions below --------------------------------------------------
  function getUserEmail() {
    const url = window.location.href;
    //const parts = url.split('/');

    
    // const route = parts[1]; // The first part
    // const userEmail = parts[2]; // The second part
    const pathParts = url.split("/");
    const userEmail = pathParts.pop(); // Call the 'pop' method to remove and retrieve the last part
    console.log("user: " + userEmail );
    return userEmail;
  }

  function createListItem(todo, parentList) {
    const li = $("<li></li>").addClass("list-group-item");

    const completedCheckbox = $("<input type='checkbox'>")
      .addClass("form-check-input")
      .prop("checked", todo.completed)
      .on("change", function () {
        completedTodo(todo.id);
      });

    li.append(completedCheckbox);

    const textSpan = $("<span></span>").text(
      " " + todo.title + " " + " - " + " " + todo.description + " "
    );

    li.append(textSpan);

    const deleteButton = $("<button>Delete</button>")
      .addClass("btn btn-outline-primary btn-sm")
      .on("click", function () {
        deleteTodo(todo.id);
      });

    li.append(deleteButton);

    parentList.append(li);
  }

  function loadTodos(userEmail) {
    $.get("/todo/" + userEmail, function (data) {
      console.log(data);
      if (Array.isArray(data.todos)) {
        data.todos.forEach(function (todos) {
          if (todos.completed) {
            createListItem(todos, completedList);
          } else {
            createListItem(todos, taskList);
          }
        });
      } else {
        console.error("Data.todo is not an array:", data.todos);
      }
    }).fail(function (error) {
      console.error(error);
    });
  }

  function addTodo(userEmail) {
    const title = $("#title").val();
    const description = $("#description").val();
    const todo = { title, description };

    $.ajax({
      url: "/todo/" + userEmail,
      type: "POST",
      contentType: "application/json", // Set the content type for JSON
      data: JSON.stringify(todo), // Serialize the todo object to JSON
      success: function (data) {
        console.log(data);
        taskList.empty();
        completedList.empty();
        loadTodos(userEmail);
      },
      error: function (error) {
        console.error(error);
      },
    });
  }

  function completedTodo(todoId) {
    $.ajax({
      url: `/todo/${userEmail}/${todoId}`,
      type: "PUT",
      success: function (data) {
        console.log(data);
        taskList.empty();
        completedList.empty();
        loadTodos(userEmail);
      },
      error: function (error) {
        console.error(error);
      },
    });
  }

  function deleteTodo(todoId) {
    $.ajax({
      url: `/todo/${userEmail}/${todoId}`,
      type: "DELETE",
      success: function (data) {
        console.log(data);
        taskList.empty();
        completedList.empty();
        loadTodos(userEmail);
      },
      error: function (error) {
        console.error(error);
      },
    });
  }
});
