import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const ErrorState = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="text-center py-12"
    >
      <motion.div
        animate={{ 
          rotate: [0, -10, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 0.6,
          repeat: Infinity,
          repeatDelay: 3
        }}
        className="mb-6"
      >
        <ApperIcon name="AlertTriangle" className="w-16 h-16 text-error mx-auto" />
      </motion.div>
      
      <h3 className="text-xl font-semibold font-heading text-gray-900 mb-2">
        Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">
        {message}
      </p>
      
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="inline-flex items-center space-x-2 bg-error text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-error/90 transition-colors"
        >
          <ApperIcon name="RefreshCw" size={16} />
          <span>Try Again</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default ErrorState;