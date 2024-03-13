import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from './componentes/List';
import './App.css';

function App() {
  const [newTask, setNewTask] = useState('');
  const { add, remove, complete, tasks, checks } = List();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const storedChecks = JSON.parse(localStorage.getItem('checks')) || [];
    storedTasks.length && storedTasks.forEach((task, index) => {
      add(task);
      if (storedChecks[index]) {
        complete(index);
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('checks', JSON.stringify(checks));
  }, [tasks, checks]);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      add(newTask);
      setNewTask('');
    }
  };

  return (
    <div className="container">
      <div className="input-group mb-3">
        <input
          className="form-control"
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="What task do you want to add?"
        />
      </div>
      <div className="add-button-container">
        <button className="btn btn-primary" onClick={addTask}>Add</button>
      </div>
      <div className="tasks-container">
        {tasks.map((task, i) => (
          <div className="task-item" key={i}>
            <label className="form-check-label d-flex align-items-center task-item-label" style={{ textDecoration: checks[i] ? 'line-through' : 'none', border: 'none' }}>
              <span className="task-text">{task}</span>
              <input
                className="form-check-input"
                type="checkbox"
                onChange={() => complete(i)}
                checked={checks[i]}
              />
            </label>
            <div className="input-group-append">
              <button className="btn btn-danger task-button" onClick={() => remove(i)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
