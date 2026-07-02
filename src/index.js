import Todo from "./modules/todo.js";
import Project from "./modules/project.js";
import { saveProjects, loadProjects } from "./modules/storage.js";
import {
    renderProjects,
    renderTodos,
    updateProjectTitle,
    showEditModal,
    setupModalCloseListeners,
} from "./modules/dom.js";
import {
    setupProjectEvents,
    setupTodoEvents,
    setupModalEvents,
} from "./modules/events.js";
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
                "Welcome!",
                "This is your first task. Start organizing!",
                null,
                "medium",
            ),
        );
        projects.push(defaultProject);
        currentProjectId = defaultProject.id;
        saveProjects(projects);
    }

    setupEventListeners();
    render();
}

function setupEventListeners() {
    setupProjectEvents(handleAddProject);
    setupTodoEvents(handleAddTodo);
    setupModalCloseListeners(() => render());
    setupModalEvents();
}

function render() {
    const currentProject = projects.find((p) => p.id === currentProjectId);
    if (!currentProject) return;

    renderProjects(projects, currentProjectId, handleSelectProject);
    updateProjectTitle(currentProject.name);
    renderTodos(
        currentProject.todos,
        handleToggleTodo,
        handleDeleteTodo,
        handleEditTodo,
    );
}

function handleSelectProject(projectId) {
    currentProjectId = projectId;
    render();
}

function handleToggleTodo(todoId) {
    const currentProject = projects.find((p) => p.id === currentProjectId);
    if (!currentProject) return;

    const todo = currentProject.getTodo(todoId);
    if (todo) {
        todo.toggleComplete();
        saveProjects(projects);
        render();
    }
}

function handleDeleteTodo(todoId) {
    if (!confirm("Delete this task?")) return;

    const currentProject = projects.find((p) => p.id === currentProjectId);
    if (!currentProject) return;

    currentProject.removeTodo(todoId);
    saveProjects(projects);
    render();
}

function handleEditTodo(todo) {
    showEditModal(todo, handleSaveEditedTodo);
}

function handleSaveEditedTodo(todoId, updatedData) {
    const currentProject = projects.find((p) => p.id === currentProjectId);
    if (!currentProject) return;

    const todo = currentProject.getTodo(todoId);
    if (todo) {
        todo.updateDetails(updatedData);
        saveProjects(projects);
        render();
    }
}

function handleAddProject(name) {
    const project = new Project(name);
    projects.push(project);
    currentProjectId = project.id;
    saveProjects(projects);
    render();
}

function handleAddTodo(title) {
    const currentProject = projects.find((p) => p.id === currentProjectId);
    if (!currentProject) return;

    const todo = new Todo(title);
    currentProject.addTodo(todo);
    saveProjects(projects);
    render();
}

document.addEventListener("DOMContentLoaded", init);
