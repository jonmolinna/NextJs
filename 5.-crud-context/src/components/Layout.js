import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTasks } from '../context/taskContext';

const Layout = ({ children }) => {
    const router = useRouter();
    const { tasks } = useTasks();

    return (
        <div className='h-screen bg-gray-900 text-white'>
            <header className='flex items-center bg-gray-800 px-28 py-5'>
                <Link href="/">
                    <a>
                        <h1 className='font-black text-lg'>
                            Task App
                        </h1>
                    </a>
                </Link>
                <span className='ml-2 text-gray-400 font-bold'>
                    {tasks.length} tasks
                </span>
                <div className='flex-grow text-right'>
                    <button
                        onClick={() => router.push('/newTask')}
                        className='bg-green-600 hover:bg-green-500 px-3 py-1 rounded-md inline-flex items-center'
                    >
                        <AiOutlinePlus className='mr-2' />
                        Add Task
                    </button>
                </div>
            </header>
            <main className='px-28 py-10'>
                {children}
            </main>
        </div>
    )
};

export default Layout;