import menuJson from './menu.json';

export interface MenuItem {
  id: string;
  name: string;
  category: 'utama' | 'pelengkap' | 'minuman';
  categoryLabel: string;
  badge?: string;
  description: string;
  image: string;
}

export interface MenuCategory {
  id: string;
  label: string;
}

export const menuCategories: MenuCategory[] = [
  { id: 'all', label: 'Semua Menu' },
  { id: 'utama', label: 'Menu Utama' },
  { id: 'pelengkap', label: 'Menu Pelengkap' },
  { id: 'minuman', label: 'Minuman' }
];

export const menuItems: MenuItem[] = menuJson.items as MenuItem[];
