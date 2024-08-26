// Get the input field, buttons, and task list
let taskInput = document.getElementById('task-input');
let addTaskBtn = document.getElementById('add-task-btn');
let cancelBtn = document.getElementById('cancel-btn');
let taskList = document.getElementById('task-list');

// Add an event listener to the add task button
addTaskBtn.addEventListener('click', addTask);

// Add an event listener to the input field for Enter key press
taskInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Add an event listener to the document for Ctrl + / key press
document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === '/') {
    taskInput.value = '';
    taskInput.focus();
    taskInput.setSelectionRange(taskInput.value.length, taskInput.value.length);
  }
});

// Add an event listener to the cancel button
cancelBtn.addEventListener('click', function() {
  // Clear the input field
  taskInput.value = '';
});

// Function to add a task
function addTask() {
  // Get the task text from the input field
  let taskText = taskInput.value.trim();

  // Check if the input field is empty
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  // Create a new list item
  let taskListItem = document.createElement('li');
  taskListItem.textContent = taskText;

  // Add a remove button to the list item
  let removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'remove-btn';
  removeBtn.addEventListener('click', function() {
    // Remove the list item
    taskList.removeChild(taskListItem);
  });
  taskListItem.appendChild(removeBtn);

  // Add the list item to the task list
  taskList.appendChild(taskListItem);

  // Clear the input field
  taskInput.value = '';
}