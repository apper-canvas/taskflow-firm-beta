import { createContext, useContext, useState, useEffect } from 'react';
import { taskService, categoryService } from '../services';

const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load initial data
  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Create task
  const createTask = async (taskData) => {
    const newTask = await taskService.create(taskData);
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  // Update task
  const updateTask = async (taskId, updateData) => {
    const updatedTask = await taskService.update(taskId, updateData);
    setTasks(prev => prev.map(task => 
      task.id === taskId ? updatedTask : task
    ));
    return updatedTask;
  };

  // Delete task
  const deleteTask = async (taskId) => {
    await taskService.delete(taskId);
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const value = {
    tasks,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;