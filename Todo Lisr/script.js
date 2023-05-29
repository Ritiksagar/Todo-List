// Get the necessary elements
const input = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const clearButton = document.getElementById('clear-btn');
const completedCount = document.getElementById('completed-count');
const pendingCount = document.getElementById('pending-count');
const completedTasksContainer = document.getElementById('completed-tasks');

// Variables to keep track of task counts
let completedTasks = 0;
let pendingTasks = 0;

// Add event listener to the add button
addButton.addEventListener('click', function () {
  addTask();
});

// Add event listener to the input field to submit on Enter key press
input.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Function to add a new task
function addTask() {
  const task = input.value.trim(); // Remove leading/trailing white spaces

  if (task !== '') {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span class="task">${task}</span><div class="actions"><button class="edit-btn">...</button><button class="delete-btn space">X</button></div>`;
    todoList.appendChild(listItem);
    input.value = ''; // Clear the input field
    updateTaskCounts(0, 1); // Increment pendingTasks count
  }
}

// Function to update task counts
function updateTaskCounts(completedChange, pendingChange) {
  completedTasks += completedChange;
  pendingTasks += pendingChange;
  completedCount.textContent = completedTasks;
  pendingCount.textContent = pendingTasks;
}

// Add event listener to the list items to toggle completion
todoList.addEventListener('click', function (event) {
  const listItem = event.target;

  if (
    listItem.tagName === 'BUTTON' &&
    listItem.classList.contains('delete-btn')
  ) {
    const parentListItem = listItem.parentElement.parentElement;
    const isCompleted = parentListItem.classList.contains('completed');
    parentListItem.remove();

    if (isCompleted) {
      updateTaskCounts(-1, 0); // Decrement completedTasks count
    } else {
      updateTaskCounts(0, -1); // Decrement pendingTasks count
    }
  } else if (
    listItem.tagName === 'BUTTON' &&
    listItem.classList.contains('edit-btn')
  ) {
    const taskText = listItem.parentElement.previousElementSibling;
    const taskInput = document.createElement('input');
    taskInput.setAttribute('type', 'text');
    taskInput.value = taskText.textContent;
    taskText.innerHTML = '';
    taskText.appendChild(taskInput);
    taskInput.focus();

    taskInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        const newTask = taskInput.value.trim();
        if (newTask !== '') {
          taskText.innerHTML = newTask;
        }
      }
    });

    taskInput.addEventListener('blur', function () {
      const newTask = taskInput.value.trim();
      if (newTask !== '') {
        taskText.innerHTML = newTask;
      }
    });
  } else if (listItem.tagName === 'SPAN') {
    const parentListItem = listItem.parentElement;
    parentListItem.classList.toggle('completed');

    if (parentListItem.classList.contains('completed')) {
      updateTaskCounts(1, -1); // Increment completedTasks count, decrement pendingTasks count
    } else {
      updateTaskCounts(-1, 1); // Decrement completedTasks count, increment pendingTasks count
    }
  }
});

// Add event listener to the clear button
clearButton.addEventListener('click', function () {
  const completedItems = document.querySelectorAll('.completed');

  completedItems.forEach(function (completedItem) {
    const completedTaskText = completedItem.querySelector('.task').textContent;
    const completedTaskElement = document.createElement('div');
    completedTaskElement.classList.add('completed-task');
    completedTaskElement.textContent = completedTaskText;
    completedTasksContainer.appendChild(completedTaskElement);
    completedItem.remove();
    updateTaskCounts(-1, 0); // Decrement completedTasks count
  });
});
