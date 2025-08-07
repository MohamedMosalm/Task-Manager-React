import axios from "axios";
import authService from "./authService";
import config from "../config/config";

export const tasksService = {
  getAllTasks: async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/tasks`, {
        headers: {
          "Content-Type": "application/json",
          ...authService.getAuthHeaders(),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      if (error.response?.status === 401) {
        throw new Error("Authentication required. Please log in again.");
      }
      throw new Error("Failed to fetch tasks. Please try again.");
    }
  },

  createTask: async (taskData) => {
    try {
      console.log("Creating task with data:", taskData);
      const response = await axios.post(
        `${config.API_BASE_URL}/api/tasks`,
        taskData,
        {
          headers: {
            "Content-Type": "application/json",
            ...authService.getAuthHeaders(),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      console.error("Error response:", error.response?.data);
      if (error.response?.status === 401) {
        throw new Error("Authentication required. Please log in again.");
      } else if (error.response?.status === 400) {
        const errorMessage =
          error.response?.data?.message ||
          "Invalid task data. Please check title and content.";
        throw new Error(errorMessage);
      }
      throw new Error("Failed to create task. Please try again.");
    }
  },

  updateTask: async (taskId, taskData) => {
    try {
      console.log("Updating task", taskId, "with data:", taskData);
      const response = await axios.patch(
        `${config.API_BASE_URL}/api/tasks/${taskId}`,
        taskData,
        {
          headers: {
            "Content-Type": "application/json",
            ...authService.getAuthHeaders(),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      console.error("Error response:", error.response?.data);
      if (error.response?.status === 401) {
        throw new Error("Authentication required. Please log in again.");
      } else if (error.response?.status === 403) {
        throw new Error("You can only update your own tasks.");
      } else if (error.response?.status === 404) {
        throw new Error("Task not found.");
      } else if (error.response?.status === 400) {
        const errorMessage =
          error.response?.data?.message ||
          "Invalid request. Please check your task data.";
        throw new Error(errorMessage);
      }
      throw new Error("Failed to update task. Please try again.");
    }
  },

  deleteTask: async (taskId) => {
    try {
      const response = await axios.delete(
        `${config.API_BASE_URL}/api/tasks/${taskId}`,
        {
          headers: {
            "Content-Type": "application/json",
            ...authService.getAuthHeaders(),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      if (error.response?.status === 401) {
        throw new Error("Authentication required. Please log in again.");
      } else if (error.response?.status === 403) {
        throw new Error("You can only delete your own tasks.");
      } else if (error.response?.status === 404) {
        throw new Error("Task not found.");
      } else if (error.response?.status === 400) {
        throw new Error("Invalid task ID.");
      }
      throw new Error("Failed to delete task. Please try again.");
    }
  },
};

export default tasksService;
