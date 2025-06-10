import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import TaskCard from '@/components/molecules/TaskCard';
import EmptyStateMessage from '@/components/molecules/EmptyStateMessage';
import LoadingSkeleton from '@/components/molecules/LoadingSkeleton';
import ErrorMessage from '@/components/molecules/ErrorMessage';
import ApperIcon from '@/components/ApperIcon';
import { useTaskContext } from '@/context/TaskContext';

const TaskListDisplay = () => {
  const { 
    tasks, 
    categories, 
    selectedCategory, 
    searchQuery, 
    loading, 
    error, 
    loadTasks,
    updateTask,
    deleteTask
  } = useTaskContext();

  useEffect(() => {
    loadTasks();
  }, []);

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      const updateData = {
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      };
      
      await updateTask(taskId, updateData);
      toast.success(updateData.completed ? 'Task completed!' : 'Task reopened');
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        toast.success('Task deleted');
      } catch (err) {
        toast.error('Failed to delete task');
      }
    }
  };

  const handleArchiveTask = async (taskId) => {
    try {
      await updateTask(taskId, { archived: true });
      toast.success('Task archived');
    } catch (err) {
      toast.error('Failed to archive task');
    }
  };

  // Filter tasks
  let filteredTasks = tasks.filter(task => !task.archived);

  // Apply category filter
  if (selectedCategory && selectedCategory !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.categoryId === selectedCategory);
  }

  // Apply search filter
  if (searchQuery) {
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Group tasks by completion status
  const activeTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  // Sort tasks by priority and due date
  const sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      // Priority order: high -> medium -> low
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then by due date (nearest first)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      
      // Finally by creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const sortedActiveTasks = sortTasks([...activeTasks]);
  const sortedCompletedTasks = sortTasks([...completedTasks]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <LoadingSkeleton count={5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <ErrorMessage 
          message={error}
          onRetry={loadTasks}
        />
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    if (searchQuery) {
      return (
        <div className="max-w-4xl mx-auto p-6">
          <EmptyStateMessage
            icon="Search"
            title="No tasks found"
            description={`No tasks match "${searchQuery}"`}
            actionLabel="Clear Search"
            onAction={() => loadTasks()} // Re-load tasks without search query
          />
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto p-6">
        <EmptyStateMessage
          icon="CheckSquare"
          title="No tasks yet"
          description="Start by creating your first task to get organized"
          actionLabel="Add Your First Task"
          onAction={() => {
            // Trigger add form
            // This assumes an external mechanism, like a global state or prop passing from MainContentArea
            // For now, a placeholder to maintain original functionality intent:
            const addButton = document.querySelector('[data-add-task]');
            if (addButton) addButton.click();
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Active Tasks Section */}
      {sortedActiveTasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-4">
            <h2 className="text-lg font-semibold font-heading text-gray-900 flex items-center space-x-2">
              <ApperIcon name="Target" size={20} className="text-accent" />
              <span>Active Tasks</span>
              <span className="bg-accent/10 text-accent text-sm px-2 py-1 rounded-full">
                {sortedActiveTasks.length}
              </span>
            </h2>
          </div>
          
          <div className="space-y-2">
            <AnimatePresence>
              {sortedActiveTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <TaskCard
                    task={task}
                    category={categories.find(c => c.id === task.categoryId)}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDeleteTask}
                    onArchive={handleArchiveTask}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Completed Tasks Section */}
      {sortedCompletedTasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="mb-4">
            <h2 className="text-lg font-semibold font-heading text-gray-900 flex items-center space-x-2">
              <ApperIcon name="CheckCircle" size={20} className="text-success" />
              <span>Completed</span>
              <span className="bg-success/10 text-success text-sm px-2 py-1 rounded-full">
                {sortedCompletedTasks.length}
              </span>
            </h2>
          </div>
          
          <div className="space-y-2">
            <AnimatePresence>
              {sortedCompletedTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <TaskCard
                    task={task}
                    category={categories.find(c => c.id === task.categoryId)}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDeleteTask}
                    onArchive={handleArchiveTask}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TaskListDisplay;