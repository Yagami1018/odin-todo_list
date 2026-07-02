
import Todo from "./todo";

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
}