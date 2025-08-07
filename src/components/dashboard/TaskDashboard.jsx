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
  const [editingTask, setEditingTask] = useState(null);
  const [editTask, setEditTask] = useState({
    title: "",
    content: "",
    completed: false,
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

  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask.id ? { ...task, ...editTask } : task
      )
    );
    setEditingTask(null);
    setEditTask({ title: "", content: "", completed: false });
    alert("Task updated successfully!");
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setEditTask({
      title: task.title,
      content: task.content,
      completed: task.completed,
    });
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditTask({ title: "", content: "", completed: false });
  };

  const toggleTaskStatus = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      alert("Task deleted successfully!");
    }
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

      {/* Edit Task Form */}
      {editingTask && (
        <div className="task-form-overlay">
          <div className="task-form">
            <div className="form-header">
              <h2>Edit Task</h2>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Task Title"
                  value={editTask.title}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="content"
                  placeholder="Task Description"
                  rows="4"
                  value={editTask.content}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="completed"
                    checked={editTask.completed}
                    onChange={handleEditInputChange}
                  />
                  Mark as completed
                </label>
              </div>
              <div className="form-buttons">
                <button type="submit" className="save-btn">
                  Update Task
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={cancelEdit}
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
                  <div className="task-actions">
                    <button
                      className="edit-btn"
                      onClick={() => startEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="task-content">
                  <p>{task.content}</p>
                </div>

                <div className="task-footer">
                  <div className="task-status">
                    <label onClick={() => toggleTaskStatus(task.id)}>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskStatus(task.id)}
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
