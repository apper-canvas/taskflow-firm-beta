import { delay } from '../index';

// Mock data
let tasks = [
  {
    id: "1",
    title: "Finish quarterly business review presentation",
    completed: false,
    priority: "high",
    categoryId: "work",
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: null,
    archived: false
  },
  {
    id: "2", 
    title: "Review and approve marketing campaign designs",
    completed: false,
    priority: "medium",
    categoryId: "work",
    dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    completedAt: null,
    archived: false
  },
  {
    id: "3",
    title: "Schedule annual dentist appointment",
    completed: true,
    priority: "low",
    categoryId: "personal",
    dueDate: null,
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    completedAt: new Date(Date.now() - 86400000).toISOString(),
    archived: false
  },
  {
    id: "4",
    title: "Plan weekend getaway with family",
    completed: false,
    priority: "medium",
    categoryId: "personal",
    dueDate: new Date(Date.now() + 604800000).toISOString().split('T')[0], // Next week
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    completedAt: null,
    archived: false
  },
  {
    id: "5",
    title: "Complete online certification course",
    completed: false,
    priority: "high",
    categoryId: "learning",
    dueDate: new Date(Date.now() + 1209600000).toISOString().split('T')[0], // Two weeks
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    completedAt: null,
    archived: false
  }
];

export const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return { ...task };
  },

  async create(taskData) {
    await delay(300);
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      completed: false,
      priority: taskData.priority || 'medium',
      categoryId: taskData.categoryId,
      dueDate: taskData.dueDate || null,
      createdAt: new Date().toISOString(),
      completedAt: null,
      archived: false
    };
    tasks.unshift(newTask);
    return { ...newTask };
  },

  async update(id, updateData) {
    await delay(250);
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updateData
    };
    
    return { ...tasks[taskIndex] };
  },

  async delete(id) {
    await delay(200);
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    tasks.splice(taskIndex, 1);
    return true;
  }
};