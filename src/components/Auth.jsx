import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/config';
import { setUser, setError, setLoading } from '../redux/authSlice';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const userCredential = isLogin
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);
      
      dispatch(setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email
      }));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const handleGoogleSignIn = async () => {
    dispatch(setLoading(true));
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      dispatch(setUser({
        uid: result.user.uid,
        email: result.user.email
      }));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {isLogin ? 'Welcome back!' : 'Create your account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin ? 'Enter your details to access your account' : 'Fill in the details to get started'}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg 
                  text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                  transition duration-150 ease-in-out"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg 
                  text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                  transition duration-150 ease-in-out"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                transition duration-150 ease-in-out transform hover:scale-[1.02]"
              >
                {isLogin ? 'Sign in' : 'Create account'}
              </button>
              
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 
                bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 
                hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </form>
          
          <div className="text-center">
            <button
              type="button"
              className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
