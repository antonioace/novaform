import React from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FiGrid, FiTag } from 'react-icons/fi';
import { useCategories } from '../hooks/useCategories';
import { Category } from '../types/shop.types';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onSelectCategory 
}) => {
  const { categories, isLoading } = useCategories();
  
  if (isLoading) {
    return <div className="animate-pulse h-40 bg-gray-100 rounded-md"></div>;
  }
  
  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <h3 className="text-lg font-medium mb-4">Filtrar por Categoría</h3>
      <List>
        <ListItemButton 
          selected={selectedCategory === null}
          onClick={() => onSelectCategory(null)}
          className={selectedCategory === null ? 'bg-gray-100' : ''}
        >
          <ListItemIcon>
            <FiGrid className="text-xl" />
          </ListItemIcon>
          <ListItemText primary="Todos" />
        </ListItemButton>
        
        {categories.map((category: Category) => (
          <ListItemButton 
            key={category.id}
            selected={selectedCategory === category.id}
            onClick={() => onSelectCategory(category.id)}
            className={selectedCategory === category.id ? 'bg-gray-100' : ''}
          >
            <ListItemIcon>
              <FiTag className="text-xl" />
            </ListItemIcon>
            <ListItemText primary={category.name} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}; 