import { createContext, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

export const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([
        { id: "1", title: "first task", description: "description 1" },
    ]);

    const createTask = (task) => {
        setTasks([...tasks, { ...task, id: uuid() }])
    };

    const updateTask = (id, task) => {
        setTasks([
            ...tasks.map(item => item.id === id ? { ...item, ...task } : item)
        ])
    };

    const deleteTask = id => setTasks([...tasks.filter(task => task.id !== id)])

    return (
        <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    )
}