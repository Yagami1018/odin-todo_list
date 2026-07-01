import {} from "./style.css";

//DOM references
const taskBtn = document.querySelector(".form-btn");
const task = document.querySelector(".form-input");
const taskList = document.querySelector(".tasks-list");

//Functions
function addTask(name) {
    const listItem = document.createElement("li");
    const taskName = document.createElement("p");
    const buttons = document.createElement("div");
    const toggleBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    //Styles
    buttons.classList.add('task-btns')
    listItem.classList.add("task-item");
    taskName.classList.add("task-name");
    toggleBtn.classList.add("toggle-btn");
    removeBtn.classList.add("rm-btn");

    //Text Contents
    toggleBtn.textContent = "Toggle";
    removeBtn.textContent = "Remove";
    taskName.textContent = name;

    buttons.append(toggleBtn, removeBtn);
    listItem.append(taskName, buttons);
    taskList.appendChild(listItem);
}

//Handlers
const handleAddBtn = (event) => {
    event.preventDefault();
    if (task.value)
        addTask(task.value);
    task.value = ""
};

//Events
taskBtn.addEventListener("click", (e) => handleAddBtn(e));
