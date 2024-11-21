import React, { useState, useEffect } from "react";
import "./ToDoApp.css";

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);


  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const handleAddTask = () => {
    const trimmedInput = input.trim();
    if (trimmedInput && category) {
      const newTask = {
        id: Date.now(),
        text: trimmedInput,
        category,
        completed: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setInput("");
      setCategory("");
    }
  };

  // Toggle task completion
  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Toggle dark mode
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={isDarkMode ? "dark-theme" : "light-theme"}>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        {/* Dark Mode Toggle */}
        <div style={{ marginBottom: "20px", textAlign: "right" }}>
          <button
            onClick={toggleDarkMode}
            style={{
              padding: "5px 10px",
              backgroundColor: isDarkMode ? "#ffc107" : "#343a40",
              color: isDarkMode ? "#000" : "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Input Section */}
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
            style={{
              padding: "5px",
              marginRight: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: "5px",
              marginRight: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Urgent">Urgent</option>
          </select>
          <button
            onClick={handleAddTask}
            style={{
              padding: "5px 10px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>

        {/* Task List Section */}
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                padding: "10px",
                backgroundColor: isDarkMode ? "#444" : "#f9f9f9",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              <div>
                <span
                  onClick={() => handleToggleComplete(task.id)}
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                >
                  {task.text}
                </span>
                <small
                  style={{
                    marginLeft: "10px",
                    fontSize: "12px",
                    color: "#888",
                  }}
                >
                  ({task.category})
                </small>
              </div>
              <button
                onClick={() => handleDeleteTask(task.id)}
                style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "5px 10px",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoApp;
