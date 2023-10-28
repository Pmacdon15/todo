document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("todoList");
    const completedList = document.getElementById("completedList");
    const form = document.getElementById("addTodoForm");

    // Function to create a list item with a delete button
    function createListItem(todo, parentList) {
        const li = document.createElement("li");
        li.innerText = todo.title;
        
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

    // Get all todos
    fetch('/todo')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data.todo)) {
                data.todo.forEach(todo => {
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
        .catch(error => console.error(error));

    console.log("DOM fully loaded and parsed");

    function deleteTodo(todoId) {
        fetch(`/todo/${todoId}`, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // You can refresh the lists after deleting a todo if needed
            // For example, you can clear the lists and re-fetch the data
        })
        .catch(error => console.error(error));
    }
});
