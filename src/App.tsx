import React, { useState } from 'react';
// import Task from './components/Task/Task'
import TodoList from './components/TodoList/TodoList';
// import Sidebar from './components/Sidebar/Sidebar'
import './App.scss';


function App() {
  return (
    <div className="app-container">
      <TodoList />
    </div>
  );
}

export default App;
