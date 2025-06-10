import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';
import { useTaskContext } from '../context/TaskContext';

const CategorySidebar = ({ searchQuery }) => {
  const { 
    categories, 
    tasks, 
    selectedCategory, 
    setSelectedCategory,
    loading 
  } = useTaskContext();

  // Calculate task counts for each category
  const getCategoryStats = (categoryId) => {
    const categoryTasks = tasks.filter(task => 
      !task.archived && 
      (categoryId === 'all' ? true : task.categoryId === categoryId) &&
      (!searchQuery || task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    const total = categoryTasks.length;
    const completed = categoryTasks.filter(task => task.completed).length;
    const active = total - completed;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, active, progress };
  };

  const allTasksStats = getCategoryStats('all');

  if (loading) {
    return (
      <aside className="w-80 bg-surface border-r border-gray-200 overflow-y-auto scrollbar-thin">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 bg-surface border-r border-gray-200 overflow-y-auto scrollbar-thin">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold font-heading text-gray-900 mb-4">Categories</h2>
          
          {/* All Tasks */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCategory('all')}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 mb-3 ${
              selectedCategory === 'all'
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  selectedCategory === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <ApperIcon name="Layers" size={16} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">All Tasks</h3>
                  <p className="text-sm text-gray-500">
                    {allTasksStats.active} active, {allTasksStats.completed} completed
                  </p>
                </div>
              </div>
              
              {/* Progress Ring */}
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                    fill="none"
                    stroke={selectedCategory === 'all' ? '#5B21B6' : '#6B7280'}
                    strokeWidth="3"
                    strokeDasharray={`${allTasksStats.progress}, 100`}
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-xs font-medium ${
                    selectedCategory === 'all' ? 'text-primary' : 'text-gray-600'
                  }`}>
                    {allTasksStats.progress}%
                  </span>
                </div>
              </div>
            </div>
          </motion.button>

          {/* Category List */}
          <div className="space-y-2">
            {categories.map((category, index) => {
              const stats = getCategoryStats(category.id);
              
              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left p-3 rounded-lg border-l-4 transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-white border-l-primary shadow-md'
                      : 'bg-white/50 hover:bg-white hover:shadow-sm'
                  }`}
                  style={{ 
                    borderLeftColor: selectedCategory === category.id ? category.color : 'transparent'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{category.name}</h3>
                        {stats.total > 0 ? (
                          <p className="text-sm text-gray-500">
                            {stats.active} active
                            {stats.completed > 0 && `, ${stats.completed} done`}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-400">No tasks</p>
                        )}
                      </div>
                    </div>
                    
                    {stats.total > 0 && (
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {stats.total}
                        </div>
                        <div className="text-xs text-gray-500">
                          {stats.progress}%
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  {stats.total > 0 && (
                    <div className="mt-2 bg-gray-200 rounded-full h-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.progress}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{ backgroundColor: category.color }}
                      />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-3">Today's Progress</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Tasks completed</span>
              <span className="font-medium text-success">
                {tasks.filter(task => 
                  task.completed && 
                  new Date(task.completedAt).toDateString() === new Date().toDateString()
                ).length}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Active tasks</span>
              <span className="font-medium text-accent">
                {tasks.filter(task => !task.completed && !task.archived).length}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Overdue</span>
              <span className="font-medium text-error">
                {tasks.filter(task => 
                  !task.completed && 
                  !task.archived && 
                  task.dueDate && 
                  new Date(task.dueDate) < new Date() &&
                  new Date(task.dueDate).toDateString() !== new Date().toDateString()
                ).length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CategorySidebar;