$(document).ready(function () {
  const taskList = $("#todoList");
  const completedList = $("#completedList");
  const form = $("#addTodoForm");

  loadTodos();
  //console.log("DOM fully loaded and parsed");

  // Event listeners below --------------------------------------------
  form.on("submit", function (event) {
    event.preventDefault();
    addTodo();
  });

  // Functions below --------------------------------------------------

function createListItem(todo, parentList) {
    const li = $("<li></li>").addClass("list-group-item");

    const completedCheckbox = $("<input type='checkbox'>").addClass("form-check-input")
        .prop("checked", todo.completed)  
        .on("change", function () {
            completedTodo(todo.id);
        });

    li.append(completedCheckbox);

    const textSpan = $("<span></span>").text(
        " " + todo.title + " " + " - " + " " +todo.description + " " 
    );

    li.append(textSpan);

    const deleteButton = $("<button>Delete</button>").addClass("btn btn-outline-primary btn-sm").on("click", function () {
        deleteTodo(todo.id);
    });

    li.append(deleteButton);

    parentList.append(li);
}

  function loadTodos() {
    $.get("/todo", function (data) {
      if (Array.isArray(data.todo)) {
        data.todo.forEach(function (todo) {
          if (todo.completed) {
            createListItem(todo, completedList);
          } else {
            createListItem(todo, taskList);
          }
        });
      } else {
        console.error("Data.todo is not an array:", data.todo);
      }
    }).fail(function (error) {
      console.error(error);
    });
  }

  function addTodo() {
    const title = $("#title").val();
    const description = $("#description").val();
    const todo = { title, description };
  
    $.ajax({
      url: "/todo",
      type: "POST",
      contentType: "application/json", // Set the content type for JSON
      data: JSON.stringify(todo), // Serialize the todo object to JSON
      success: function (data) {
        console.log(data);
        taskList.empty();
        completedList.empty();
        loadTodos();
      },
      error: function (error) {
        console.error(error);
      },
    });
  }
  
  function completedTodo(todoId) {
    $.ajax({
      url: `/todo/${todoId}`,
      type: "PUT",
      success: function (data) {
        console.log(data);
        taskList.empty();
        completedList.empty();
        loadTodos();
      },
      error: function (error) {
        console.error(error);
      },
    });
  }

  function deleteTodo(todoId) {
    $.ajax({
      url: `/todo/${todoId}`,
      type: "DELETE",
      success: function (data) {
        console.log(data);
        taskList.empty();
        completedList.empty();
        loadTodos();
      },
      error: function (error) {
        console.error(error);
      },
    });
  }
});
