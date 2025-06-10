import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const SearchBar = ({ onSearchChange }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearchChange(value);
  };

  const clearSearch = () => {
    setQuery('');
    onSearchChange('');
  };

  return (
    <div className="relative">
      <motion.div
        animate={{ 
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused ? '0 4px 12px rgba(91, 33, 182, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <ApperIcon 
            name="Search" 
            size={16} 
            className={`transition-colors duration-200 ${
              isFocused ? 'text-primary' : 'text-gray-400'
            }`} 
          />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search tasks..."
          className="w-64 pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm"
        />
        
        {query && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <ApperIcon name="X" size={16} />
          </motion.button>
        )}
      </motion.div>
      
      {/* Search results count */}
      {query && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-1 p-2 bg-white border border-gray-200 rounded-lg shadow-sm text-xs text-gray-600"
        >
          Searching for "{query}"
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;