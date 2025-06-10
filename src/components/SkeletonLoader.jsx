import { motion } from 'framer-motion';

const SkeletonLoader = ({ count = 3 }) => {
  return (
    <div className="space-y-3">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div className="animate-pulse">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-gray-200 rounded border-2 mt-0.5"></div>
              <div className="flex-1 min-w-0">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="flex items-center space-x-3">
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;