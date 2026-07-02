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
        if (["low", "medium", "high"].includes(priority)) {
            this.priority = priority;
        }
    }

    updateDetails({ title, description, dueDate, priority, notes }) {
        if (title) this.title = title;
        if (description !== undefined) this.description = description;
        if (dueDate !== undefined) this.dueDate = dueDate || null;
        if (priority) this.setPriority(priority);
        if (notes !== undefined) this.notes = notes;
    }

    addChecklistItem(item) {
        this.checklist.push({ id: Date.now(), text: item, completed: false });
    }

    removeChecklistItem(id) {
        this.checklist = this.checklist.filter((item) => item.id !== id);
    }

    toggleChecklistItem(id) {
        const item = this.checklist.find((i) => i.id === id);
        if (item) {
            item.completed = !item.completed;
        }
    }
}
