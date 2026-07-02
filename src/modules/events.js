export function setupProjectEvents(onAddProject) {
    const addProjectBtn = document.querySelector(".add-project-btn");
    if (addProjectBtn) {
        addProjectBtn.addEventListener("click", () => {
            const name = prompt("Project name:");
            if (name && name.trim()) {
                onAddProject(name.trim());
            }
        });
    }
}

export function setupTodoEvents(onAddTodo) {
    const addTodoBtn = document.querySelector(".add-todo-btn");
    if (addTodoBtn) {
        addTodoBtn.addEventListener("click", () => {
            const title = prompt("Task title:");
            if (title && title.trim()) {
                onAddTodo(title.trim());
            }
        });
    }
}

export function setupModalEvents() {
    const closeButtons = document.querySelectorAll(".close-modal");
    const modal = document.getElementById("edit-modal");

    closeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            modal.classList.add("hidden");
        });
    });

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });
}
