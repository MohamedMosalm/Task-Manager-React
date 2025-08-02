import React, { useState } from "react";
import "./dashboard.css";

const TaskDashboard = ({ onLogout }) => {
  const [tasks, setTasks] = useState([
    // {
    //   id: 1,
    //   title: "Complete project documentation",
    //   content: "Write comprehensive documentation for the new feature",
    //   completed: false,
    //   userId: 1,
    // },
    // {
    //   id: 2,
    //   title: "Review code changes",
    //   content: "Review and approve pending pull requests",
    //   completed: true,
    //   userId: 1,
    // },
    // {
    //   id: 3,
    //   title: "Fix login bug",
    //   content: "Resolve authentication issue in production",
    //   completed: false,
    //   userId: 1,
    // },
  ]);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Task Dashboard</h1>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

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
