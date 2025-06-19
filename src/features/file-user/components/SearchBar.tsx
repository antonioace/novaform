import React from "react";
import { FaSearch } from "react-icons/fa";
import {
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import { FileType } from "../types/file-user.types";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  selectedTypes: FileType[];
  onTypeChange: (types: FileType[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Buscar ...",
  selectedTypes,
  onTypeChange,
}) => {
  const fileTypeOptions = [
    //{ value: FileType.FOLDER, label: "Carpetas" },
    { value: FileType.PDF, label: "PDF" },
    { value: FileType.XLSX, label: "Excel" },
    { value: FileType.DOCX, label: "Word" },
    { value: FileType.IMAGE, label: "Imágenes" },
    { value: FileType.VIDEO, label: "Videos" },
    { value: FileType.AUDIO, label: "Audio" },
    { value: FileType.TEXT, label: "Texto" },
  ];

  const handleTypeChange = (event: SelectChangeEvent<FileType[]>) => {
    const value = event.target.value as FileType[];
    onTypeChange(value);
  };

  return (
    <div className="flex gap-4 items-center">
      {/* Barra de búsqueda */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-4 w-4 text-[#919EAB]" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="block w-full outline-none h-[40px] pl-10 pr-3 py-3 border border-[#EEEEEE] rounded-lg bg-white text-gray-900 text-sm transition-all"
        />
      </div>

      {/* Select múltiple para tipos de archivo */}
      <FormControl sx={{ minWidth: 200 }}>
        <Select
          multiple
          value={selectedTypes}
          onChange={handleTypeChange}
          displayEmpty
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <span style={{ color: '#919EAB' }}>Filtrar por tipo</span>;
            }
            return selected.map(type => 
              fileTypeOptions.find(opt => opt.value === type)?.label
            ).join(', ');
          }}
          sx={{
            paddingRight: "12px",
            paddingLeft: "12px",
            paddingTop: "12px",
            paddingBottom: "12px",
            borderRadius: "8px",
            height: "40px",
            border: "1px solid #EEEEEE",
            width: "300px",
            maxWidth: "300px",
            fontSize: "14px",
            "&:hover": {
              borderColor: "#EEEEEE",
            },
            "&.Mui-focused": {
              borderColor: "#EEEEEE",
              boxShadow: "none",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
        >
          {fileTypeOptions.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ fontSize: "14px" }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SearchBar;
