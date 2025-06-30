import { NavLink, Outlet, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import CategoryNavigation from "@/components/organisms/CategoryNavigation";
import { useTaskContext } from "@/context/TaskContext";

const Layout = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const { tasks } = useTaskContext();
  
  const activeTasks = tasks.filter(task => !task.archived && !task.completed);
  const completedToday = tasks.filter(task => 
    task.completed && 
    new Date(task.completedAt).toDateString() === new Date().toDateString()
  );

  return (
<div className="h-screen flex overflow-hidden bg-white">
      {/* Category Sidebar */}
      <CategoryNavigation searchQuery={searchQuery} />
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <ApperIcon name="CheckSquare" className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold font-heading text-gray-900">TaskFlow 5</h1>
              </div>
              
              {/* Navigation Tabs */}
              <nav className="hidden md:flex ml-8 space-x-1">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive || location.pathname === '/'
                        ? 'bg-primary text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`
                  }
                >
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="CheckSquare" size={16} />
                    <span>Active Tasks</span>
                    <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                      {activeTasks.length}
                    </span>
                  </div>
                </NavLink>
                
                <NavLink
                  to="/archive"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`
                  }
                >
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Archive" size={16} />
                    <span>Archive</span>
                  </div>
                </NavLink>
              </nav>
            </div>
            
            {/* Stats and Search */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Target" size={16} className="text-accent" />
                  <span>{activeTasks.length} active</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="CheckCircle" size={16} className="text-success" />
                  <span>{completedToday.length} completed today</span>
                </div>
              </div>
              
              <SearchBar onSearchChange={setSearchQuery} />
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-surface">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
