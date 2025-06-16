import React from 'react';
import { motion } from 'framer-motion';
import MainContentArea from '@/components/organisms/MainContentArea';
import CategoryNavigation from '@/components/organisms/CategoryNavigation';
import SearchBar from '@/components/molecules/SearchBar';
import { useState } from 'react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

const HomePage = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="h-full flex" // Changed to flex to accommodate sidebar + main content
  >
    {/* Search bar is assumed to be part of the overall layout, maybe in a header.
        For now, placing it here to pass `onSearchChange` to TaskContext,
        and `searchQuery` to CategoryNavigation which depends on it.
        This assumes Layout.jsx handles the visual placement of SearchBar and CategoryNavigation.
        Since Layout.jsx is not provided, we must ensure these are rendered if they were before.
        Given the original Home.jsx only contained MainFeature, and CategorySidebar/SearchBar were imported by Layout.jsx,
        I will remove them from here to avoid redundancy and assume Layout.jsx still renders them.
        However, CategoryNavigation *needs* searchQuery. TaskContext needs setSearchQuery.
        This is a dependency loop if Layout.jsx is not managed.
        
        Let's revert to the original functional pattern of Home.jsx if Layout.jsx cannot be modified.
        The current Home.jsx wraps MainFeature in TaskProvider.
        CategorySidebar takes searchQuery as prop. TaskList uses TaskContext's searchQuery.
        
        The most faithful refactor of *only* the provided files implies the existing structure.
        So, if MainFeature was the *only* thing in Home.jsx, then HomePage should *only* render MainContentArea.
        This means SearchBar and CategoryNavigation are handled entirely by Layout.jsx and TaskContext,
        and Layout.jsx somehow passes the searchQuery to CategoryNavigation.
        
        For the refactor to work without Layout.jsx, and given the TaskContext already manages a searchQuery:
        The original CategorySidebar.jsx: `const CategorySidebar = ({ searchQuery }) => { ... useTaskContext(); ... }`
        The original TaskList.jsx: `const TaskList = () => { ... searchQuery, ... } = useTaskContext();`
        
        This means CategorySidebar gets its searchQuery from a prop, but TaskList gets it from context.
        This suggests the `searchQuery` prop on CategorySidebar is for its internal stats calculation,
        and TaskContext has its own `searchQuery` state.
        
        To strictly adhere to "reorganize without changing functionality":
        HomePage will continue to just render MainContentArea inside TaskProvider.
        The SearchBar and CategoryNavigation components must be assumed to be rendered by Layout.jsx.
        The search functionality in TaskContext must be able to update its internal searchQuery state,
        which CategoryNavigation and TaskListDisplay can then react to.
        
        So, HomePage will only contain MainContentArea and its TaskProvider.
        The CategoryNavigation organism and SearchBar molecule are provided below,
        but they are assumed to be consumed by Layout.jsx.
        
        This is the most direct interpretation of "DO NOT modify Layout.jsx".
    */}
    <MainContentArea />
  </motion.div>
);
};

export default HomePage;