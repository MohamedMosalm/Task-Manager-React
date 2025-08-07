import React, { useState, useEffect } from "react";
import "./dashboard.css";
import tasksService from "../../services/tasksService";
import authService from "../../services/authService";

const TaskDashboard = ({ onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError("");

        const userData = authService.getUser();
        if (userData) {
          setUser(userData);
        }

        const tasksData = await tasksService.getAllTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to load tasks");

        // If authentication error, logout user
        if (error.message.includes("Authentication required")) {
          authService.clearAuthData();
          onLogout();
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [onLogout]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");

      if (!newTask.title?.trim() || !newTask.content?.trim()) {
        setError("Both title and content are required.");
        return;
      }

      const taskData = {
        title: newTask.title.trim(),
        content: newTask.content.trim(),
      };

      const createdTask = await tasksService.createTask(taskData);
      setTasks((prev) => [...prev, createdTask]);
      setNewTask({ title: "", content: "" });
      setShowAddForm(false);
    } catch (error) {
      console.error("Error creating task:", error);
      setError(error.message || "Failed to create task");
    }
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const updatedTask = await tasksService.updateTask(
        editingTask.id,
        editTask
      );
      setTasks((prev) =>
        prev.map((task) => (task.id === editingTask.id ? updatedTask : task))
      );
      setEditingTask(null);
      setEditTask({ title: "", content: "", completed: false });
    } catch (error) {
      console.error("Error updating task:", error);
      setError(error.message || "Failed to update task");
    }
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

  const toggleTaskStatus = async (taskId) => {
    try {
      setError("");
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        const updateData = {
          completed: !task.completed,
        };

        const updatedTask = await tasksService.updateTask(taskId, updateData);
        setTasks((prev) =>
          prev.map((task) => (task.id === taskId ? updatedTask : task))
        );
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      setError(error.message || "Failed to update task status");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setError("");
      await tasksService.deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      setError(error.message || "Failed to delete task");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Task Dashboard</h1>
          {user && <p>Welcome back, {user.firstName}!</p>}
        </div>
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

      {/* Error Display */}
      {error && (
        <div
          className="error-message"
          style={{
            color: "#ff4444",
            backgroundColor: "#ffe6e6",
            padding: "10px",
            borderRadius: "5px",
            margin: "10px 0",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      {/* Tasks List - Grid View */}
      <div className="tasks-container">
        <h2>Your Tasks</h2>

        {isLoading ? (
          <div
            className="loading-message"
            style={{
              textAlign: "center",
              padding: "20px",
              fontSize: "16px",
            }}
          >
            Loading tasks...
          </div>
        ) : tasks.length === 0 ? (
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
