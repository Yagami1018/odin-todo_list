import Todo from "./modules/todo";
import Project from "./modules/project";
import { saveProjects, loadProjects } from "./modules/storage";
import {} from "./styles/style.css";

let projects = [];
let currentProjectId = null;

function init() {
    const savedData = loadProjects();
    if (savedData && savedData.length > 0) {
        projects = savedData.map((projectData) => {
            const project = new Project(projectData.name);
            project.id = projectData.id;
            project.createdAt = projectData.createdAt || new Date();

            projectData.todos.forEach((todoData) => {
                const todo = new Todo(
                    todoData.title,
                    todoData.description || "",
                    todoData.dueDate || null,
                    todoData.priority || "medium",
                );
                todo.id = todoData.id;
                todo.completed = todoData.completed || false;
                todo.createdAt = todoData.createdAt || new Date();
                todo.notes = todoData.notes || "";
                todo.checklist = todoData.checklist || [];

                project.addTodo(todo);
            });
            return project;
        });
        currentProjectId = projects[0]?.id || null;
    } else {
        const defaultProject = new Project("Inbox");
        defaultProject.addTodo(
            new Todo(
                "Bienvenido",
                "Esta es tu primera tarea. ¡Empieza a organizar!",
                null,
                "medium",
            ),
        );
        projects.push(defaultProject);
        currentProjectId = defaultProject.id;
        saveProjects(projects);
    }
    render();
}
function render() {
    renderProjects();
    renderTodos();
}
function renderProjects() {
    const projectList = document.querySelector(".project-list");
    projectList.innerHTML = "";
    projects.forEach((project) => {
        const li = document.createElement("li");
        li.textContent = project.name;
        li.dataset.id = project.id;
        li.classList.toggle("active", project.id === currentProjectId);
        li.addEventListener("click", () => {
            currentProjectId = project.id;
            render();
        });
        projectList.appendChild(li);
    });
}
function renderTodos() {
    const currentProject = projects.find((p) => p.id === currentProjectId);
    if (!currentProject) return;
    const todoList = document.querySelector(".todo-list");
    todoList.innerHTML = "";

    currentProject.todos.forEach((todo) => {
        const div = document.createElement("div");
        div.className = "todo-item";
        div.dataset.id = todo.id;

        const priorityColors = {
            low: "green",
            medium: "orange",
            high: "red",
        };
        div.innerHTML = `
        <input type="checkbox" ${todo.completed ? "checked" : ""}>
        <span style="color: ${priorityColors[todo.priority]}; text-decoration: ${todo.completed ? "line-through" : "none"}">
            ${todo.title}
        </span>
        <span>${todo.dueDate ? formatDate(todo.dueDate) : "Sin fecha"}</span>
        <button class="edit-btn">📝</button>
        <button class="delete-btn">❌</button>
        `;

        //Eventos
        const checkbox = div.querySelector('input[type="checkbox"]');
        checkbox.addEventListener("change", () => {
            todo.toggleComplete();
            saveProjects();
            renderTodos();
        });

        const deleteBtn = div.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            if (confirm("Eliminar esta tarea?")) {
                currentProject.removeTodo(todo.id);
                saveProjects();
                renderTodos();
            }
        });

        const editBtn = div.querySelector(".edit-btn");
        editBtn.addEventListener("click", () => {
            showEditModal(todo);
        });

        todoList.appendChild(div);
    });
}

function showEditModal(todo) {
    //TODO crear modal con formulario para editar titulo, descripcion, fecha, prioridad, notas
}

import { format } from "date-fns";

function formatDate(date) {
    if (!date) return "";
    return format(new Date(date), "dd/MM/yyyy");
}

document.addEventListener("DOMContentLoaded", init);

document.querySelector(".add-project-btn")?.addEventListener("click", () => {
    const name = prompt("Nombre del Proyecto:");
    if (name) {
        const project = new Project(name);
        projects.push(project);
        currentProjectId = project.id;
        saveProjects(projects);
        render();
    }
});

document.querySelector(".add-todo-btn")?.addEventListener("click", () => {
    const title = prompt("Titulo de la tarea:");
    if (title) {
        const currentProject = projects.find((p) => p.id === currentProjectId);
        if (currentProject) {
            const todo = new Todo(title);
            currentProject.addTodo(todo);
            saveProjects(projects);
            renderTodos();
        }
    }
});
