export function saveProjects(projects) {
    try {
        const data = projects.map((project) => ({
            id: project.id,
            name: project.name,
            createdAt: project.createdAt,
            todos: project.todos.map((todo) => ({
                id: todo.id,
                title: todo.title,
                description: todo.description,
                dueDate: todo.dueDate,
                priority: todo.priority,
                completed: todo.completed,
                createdAt: todo.createdAt,
                notes: todo.notes,
                checklist: todo.checklist,
            })),
        }));
        localStorage.setItem("projects", JSON.stringify(data));
    } catch (error) {
        console.error("Error guardando: ", error);
    }
}
export function loadProjects() {
    try {
        const data = localStorage.getItem("projects");
        if (!data) return null;
        const parsed = JSON.parse(data);
        return parsed;
    } catch (error) {
        console.error("Error cargando: ", error);
        return null;
    }
}
export function clearStorage() {
    localStorage.removeItem("projects");
}
