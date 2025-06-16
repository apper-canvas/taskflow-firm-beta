import React from 'react';
import { motion } from 'framer-motion';
import ArchivedTasksDisplay from '@/components/organisms/ArchivedTasksDisplay';

const ArchivePage = () => {
const ArchivePage = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="h-full"
  >
    <ArchivedTasksDisplay />
  </motion.div>
);
};

export default ArchivePage;