$(document).ready(function() {
$("#newTask").focus();
    // Define the click event handler for the "Add" button
    $("#addButton").click(function() {
        // Get the task input value
        let taskInput = $("#newTask");
        let task = taskInput.val();

        // Create a new list item
        let listItem = $("<li>").text(task);
        // Create "Remove" and "Complete" buttons
        let removeButton = $("<button>").text("Remove");
        let completeButton = $("<button>").text("Complete");

        // Append buttons to the list item
        listItem.append(removeButton, completeButton);

         // Define click event handler for the "Remove" button
         removeButton.click(function() {
            listItem.remove();
        });

        // Define click event handler for the "Complete" button
        completeButton.click(function() {
            let listlItemComplete = listItem.css("text-decoration", "line-through");
            // Remove the "Complete" button
            completeButton.remove();
            // Remove the "Remove" button
            $("#doneList").append(listlItemComplete);            
        });
        
        // Add the list item to the todoList
        $("#todoList").append(listItem);

        // Clear the task input
        taskInput.val("");
    });

    // Add keypress "enter" event listener to taskInput
    $("#newTask").keypress(function(event) {
        if (event.keyCode === 13) {
            $("#addButton").click();
        }
    });
});

