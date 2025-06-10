import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import TaskItem from '../components/TaskItem';
import EmptyState from '../components/EmptyState';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorState from '../components/ErrorState';
import TaskProvider, { useTaskContext } from '../context/TaskContext';
import { taskService } from '../services';

const ArchiveContent = () => {
  const { tasks, loadTasks, updateTask } = useTaskContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const archivedTasks = tasks.filter(task => task.archived);

  useEffect(() => {
    const loadArchivedTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        await loadTasks();
      } catch (err) {
        setError(err.message || 'Failed to load archived tasks');
        toast.error('Failed to load archived tasks');
      } finally {
        setLoading(false);
      }
    };
    
    loadArchivedTasks();
  }, []);

  const handleRestoreTask = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      await updateTask(taskId, { archived: false });
      toast.success(`"${task.title}" restored to active tasks`);
    } catch (err) {
      toast.error('Failed to restore task');
    }
  };

  const handlePermanentDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to permanently delete this task? This action cannot be undone.')) {
      try {
        await taskService.delete(taskId);
        await loadTasks();
        toast.success('Task permanently deleted');
      } catch (err) {
        toast.error('Failed to delete task');
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">Archive</h2>
          <p className="text-gray-600">Completed and archived tasks</p>
        </div>
        <SkeletonLoader count={5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <ErrorState 
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  if (archivedTasks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">Archive</h2>
          <p className="text-gray-600">Completed and archived tasks</p>
        </div>
        
        <EmptyState
          icon="Archive"
          title="No archived tasks yet"
          description="Completed tasks will appear here when you archive them"
          actionLabel="Go to Active Tasks"
          onAction={() => window.history.back()}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">Archive</h2>
        <p className="text-gray-600">{archivedTasks.length} archived tasks</p>
      </div>

      <div className="space-y-3">
        {archivedTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="bg-white rounded-lg border border-gray-200 p-4 opacity-75">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <ApperIcon name="Archive" size={16} className="text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-700 line-through">
                      {task.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <span>Completed: {new Date(task.completedAt).toLocaleDateString()}</span>
                      {task.dueDate && (
                        <>
                          <span>•</span>
                          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRestoreTask(task.id)}
                    className="px-3 py-1 text-sm bg-secondary text-white rounded-md hover:bg-primary transition-colors"
                  >
                    Restore
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePermanentDelete(task.id)}
                    className="p-2 text-gray-400 hover:text-error transition-colors"
                  >
                    <ApperIcon name="Trash2" size={16} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Archive = () => {
  return (
    <TaskProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <ArchiveContent />
      </motion.div>
    </TaskProvider>
  );
};

export default Archive;