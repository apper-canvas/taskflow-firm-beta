import { delay } from '../index';

// Mock data
const categories = [
  {
    id: "work",
    name: "Work",
    color: "#EF4444",
    icon: "Briefcase",
    taskCount: 0,
    order: 1
  },
  {
    id: "personal",
    name: "Personal",
    color: "#10B981",
    icon: "User",
    taskCount: 0,
    order: 2
  },
  {
    id: "learning",
    name: "Learning",
    color: "#3B82F6",
    icon: "BookOpen",
    taskCount: 0,
    order: 3
  },
  {
    id: "health",
    name: "Health",
    color: "#8B5CF6",
    icon: "Heart",
    taskCount: 0,
    order: 4
  },
  {
    id: "shopping",
    name: "Shopping",
    color: "#F59E0B",
    icon: "ShoppingCart",
    taskCount: 0,
    order: 5
  }
];

export const categoryService = {
  async getAll() {
    await delay(200);
    return [...categories];
  },

  async getById(id) {
    await delay(150);
    const category = categories.find(c => c.id === id);
    if (!category) {
      throw new Error('Category not found');
    }
    return { ...category };
  },

  async create(categoryData) {
    await delay(300);
    const newCategory = {
      id: Date.now().toString(),
      name: categoryData.name,
      color: categoryData.color || '#6B7280',
      icon: categoryData.icon || 'Folder',
      taskCount: 0,
      order: categories.length + 1
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, updateData) {
    await delay(250);
    const categoryIndex = categories.findIndex(c => c.id === id);
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }
    
    categories[categoryIndex] = {
      ...categories[categoryIndex],
      ...updateData
    };
    
    return { ...categories[categoryIndex] };
  },

  async delete(id) {
    await delay(200);
    const categoryIndex = categories.findIndex(c => c.id === id);
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }
    
    categories.splice(categoryIndex, 1);
    return true;
  }
};