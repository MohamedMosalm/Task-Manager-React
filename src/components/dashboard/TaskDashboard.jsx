import React, { useState } from "react";
import "./dashboard.css";

const TaskDashboard = ({ onLogout }) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete project documentation",
      content: "Write comprehensive documentation for the new feature",
      completed: false,
      userId: 1,
    },
    {
      id: 2,
      title: "Review code changes",
      content: "Review and approve pending pull requests",
      completed: true,
      userId: 1,
    },
    {
      id: 3,
      title: "Fix login bug",
      content: "Resolve authentication issue in production",
      completed: false,
      userId: 1,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      title: newTask.title,
      content: newTask.content,
      completed: false,
    };
    setTasks((prev) => [...prev, task]);
    setNewTask({ title: "", content: "" });
    setShowAddForm(false);
    alert("Task created successfully!");
  };

  const cancelAdd = () => {
    setNewTask({ title: "", content: "" });
    setShowAddForm(false);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Task Dashboard</h1>
        <div className="header-buttons">
          <button className="add-task-btn" onClick={() => setShowAddForm(true)}>
            Add Task
          </button>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <div className="task-form-overlay">
          <div className="task-form">
            <div className="form-header">
              <h2>Add New Task</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Task Title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="content"
                  placeholder="Task Description"
                  rows="4"
                  value={newTask.content}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-buttons">
                <button type="submit" className="save-btn">
                  Save Task
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={cancelAdd}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tasks List - Grid View */}
      <div className="tasks-container">
        <h2>Your Tasks</h2>

        {tasks.length === 0 ? (
          <div className="no-tasks">
            <p>No tasks found.</p>
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`task-card ${task.completed ? "completed" : ""}`}
              >
                <div className="task-header">
                  <h3>{task.title}</h3>
                </div>

                <div className="task-content">
                  <p>{task.content}</p>
                </div>

                <div className="task-footer">
                  <div className="task-status">
                    <label>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        readOnly
                      />
                      {task.completed ? "Completed" : "Pending"}
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;
