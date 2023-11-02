$(document).ready(function () {
  const taskList = $("#todoList");
  const completedList = $("#completedList");
  const form = $("#addTodoForm");

  // Get user email from url

  const userEmail = getUserEmail();
 
  // * Event listeners below --------------------------------------------
  // Only applies on main todo page not login or sign up
  if (userEmail !== "login" && userEmail !== "sign up") {
    loadTodos(userEmail)
    form.on("submit", function (event) {
      event.preventDefault();
      addTodo(userEmail);
    });
  }  

  // * Functions below --------------------------------------------------
  function getUserEmail() {
    const url = window.location.href;       
   
    const pathParts = url.split("/");
    const userEmail = pathParts.pop(); // Call the 'pop' method to remove and retrieve the last part
    console.log("user: " + userEmail);
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
    $.get("/todo/" + userEmail)
      .done(function (data) {
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
          console.error("Data.todos is not an array:", data.todos);
        }
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.error("Request failed:", textStatus, errorThrown);
  
        if (jqXHR.status === 401) {
          // Handle 401 Unauthorized error here, such as redirecting to the root page
          window.location.href = "/";
        }
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
