import { format } from "date-fns";

const priorityColors = {
    low: "#2ecc71",
    medium: "#f39c12",
    high: "#e74c3c",
};

export function renderProjects(
    projects,
    currentProjectId,
    onProjectSelect,
    onProjectDelete,
) {
    const projectList = document.querySelector(".project-list");
    projectList.innerHTML = "";

    projects.forEach((project) => {
        const li = document.createElement("li");
        const completedCount = project.getCompletedCount();
        const totalCount = project.getTodoCount();
        li.textContent = `${project.name} (${totalCount})`;
        li.dataset.id = project.id;
        li.className = project.id === currentProjectId ? "active" : "";

        li.addEventListener("click", () => onProjectSelect(project.id));

        // Add context menu for delete/edit
        li.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            showProjectContextMenu(li, project.id, onProjectDelete);
        });

        projectList.appendChild(li);
    });
}

export function renderTodos(todos, onTodoComplete, onTodoDelete, onTodoEdit) {
    const todoList = document.querySelector(".todo-list");
    todoList.innerHTML = "";

    if (todos.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.className = "empty-message";
        emptyMsg.textContent = "No tasks yet. Add one to get started!";
        todoList.appendChild(emptyMsg);
        return;
    }

    todos.forEach((todo) => {
        const div = document.createElement("div");
        div.className = `todo-item ${todo.completed ? "completed" : ""}`;
        div.dataset.id = todo.id;

        div.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? "checked" : ""}>
            <div class="todo-content">
                <span class="todo-title" style="color: ${priorityColors[todo.priority]}">
                    ${escapeHtml(todo.title)}
                </span>
                <span class="todo-date">${todo.dueDate ? formatDate(todo.dueDate) : "No date"}</span>
            </div>
            <div class="todo-actions">
                <button class="todo-edit-btn" title="Edit">📝</button>
                <button class="todo-delete-btn" title="Delete">🗑️</button>
            </div>
        `;

        // Event listeners
        const checkbox = div.querySelector(".todo-checkbox");
        checkbox.addEventListener("change", () => onTodoComplete(todo.id));

        const deleteBtn = div.querySelector(".todo-delete-btn");
        deleteBtn.addEventListener("click", () => onTodoDelete(todo.id));

        const editBtn = div.querySelector(".todo-edit-btn");
        editBtn.addEventListener("click", () => onTodoEdit(todo));

        todoList.appendChild(div);
    });
}

export function updateProjectTitle(projectName) {
    const title = document.querySelector("#project-title");
    if (title) {
        title.textContent = projectName;
    }
}

export function showEditModal(todo, onSave) {
    const modal = document.getElementById("edit-modal");
    const form = document.getElementById("edit-form");

    // Populate form with todo data
    document.getElementById("edit-title").value = todo.title;
    document.getElementById("edit-description").value = todo.description;
    document.getElementById("edit-due-date").value = todo.dueDate
        ? formatDateForInput(todo.dueDate)
        : "";
    document.getElementById("edit-priority").value = todo.priority;
    document.getElementById("edit-notes").value = todo.notes;

    modal.classList.remove("hidden");

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = {
            title: document.getElementById("edit-title").value,
            description: document.getElementById("edit-description").value,
            dueDate: document.getElementById("edit-due-date").value || null,
            priority: document.getElementById("edit-priority").value,
            notes: document.getElementById("edit-notes").value,
        };
        onSave(todo.id, updatedData);
        closeModal();
    };

    // Remove any previous listeners to avoid duplicates
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    document
        .getElementById("edit-form")
        .addEventListener("submit", handleSubmit);
}

export function closeModal() {
    const modal = document.getElementById("edit-modal");
    modal.classList.add("hidden");
    document.getElementById("edit-form").reset();
}

export function setupModalCloseListeners(onClose) {
    const modal = document.getElementById("edit-modal");
    const closeButtons = document.querySelectorAll(".close-modal");

    closeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            closeModal();
            onClose?.();
        });
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
            onClose?.();
        }
    });
}

function showProjectContextMenu(element, projectId, onDelete) {
    // Invoke delete callback; confirmation is handled by the caller
    onDelete?.(projectId);
}

function formatDate(date) {
    if (!date) return "";
    try {
        return format(new Date(date), "dd/MM/yyyy");
    } catch {
        return "";
    }
}

function formatDateForInput(date) {
    if (!date) return "";
    try {
        return format(new Date(date), "yyyy-MM-dd");
    } catch {
        return "";
    }
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

export { formatDate };
