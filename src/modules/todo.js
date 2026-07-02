export default class Todo {
    constructor(title, description = "", dueDate = null, priority = "medium") {
        this.id = Date.now() + Math.random();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.createdAt = new Date();
        this.notes = "";
        this.checklist = [];
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

    setPriority(priority) {
        this.priority = priority;
    }

    updateDetails({ title, description, dueDate, priority, notes }) {
        if (title) this.title = title;
        if (description) this.description = description;
        if (dueDate) this.dueDate = dueDate;
        if (priority) this.priority = priority;
        if (notes !== undefined) this.notes = notes;
    }
}
