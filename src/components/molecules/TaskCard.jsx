import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format, isPast, isToday } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const TaskCard = ({ task, category, onToggleComplete, onDelete, onArchive }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error text-white';
      case 'medium': return 'bg-accent text-white';
      case 'low': return 'bg-success text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Clock';
      case 'low': return 'Circle';
      default: return 'Circle';
    }
  };

  const getDueDateStatus = () => {
    if (!task.dueDate) return null;
    
    const dueDate = new Date(task.dueDate);
    if (isPast(dueDate) && !isToday(dueDate) && !task.completed) {
      return 'overdue';
    }
    if (isToday(dueDate)) {
      return 'today';
    }
    return 'upcoming';
  };

  const dueDateStatus = getDueDateStatus();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`bg-white rounded-lg border-l-4 border border-gray-200 p-4 shadow-sm transition-all duration-200 ${
        task.completed ? 'opacity-75' : ''
      } ${isHovered ? 'shadow-md' : ''}`}
      style={{ borderLeftColor: category?.color || '#6B7280' }}
    >
      <div className="flex items-start space-x-3">
        {/* Checkbox */}
        <Button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleComplete(task.id)}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 mt-0.5 ${
            task.completed
              ? 'bg-primary border-primary text-white'
              : 'border-gray-300 hover:border-primary'
          }`}
        >
          {task.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <ApperIcon name="Check" size={12} />
            </motion.div>
          )}
        </Button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium break-words ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}>
                {task.title}
              </h3>
              
              {/* Task Meta */}
              <div className="flex items-center space-x-3 mt-2">
                {/* Priority Badge */}
                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  <ApperIcon name={getPriorityIcon(task.priority)} size={12} />
                  <span className="capitalize">{task.priority}</span>
                </div>

                {/* Category */}
                {category && (
                  <div className="inline-flex items-center space-x-1 text-xs text-gray-600">
                    <ApperIcon name={category.icon} size={12} />
                    <span>{category.name}</span>
                  </div>
                )}

                {/* Due Date */}
                {task.dueDate && (
                  <div className={`inline-flex items-center space-x-1 text-xs px-2 py-1 rounded ${
                    dueDateStatus === 'overdue' ? 'bg-error/10 text-error' :
                    dueDateStatus === 'today' ? 'bg-accent/10 text-accent' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <ApperIcon name="Calendar" size={12} />
                    <span>
                      {dueDateStatus === 'overdue' && 'Overdue: '}
                      {dueDateStatus === 'today' && 'Today: '}
                      {format(new Date(task.dueDate), 'MMM d')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className={`flex items-center space-x-1 transition-opacity duration-200 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              {task.completed && (
                <Button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onArchive(task.id)}
                  className="p-1 text-gray-400 hover:text-secondary transition-colors"
                  title="Archive task"
                >
                  <ApperIcon name="Archive" size={16} />
                </Button>
              )}
              
              <Button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(task.id)}
                className="p-1 text-gray-400 hover:text-error transition-colors"
                title="Delete task"
              >
                <ApperIcon name="Trash2" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;