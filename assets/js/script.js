// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Function to generate a unique task id
function generateTaskId() {
  const id = nextId++;
  localStorage.setItem("nextId", JSON.stringify(nextId));
  return id;
}

// Function to create a task card
function createTaskCard(task) {
  const deadline = dayjs(task.deadline);
  const now = dayjs();
  let bgColor = "due-future"; // Default to due-future (white)

  if (deadline.isBefore(now, 'day')) {
    bgColor = "past-due"; // Red for past due
  } else if (deadline.isSame(now, 'day')) {
    bgColor = "due-today"; // Yellow for due today
  } else if (task.status === "done") {
    bgColor = "done"; // White for done
  }

  return `
    <div class="card task-card ${bgColor}" data-id="${task.id}" data-due-date="${task.deadline}">
      <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.description}</p>
        <small class="text-muted">Due: ${deadline.format("YYYY-MM-DD")}</small>
        <button class="btn btn-danger btn-sm mt-2 delete-task">Delete</button>
      </div>
    </div>`;
}

// Function to render the task list and make cards draggable
function renderTaskList() {
  const todoList = $("#todo-cards");
  const inProgressList = $("#in-progress-cards");
  const doneList = $("#done-cards");

  todoList.empty();
  inProgressList.empty();
  doneList.empty();

  taskList.forEach((task) => {
    const cardHTML = createTaskCard(task);
    if (task.status === "to-do") {
      todoList.append(cardHTML);
    } else if (task.status === "in-progress") {
      inProgressList.append(cardHTML);
    } else if (task.status === "done") {
      doneList.append(cardHTML);
    }
  });

  makeCardsDraggable();
  applyDueDateStyles();
}

// Function to make task cards draggable
function makeCardsDraggable() {
  $(".task-card").draggable({
    revert: "invalid",
    stack: ".task-card",
    helper: "clone",
  });
}

// Function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const title = $("#task-title").val().trim();
  const description = $("#task-desc").val().trim();
  const deadline = $("#task-deadline").val();

  if (!title || !deadline) return alert("Title and deadline are required!");

  const newTask = {
    id: generateTaskId(),
    title,
    description,
    deadline,
    status: "to-do",
  };

  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  $("#formModal").modal("hide");
  renderTaskList();
}

// Function to handle deleting a task
function handleDeleteTask(event) {
  const taskId = $(event.target).closest(".task-card").data("id");
  taskList = taskList.filter((task) => task.id != taskId);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

// Function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const taskId = ui.helper.data("id");
  const newStatus = $(event.target).closest(".card").attr("id").replace("-cards", "");

  taskList = taskList.map((task) =>
    task.id === taskId ? { ...task, status: newStatus } : task
  );

  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

// Function to apply due date styles to task cards
function applyDueDateStyles() {
  const tasks = document.querySelectorAll('.task-card');
  const today = dayjs().startOf('day');

  tasks.forEach(task => {
    const dueDate = dayjs(task.dataset.dueDate);

    if (dueDate.isBefore(today, 'day')) {
      task.classList.add('past-due');
    } else if (dueDate.isSame(today, 'day')) {
      task.classList.add('due-today');
    } else {
      task.classList.add('due-future');
    }

    if (task.closest('#done-cards')) {
      task.classList.remove('past-due', 'due-today', 'due-future');
      task.classList.add('done');
    }
  });
}

// When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();

  $("#task-deadline").datepicker({
    dateFormat: "yy-mm-dd"
  });
  $("#add-task-form").on("submit", handleAddTask);
  $(document).on("click", ".delete-task", handleDeleteTask);

  $(".card-body").droppable({
    accept: ".task-card",
    drop: handleDrop,
  });
});