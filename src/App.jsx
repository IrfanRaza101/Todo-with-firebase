import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { setUser, clearUser } from './redux/authSlice';
import Auth from './components/Auth';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { todos } = useSelector(state => state.todos);
  const completedTodos = todos.filter(todo => todo.completed).length;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email
        }));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      {!user ? (
        <Auth />
      ) : (
        <>
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-indigo-600">TaskMaster</h1>
                  <div className="hidden md:flex ml-8 space-x-4">
                    <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                      Total: {todos.length}
                    </div>
                    <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                      Completed: {completedTodos}
                    </div>
                    <div className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm">
                      Pending: {todos.length - completedTodos}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="hidden md:block">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium">
                          {user.email[0].toUpperCase()}
                        </span>
                      </div>
                      <span className="text-gray-600">{user.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => auth.signOut()}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg 
                    border border-gray-300 hover:bg-gray-50 transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L8.414 10l2.293 2.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <TodoList />
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
