import Home from '../pages/Home';
import Archive from '../pages/Archive';

export const routes = {
  home: {
    id: 'home',
    label: 'Active Tasks',
    path: '/home',
    icon: 'CheckSquare',
    component: Home
  },
  archive: {
    id: 'archive',
    label: 'Archive',
    path: '/archive',
    icon: 'Archive',
    component: Archive
  }
};

export const routeArray = Object.values(routes);