import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useTasks } from '../context/taskContext';
import { useRouter } from 'next/router'

const TaskFormPage = () => {
    const [task, setTask] = useState({
        title: "",
        description: ""
    });
    const { createTask, updateTask, tasks } = useTasks();
    const router = useRouter();

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (router.query.id) {
            updateTask(router.query.id, task)
        } else {
            createTask(task);
        }
        router.push("/")
    };

    useEffect(() => {
        if (router.query.id) {
            const task = tasks.find(task => task.id === router.query.id);
            setTask({ title: task.title, description: task.description })
        }
    }, []);

    return (
        <Layout>
            <div className='flex justify-center items-center h-full'>
                <form onSubmit={handleSubmit} className="bg-gray-700 p-10 h-2/4">
                    <h1 className='text-3xl mb-7'>
                        {router.query.id ? 'Update a Task' : 'Add a Task'}
                    </h1>
                    <input
                        type="text"
                        name='title'
                        placeholder='Write a title'
                        value={task.title}
                        onChange={handleChange}
                        className='bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5'
                    />
                    <textarea
                        rows="2"
                        placeholder='Write a description'
                        name='description'
                        value={task.description}
                        onChange={handleChange}
                        className='bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5'
                    >
                    </textarea>
                    <button
                        className='bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md disabled:opacity-30'
                        disabled={!(task.title && task.description)}
                        type='submit'
                    >
                        Save
                    </button>
                </form>
            </div>
        </Layout>
    )
};

export default TaskFormPage;