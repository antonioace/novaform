import React from "react";
import { FaFilePdf, FaFileExcel, FaFileWord, FaFileImage, FaFileVideo, FaFileAudio, FaFileAlt, FaFolder } from "react-icons/fa";
import { FileType } from "../types/file-user.types";

interface FileTypeIconProps {
  fileType: FileType;
  className?: string;
}

const FileTypeIcon: React.FC<FileTypeIconProps> = ({ fileType, className = "w-8 h-8" }) => {
  const getIcon = () => {
    switch (fileType) {
      case FileType.PDF:
        return <FaFilePdf className={`${className} text-red-500`} />;
      case FileType.XLS:
      case FileType.XLSX:
        return <FaFileExcel className={`${className} text-green-500`} />;
      case FileType.DOC:
      case FileType.DOCX:
        return <FaFileWord className={`${className} text-blue-500`} />;
      case FileType.IMAGE:
        return <FaFileImage className={`${className} text-purple-500`} />;
      case FileType.VIDEO:
        return <FaFileVideo className={`${className} text-red-600`} />;
      case FileType.AUDIO:
        return <FaFileAudio className={`${className} text-orange-500`} />;
      case FileType.TEXT:
        return <FaFileAlt className={`${className} text-gray-500`} />;
      case FileType.FOLDER:
      default:
        return <FaFolder className={`${className} text-yellow-500`} />;
    }
  };

  return getIcon();
};

export default FileTypeIcon; 