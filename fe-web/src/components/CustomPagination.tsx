import React from "react";

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
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex space-x-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`px-3 py-1 rounded ${
            currentPage === index + 1
              ? "bg-black text-white"
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
