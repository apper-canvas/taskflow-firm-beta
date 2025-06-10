import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const CategoryCard = ({ category, stats, isSelected, onClick, index }) => {
  return (
    <Button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border-l-4 transition-all duration-200 ${
        isSelected
          ? 'bg-white border-l-primary shadow-md'
          : 'bg-white/50 hover:bg-white hover:shadow-sm'
      }`}
      style={{ 
        borderLeftColor: isSelected ? category.color : 'transparent'
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
    </Button>
  );
};

export default CategoryCard;