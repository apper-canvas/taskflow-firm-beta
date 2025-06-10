import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainFeature from '../components/MainFeature';
import TaskProvider from '../context/TaskContext';

const Home = () => {
  return (
    <TaskProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <MainFeature />
      </motion.div>
    </TaskProvider>
  );
};

export default Home;