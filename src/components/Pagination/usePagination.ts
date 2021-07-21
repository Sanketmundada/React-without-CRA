import { useMemo } from "react";

interface propTypes {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
}
// @Example
// ip : 1 6
// op : 1 2 3 4 5 6
const range = (start: number, end: number) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  currentPage,
  pageSize,
  siblingCount = 1,
  totalCount,
}: propTypes) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    return range(1, totalPageCount);
  }, [currentPage, pageSize, siblingCount, totalCount]);

  return paginationRange;
};
