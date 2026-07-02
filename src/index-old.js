import Todo from "./modules/todo";
import Project from "./modules/project";
import { saveProjects, loadProjects } from "./modules/storage";
import {} from "./styles/style.css";

//DOM references
const taskBtn = document.querySelector(".form-btn");
const task = document.querySelector(".form-input");
const taskList = document.querySelector(".tasks-list");

//DOM Elements Creating Functions
function saveToLocalStorage() {
    const tasks = [];
    document.querySelectorAll(".task-item").forEach((item) => {
        const taskName = item.querySelector(".task-name");
        const cleanText = taskName.textContent.replace(/^\d+\.?\s*/, "");
        const isCompleted = taskName.style.textDecoration === "line-through";
        tasks.push({ name: cleanText, completed: isCompleted });
    });
    localStorage.setItem("todos", JSON.stringify(tasks));
}
function loadFromLocalStorage() {
    const stored = localStorage.getItem("todos");
    if (stored) {
        const tasks = JSON.parse(stored);
        tasks.forEach((task) => addTask(task.name, task.completed, true));
    }
}
function renumberTasks() {
    const litems = document.querySelectorAll("p");
    litems.forEach((text, index) => {
        const replace = text.textContent.replace(/^\d+\.?\s*/, "");
        text.textContent = `${index + 1}. ${replace}`;
    });
}
function addTask(name, completed = false, save = true) {
    const taskNumber = document.querySelectorAll(".task-name").length + 1;
    let toggled = completed;
    //Created Elements
    const listItem = document.createElement("li");
    const taskName = document.createElement("p");
    const buttons = document.createElement("div");
    const toggleBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    //Styles
    buttons.classList.add("task-btns");
    listItem.classList.add("task-item");
    taskName.classList.add("task-name");
    toggleBtn.classList.add("toggle-btn");
    removeBtn.classList.add("rm-btn");

    //Text Contents
    toggleBtn.textContent = "Toggle";
    removeBtn.textContent = "Remove";
    taskName.textContent = `${taskNumber}. ${name}`;

    if (completed) {
        taskName.style.textDecoration = "line-through";
    }

    //Button Events
    toggleBtn.addEventListener("click", () => {
        taskName.style.textDecoration = toggled ? "" : "line-through";
        toggled = !toggled;
        if (save) saveToLocalStorage();
    });
    removeBtn.addEventListener("click", () => {
        listItem.remove();
        renumberTasks();
        if (save) saveToLocalStorage();
    });

    buttons.append(toggleBtn, removeBtn);
    listItem.append(taskName, buttons);
    taskList.appendChild(listItem);
    if (save) saveToLocalStorage();
}

//Handlers
const handleAddBtn = (event) => {
    event.preventDefault();
    if (task.value) addTask(task.value);
    task.value = "";
};

//Events
taskBtn.addEventListener("click", (e) => handleAddBtn(e));
document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    if (document.querySelectorAll(".task-name").length === 0)
        addTask("Walk the Dog");
});
