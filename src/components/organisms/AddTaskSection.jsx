import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField';
import Input from '@/components/atoms/Input'; // Used directly for title and date
import { useTaskContext } from '@/context/TaskContext';

const AddTaskSection = ({ onSuccess, onCancel }) => {
  const { categories, createTask } = useTaskContext();
  const [formData, setFormData] = useState({
    title: '',
    priority: 'medium',
    categoryId: categories[0]?.id || '',
    dueDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    setIsSubmitting(true);
    try {
      await createTask({
        title: formData.title.trim(),
        priority: formData.priority,
        categoryId: formData.categoryId,
        dueDate: formData.dueDate || null
      });
      
      toast.success('Task created successfully!');
      setFormData({
        title: '',
        priority: 'medium',
        categoryId: categories[0]?.id || '',
        dueDate: ''
      });
      onSuccess?.();
    } catch (err) {
      toast.error('Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel?.();
    }
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <ApperIcon name="Plus" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold font-heading text-gray-900">Add New Task</h3>
      </div>

      {/* Task Title */}
      <FormField>
        <Input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          autoFocus
          disabled={isSubmitting}
          className="text-lg" // specific styling for this input
        />
      </FormField>

      {/* Form Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Priority */}
        <FormField label="Priority" id="priority-select">
          <select
            id="priority-select"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            disabled={isSubmitting}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </FormField>

        {/* Category */}
        <FormField label="Category" id="category-select">
          <select
            id="category-select"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            disabled={isSubmitting}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </FormField>

        {/* Due Date */}
        <FormField label="Due Date (Optional)" id="due-date-input">
          <Input
            id="due-date-input"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            disabled={isSubmitting}
            min={new Date().toISOString().split('T')[0]}
            className="px-3 py-2" // specific styling for this input
          />
        </FormField>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4">
        <Button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        
        <Button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-2 rounded-lg font-medium shadow-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting || !formData.title.trim()}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Creating...</span>
            </>
          ) : (
            <>
              <ApperIcon name="Plus" size={16} />
              <span>Add Task</span>
            </>
          )}
        </Button>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <span><kbd className="px-1 bg-gray-100 rounded">Esc</kbd> to cancel</span>
          <span><kbd className="px-1 bg-gray-100 rounded">⌘ Enter</kbd> to save</span>
        </div>
      </div>
    </form>
  );
};

export default AddTaskSection;