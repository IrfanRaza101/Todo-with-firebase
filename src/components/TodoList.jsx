import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { setTodos, updateTodo, deleteTodo } from '../redux/todoSlice';
import AddTodo from './AddTodo';

export default function TodoList() {
  const { user } = useSelector(state => state.auth);
  const { todos } = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  useEffect(() => {
    if (!user) return;

    // Load todos from localStorage first
    const localTodos = JSON.parse(localStorage.getItem(`todos_${user.uid}`) || '[]');
    dispatch(setTodos(localTodos));

    // Set up real-time listener for Firestore
    const q = query(collection(db, 'todos'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map(doc => doc.data());
      dispatch(setTodos(todosData));
      // Update localStorage
      localStorage.setItem(`todos_${user.uid}`, JSON.stringify(todosData));
    });

    return () => unsubscribe();
  }, [user, dispatch]);

  const handleToggle = async (todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await updateDoc(doc(db, 'todos', todo.id), updatedTodo);
      dispatch(updateTodo(updatedTodo));
      
      // Update localStorage
      const localTodos = JSON.parse(localStorage.getItem(`todos_${user.uid}`) || '[]');
      const updatedLocalTodos = localTodos.map(t => t.id === todo.id ? updatedTodo : t);
      localStorage.setItem(`todos_${user.uid}`, JSON.stringify(updatedLocalTodos));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async (todoId) => {
    try {
      await deleteDoc(doc(db, 'todos', todoId));
      dispatch(deleteTodo(todoId));
      
      // Update localStorage
      const localTodos = JSON.parse(localStorage.getItem(`todos_${user.uid}`) || '[]');
      const updatedLocalTodos = localTodos.filter(t => t.id !== todoId);
      localStorage.setItem(`todos_${user.uid}`, JSON.stringify(updatedLocalTodos));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEdit = async (todo) => {
    if (editingId === todo.id) {
      try {
        const updatedTodo = { ...todo, title: editingTitle };
        await updateDoc(doc(db, 'todos', todo.id), updatedTodo);
        dispatch(updateTodo(updatedTodo));
        
        // Update localStorage
        const localTodos = JSON.parse(localStorage.getItem(`todos_${user.uid}`) || '[]');
        const updatedLocalTodos = localTodos.map(t => t.id === todo.id ? updatedTodo : t);
        localStorage.setItem(`todos_${user.uid}`, JSON.stringify(updatedLocalTodos));
        
        setEditingId(null);
        setEditingTitle('');
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    } else {
      setEditingId(todo.id);
      setEditingTitle(todo.title);
    }
  };
  return (
    <div className="flex justify-center items-start min-h-[calc(100vh-6rem)] w-full py-6">
      <div className="w-full max-w-2xl px-4">
        <AddTodo userId={user.uid} />
        
        <div className="space-y-4 w-full">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 
              border border-gray-100 transform hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo)}
                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 
                    focus:ring-indigo-500 transition duration-150 ease-in-out"
                  />
                  
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleEdit(todo)}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      autoFocus
                    />
                  ) : (
                    <span className={`flex-1 text-gray-700 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                      {todo.title}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="p-1 text-gray-500 hover:text-indigo-600 rounded-full 
                    hover:bg-indigo-50 transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="p-1 text-gray-500 hover:text-red-600 rounded-full 
                    hover:bg-red-50 transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                {new Date(todo.createdAt).toLocaleDateString()} • 
                {todo.completed ? ' Completed' : ' In Progress'}
              </div>
            </div>
          ))}
          
          {todos.length === 0 && (
            <div className="text-center py-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <svg className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">No tasks yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating your first task above.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
