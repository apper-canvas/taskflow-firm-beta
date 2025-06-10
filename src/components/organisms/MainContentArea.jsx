import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskListDisplay from '@/components/organisms/TaskListDisplay';
import AddTaskSection from '@/components/organisms/AddTaskSection';
import Button from '@/components/atoms/Button';
import { useTaskContext } from '@/context/TaskContext';

const MainContentArea = () => {
  const { selectedCategory } = useTaskContext();
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="h-full flex flex-col max-w-full overflow-hidden">
      {/* Task List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <TaskListDisplay />
      </div>

      {/* Add Task Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200 bg-white"
          >
            <div className="p-4 max-w-4xl mx-auto">
              <AddTaskSection 
                onSuccess={() => setShowAddForm(false)}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Task Button */}
      {!showAddForm && (
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="max-w-4xl mx-auto">
            <Button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddForm(true)}
              className="w-full flex items-center justify-center space-x-2 bg-primary text-white p-4 rounded-lg font-medium shadow-md hover:bg-primary/90 transition-colors"
              data-add-task // Retain data attribute for EmptyStateMessage action
            >
              <span className="text-xl">+</span>
              <span>Add New Task</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContentArea;