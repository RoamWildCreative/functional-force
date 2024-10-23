// NOTE: this is not a Salesforce example, this is a React example to illustrate the differences between state management in LWC. 
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    // Pure function to add todo
    const addTodo = (currentTodos, todoText) => {
        return [
            ...currentTodos,
            {
                id: Date.now(),
                text: todoText,
                completed: false
            }
        ];
    };

    // Pure function to toggle todo completion
    const toggleTodo = (currentTodos, todoId) => {
        return currentTodos.map(todo =>
            todo.id === todoId
                ? { ...todo, completed: !todo.completed }
                : todo
        );
    };

    // Pure function to remove todo
    const removeTodo = (currentTodos, todoId) => {
        return currentTodos.filter(todo => todo.id !== todoId);
    };

    // Handler functions that use the pure functions
    const handleAddTodo = () => {
        if (newTodo.trim()) {
            setTodos(currentTodos => addTodo(currentTodos, newTodo));
            setNewTodo('');
        }
    };

    const handleToggle = (id) => {
        setTodos(currentTodos => toggleTodo(currentTodos, id));
    };

    const handleRemove = (id) => {
        setTodos(currentTodos => removeTodo(currentTodos, id));
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Immutable Todo List</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2 mb-4">
                    <Input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add new todo"
                        className="flex-grow"
                    />
                    <Button onClick={handleAddTodo}>Add</Button>
                </div>
                <ul className="space-y-2">
                    {todos.map(todo => (
                        <li key={todo.id} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggle(todo.id)}
                                className="w-4 h-4"
                            />
                            <span className={`flex-grow ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                                {todo.text}
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemove(todo.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

export default TodoList;
