import Todo from "./todo.js";

export default class Project {
    constructor(name) {
        this.id = Date.now() + Math.random();
        this.name = name;
        this.todos = [];
        this.createdAt = new Date();
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(todoId) {
        this.todos = this.todos.filter((todo) => todo.id !== todoId);
    }

    getTodo(todoId) {
        return this.todos.find((todo) => todo.id === todoId);
    }

    getTodosByPriority(priority) {
        return this.todos.filter((todo) => todo.priority === priority);
    }

    getCompletedTodos() {
        return this.todos.filter((todo) => todo.completed);
    }

    getPendingTodos() {
        return this.todos.filter((todo) => !todo.completed);
    }

    updateName(name) {
        if (name && name.trim()) {
            this.name = name.trim();
        }
    }

    getTodoCount() {
        return this.todos.length;
    }

    getCompletedCount() {
        return this.getCompletedTodos().length;
    }

    getPendingCount() {
        return this.getPendingTodos().length;
    }

    sortTodosByDueDate() {
        return [...this.todos].sort((a, b) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    }

    sortTodosByPriority() {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return [...this.todos].sort((a, b) => {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }
}
