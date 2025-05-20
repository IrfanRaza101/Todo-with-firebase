import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { addTodo } from '../redux/todoSlice';

export default function AddTodo({ userId }) {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      userId,
      createdAt: new Date().toISOString()
    };

    try {
      // Add to Firestore
      await setDoc(doc(db, 'todos', newTodo.id), newTodo);
      
      // Add to Redux store
      dispatch(addTodo(newTodo));
      
      // Add to localStorage
      const localTodos = JSON.parse(localStorage.getItem(`todos_${userId}`) || '[]');
      localStorage.setItem(`todos_${userId}`, JSON.stringify([...localTodos, newTodo]));
      
      // Clear input after successful save
      setTitle('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 w-full">
      <div className="flex gap-3 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setTitle('')}
            placeholder="Add a new task..."
            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
            placeholder:text-gray-400 transition-all duration-200"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg
          hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 
          transform transition-all duration-200 hover:scale-105 shadow-md whitespace-nowrap"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Task
        </button>
      </div>
    </form>
  );
}
