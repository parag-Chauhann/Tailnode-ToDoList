import React, { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import ToDoList from './Components/ToDoList/ToDoList';

function App() {
  const [tasks, setTasks] = useState([]);

  // Function to reset tasks
  const resetTasks = () => {
    setTasks([]);
    // You can also remove tasks from local storage here if needed
  };

  return (
    <div className="App">
      <Navbar onResetTasks={resetTasks} />
      <ToDoList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
