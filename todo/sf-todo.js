// todoList.js
import { LightningElement, track } from 'lwc';

export default class TodoList extends LightningElement {
    @track todos = [];
    newTodoText = '';

    // Pure function to add todo
    addTodo(currentTodos, todoText) {
        return [
            ...currentTodos,
            {
                id: Date.now(),
                text: todoText,
                completed: false
            }
        ];
    }

    // Pure function to toggle todo completion
    toggleTodo(currentTodos, todoId) {
        return currentTodos.map(todo =>
            todo.id === todoId
                ? { ...todo, completed: !todo.completed }
                : todo
        );
    }

    // Pure function to remove todo
    removeTodo(currentTodos, todoId) {
        return currentTodos.filter(todo => todo.id !== todoId);
    }

    // Event handlers
    handleInputChange(event) {
        this.newTodoText = event.target.value;
    }

    handleAddTodo() {
        if (this.newTodoText.trim()) {
            // Create new array with added todo
            this.todos = this.addTodo(this.todos, this.newTodoText);
            this.newTodoText = '';
        }
    }

    handleToggle(event) {
        const todoId = parseInt(event.target.dataset.todoId);
        this.todos = this.toggleTodo(this.todos, todoId);
    }

    handleRemove(event) {
        const todoId = parseInt(event.target.dataset.todoId);
        this.todos = this.removeTodo(this.todos, todoId);
    }
}