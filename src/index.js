import {} from "./style.css";

//DOM references
const taskBtn = document.querySelector(".form-btn");
const task = document.querySelector(".form-input");

//Functions
const handleAddBtn = (event) => {
    event.preventDefault();
    let text = task.value;
    console.log(`Hello stupid ${text}`);
};

//Events
taskBtn.addEventListener("click", (e) => handleAddBtn(e));
