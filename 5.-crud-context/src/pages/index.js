import React from 'react';
import { useTasks } from '../context/taskContext';
import Layout from '../components/Layout';
import { VscTrash } from 'react-icons/vsc';
import { useRouter } from 'next/router';

const Home = () => {
  const { tasks, deleteTask } = useTasks();
  const router = useRouter();

  return (
    <Layout>
      <div className='flex justify-center'>
        {
          tasks.length === 0 ? (
            <h3>There are no Tasks</h3>
          ) : (
            <div className='w-7/12'>
              {
                tasks.map((task, index) => (
                  <div
                    key={task.id}
                    onClick={() => router.push(`/edit/${task.id}`)}
                    className="bg-gray-700 hover:bg-gray-600 cursor-pointer px-20 py-5 m-2 flex justify-start items-center"
                  >
                    <span className='text-5xl mr-5'>{index + 1}</span>
                    <div className='w-full'>
                      <div className='flex justify-between'>
                        <h1 className='font-bold'>
                          {task.title}
                        </h1>
                        <button
                          onClick={(e) => {
                            // parar la propagacion
                            e.stopPropagation();
                            deleteTask(task.id)
                          }}
                          className='bg-red-700 hover:bg-red-600 px-3 py-1 rounded-md inline-flex items-center'
                        >
                          <VscTrash className='mr-2' />
                          Delete
                        </button>
                      </div>
                      <p className='text-gray-300'>
                        {task.description}
                      </p>
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    </Layout>
  )
}

export default Home