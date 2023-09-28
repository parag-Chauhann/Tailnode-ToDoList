import React, { useState, useEffect } from 'react';
import add from "./Img/3669476_add_circle_ic_icon.png";
import editImg from "./Img/8666681_edit_icon.png";
import deleteImg from './Img/326606_delete_icon.png';
import updateImg from './Img/5402417_refresh_rotate_sync_update_reload_icon.png';
import "./ToDoList.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

function ToDoList({ tasks, setTasks }) {
  const [toDoLists, setToDoLists] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, [setTasks]);

  const handleChange = (e) => {
    setToDoLists(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (toDoLists === "") {
      alert("Please Add task");
    } else {
      if (editIndex === -1) {
        const newTask = { text: toDoLists, completed: false };
        setTasks((prevTasks) => {
          const updatedTasks = [newTask, ...prevTasks]; // Add the new task at the beginning
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));
          return updatedTasks;
        });
        setToDoLists('');
      } else {
        setTasks((prevTasks) => {
          const updatedTasks = [...prevTasks];
          updatedTasks[editIndex].text = toDoLists;
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));
          return updatedTasks;
        });
        setEditIndex(-1);
        setToDoLists('');
      }
    }
  };

  const toggleCompletion = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );

    rearrangeTasks();
  };

  const rearrangeTasks = () => {
    setTasks((prevTasks) => [
      ...prevTasks.filter((task) => !task.completed),
      ...prevTasks.filter((task) => task.completed),
    ]);
  };

  const handleDelete = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setToDoLists(tasks[index].text);
  };

  return (
    <div className='toDoTask'>
      <h1>Add Your To Do Task</h1>
      <form onSubmit={handleSubmit} className='addToDo'>
        <input
          type="text"
          placeholder='Add your daily task here...'
          value={toDoLists}
          onChange={handleChange}
        />
        <img
          onClick={handleSubmit}
          className="add"
          alt={editIndex === -1 ? 'submit' : 'update'}
          src={editIndex === -1 ? add : updateImg}
        />
      </form>
      <hr />
      {tasks.map((task, index) => (
        <div
          className={`toDoList ${task.completed ? 'completed' : ''}`}
          data-aos-anchor-placement="top-bottom"
          key={index}
        >
          <div
            className="checkmark"
            onClick={() => toggleCompletion(index)}
          >
            {task.completed && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="green"
                className="bi bi-check"
                viewBox="0 0 16 16"
              >
                <path d="M2.293 7.293a1 1 0 011.414 0L7 10.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z" />
              </svg>
            )}
          </div>
          <label
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              whiteSpace: 'normal', // Allow text to wrap to the next line
            }}
            className="label"
          >
            {task.text}
          </label>
          <div className='btn'>
            <img
              src={editImg}
              alt='edit'
              className='editBtn'
              onClick={() => handleEdit(index)}
            />
            <img
              src={deleteImg}
              alt='delete'
              className='dltBtn'
              onClick={() => handleDelete(index)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ToDoList;
