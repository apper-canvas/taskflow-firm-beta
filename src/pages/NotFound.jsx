import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center p-8"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="mb-6"
        >
          <ApperIcon name="FileQuestion" className="w-24 h-24 text-gray-300 mx-auto" />
        </motion.div>
        
        <h1 className="text-4xl font-bold font-heading text-gray-900 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. Let's get you back to organizing your tasks.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-primary/90 transition-colors"
        >
          <ApperIcon name="Home" size={20} />
          <span>Back to Tasks</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;