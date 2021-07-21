import React from "react";
import { usePagination } from "./usePagination";

interface Props {
  onPageChange: (a: number) => void;
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  onPageChange,
  pageSize,
  siblingCount = 1,
  totalCount,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 ( i.e only one page ) in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="flex w-full justify-center mt-4">
      {/* Render our Page Pills */}
      {paginationRange.map((pageNumber, index) => {
        return (
          <li
            key={index}
            className={`paginationItem ${
              pageNumber === currentPage ? "bg-gray-400 rounded" : ""
            } mx-2 cursor-pointer`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
