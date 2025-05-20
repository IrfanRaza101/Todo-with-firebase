# Modern Todo App

A feature-rich Todo application built with React, Firebase, Redux, and styled with Tailwind CSS. This application provides a seamless user experience for managing tasks with real-time synchronization and user authentication.

## Features

- 🔐 **User Authentication**
  - Email/Password login
  - Google Sign-in
  - Secure user sessions

- 📝 **Todo Management**
  - Create, Read, Update, and Delete todos
  - Real-time synchronization with Firebase
  - Mark todos as complete/incomplete
  - User-specific todo lists

- 💾 **Data Persistence**
  - Firebase Realtime Database integration
  - Local storage backup
  - Offline support

- 🎨 **Modern UI**
  - Clean and responsive design
  - Tailwind CSS styling
  - Custom color schemes
  - Smooth transitions and animations

## Tech Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Authentication**: Firebase Auth
- **Database**: Firebase Realtime Database
- **Styling**: Tailwind CSS
- **Form Validation**: Zod

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-react.git
   cd todo-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project
   - Enable Authentication (Email/Password and Google Sign-in)
   - Create a Realtime Database
   - Copy your Firebase configuration to `src/firebase/config.js`

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/          # React components
│   ├── Auth.jsx        # Authentication component
│   ├── TodoList.jsx    # Todo list management
│   └── AddTodo.jsx     # New todo creation
├── firebase/           # Firebase configuration
│   └── config.js
├── redux/              # Redux state management
│   ├── store.js
│   ├── authSlice.js
│   └── todoSlice.js
└── assets/            # Static assets
```

## Styling

The application uses Tailwind CSS with custom configuration:
- Custom color palette
- Responsive design
- Custom component classes
- Modern shadow effects

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
