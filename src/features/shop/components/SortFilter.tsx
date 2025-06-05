import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FiArrowUp, FiArrowDown, FiStar, FiClock } from 'react-icons/fi';
import { SortOption } from '../types/shop.types';

interface SortFilterProps {
  selectedOption: SortOption;
  onSelectOption: (option: SortOption) => void;
}

export const SortFilter: React.FC<SortFilterProps> = ({ 
  selectedOption, 
  onSelectOption 
}) => {
  return (
    <Box className="bg-white p-4 rounded-md shadow-sm">
      <h3 className="text-lg font-medium mb-4">Ordenar por</h3>
      <FormControl fullWidth size="small">
        <InputLabel>Ordenar</InputLabel>
        <Select
          value={selectedOption}
          label="Ordenar"
          onChange={(e) => onSelectOption(e.target.value as SortOption)}
        >
          <MenuItem value="newest" className="flex items-center gap-2">
            <FiClock /> Más recientes
          </MenuItem>
          <MenuItem value="price-high-low" className="flex items-center gap-2">
            <FiArrowDown /> Precio: Mayor a menor
          </MenuItem>
          <MenuItem value="price-low-high" className="flex items-center gap-2">
            <FiArrowUp /> Precio: Menor a mayor
          </MenuItem>
          <MenuItem value="rating" className="flex items-center gap-2">
            <FiStar /> Mejor valorados
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}; 