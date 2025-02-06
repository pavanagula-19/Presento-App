import React from "react";
import { useTheme } from "./themed-context"; // Replace with the correct path to your theme context

interface CustomPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const { theme } = useTheme(); // Get the current theme
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex space-x-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`px-3 py-1 rounded ${
            currentPage === index + 1
              ? theme === "dark"
                ? "bg-white text-black"
                : "bg-black text-white"
              : theme === "dark"
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-black"
          } hover:bg-opacity-75 transition duration-150 ease-in-out`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default CustomPagination;
