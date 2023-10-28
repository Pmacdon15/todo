document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("todoList");
    const completedList = document.getElementById("completedList");
    const form = document.getElementById("addTodoForm");

    // Get all todos
    fetch('/todo')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data.todo)) {
                data.todo.forEach(todo => {
                    if (todo.completed) {
                        const li = document.createElement("li");
                        li.innerText = todo.title;
                        completedList.appendChild(li);
                    } else {
                        const li = document.createElement("li");
                        li.innerText = todo.title;
                        taskList.appendChild(li);
                    }
                });
            } else {
                console.error("Data.todo is not an array:", data.todo);
            }
        })
        .catch(error => console.error(error));

    console.log("DOM fully loaded and parsed");

        
})
