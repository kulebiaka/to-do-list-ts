import React, { useState } from 'react';
import logo from './logo.svg';
import Task from './components/Task/Task'
import TodoList from './components/TodoList/TodoList';
import './App.scss';


function App() {
  return (
    <div className="app-container">
      <TodoList />
    </div>
  );
}

export default App;
