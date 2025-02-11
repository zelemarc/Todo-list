const addButton = document.getElementById("btn");
const inputDate = document.getElementById("inputDate");
const inputText = document.getElementById("inputText");
const tasks = document.getElementById("tasks");

loadTasks();

function addTask() {
  const task = inputText.value.trim();
  const taskdate = inputDate.value;

  if (task && taskdate) {
    createTaskElement(task, taskdate);

    inputText.value = "";
    inputDate.value = "";

    saveTasks();
  } else {
    alert("Please enter text and date!");
  }
}

addButton.addEventListener("click", addTask);

function createTaskElement(task, taskdate) {
  const listItem = document.createElement("li");
  listItem.id = "task";
  

  const paragraph1 = document.createElement("p");
  paragraph1.id="name";
  paragraph1.textContent = `${task}`;
  listItem.appendChild(paragraph1);

  const container = document.createElement("div");
  container.id="containerintask";
  listItem.appendChild(container);

  const paragraph2 = document.createElement("p");
  paragraph2.id="date";
  paragraph2.textContent = `${taskdate}`;
  container.appendChild(paragraph2);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "deletetask";

  deleteButton.addEventListener("click", function () {
    tasks.removeChild(listItem);
    saveTasks();
  });

  container.appendChild(deleteButton);
  tasks.appendChild(listItem);
}

function saveTasks() {
  let taskList = [];
  tasks.querySelectorAll("li").forEach(function (item) {
    const taskText = item.querySelector("#name").textContent.trim();
    const taskDate = item.querySelector("#date").textContent.trim().replace(/[()]/g, "");
    taskList.push({ text: taskText, date: taskDate });
  });

  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function loadTasks() {
  const taskList = JSON.parse(localStorage.getItem("tasks")) || [];

  taskList.forEach((task) => {
    createTaskElement(task.text, task.date);
  });
}

