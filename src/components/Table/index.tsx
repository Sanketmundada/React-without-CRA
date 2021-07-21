import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { usePrevious } from '../../hooks/usePrevious';

import Pagination from '../Pagination';

interface rowType {
  body: string;
  id: number;
  title: string;
  userId: number;
}

interface filterType {
  body: string;
  id: string;
  title: string;
  userId: string;
}

const Table: React.FC = () => {
  const [data, setData] = useState<rowType[] | null>(null);
  const [tempData, setTempData] = useState<rowType[] | null>(null);
  const [filters, setFilters] = useState<filterType>({
    id: '',
    userId: '',
    title: '',
    body: '',
  });
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [changeData, setChangeData] = useState<rowType[] | null>(null);
  let pageSize = 10;

  useEffect(() => {
    changePaginationData();
  }, [currentPage, tempData]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts'
        );
        let resp = await response.json();
        setData(resp);
        setTempData(resp);
      } catch (error) {}
      setLoading(false);
    })();
  }, []);

  const handleChange = (val: string, colName: keyof rowType) => {
    setFilters((prev) => {
      return {
        ...prev,
        [colName]: val,
      };
    });
    const newData = data.filter((item) => {
      // Check if all columns of the given row satisfy the filters
      const flags = Object.keys(item).map((key) => {
        // Use val for current column as setFilters is async
        if (key === colName) return item[key].toString().includes(val);
        else return item[key].toString().includes(filters[key]);
      });
      // Check if all elements of the flags array are true
      for (let i = 0; i < flags.length; ++i) if (!flags[i]) return false;
      return true;
    });
    setTempData(newData);
  };

  const handleSort = (column: keyof filterType, type: boolean) => {
    const sortedData = tempData;
    sortedData.sort((a: any, b: any) =>
      type ? a[column] - b[column] : b[column] - a[column]
    );
    console.log(sortedData);
    setTempData(sortedData);
    changePaginationData();
  };

  const changePaginationData = () => {
    const firstIndex = (currentPage - 1) * pageSize;
    const lastIndex = firstIndex + pageSize;
    const changedData = tempData?.slice(firstIndex, lastIndex);
    setChangeData(changedData);
  };

  if (loading) return null;
  return (
    <>
      <table>
        <thead>
          <tr>
            {Object.keys(filters).map((item: keyof filterType) => {
              return (
                <th>
                  <div className='flex'>
                    {item.toUpperCase()}
                    <input
                      type='text'
                      onChange={(e) => handleChange(e.target.value, item)}
                      className='border-black border'
                    />
                    <button onClick={() => handleSort(item, true)}>
                      <AiOutlineArrowUp size={18} color='black' />
                    </button>
                    <button onClick={() => handleSort(item, false)}>
                      <AiOutlineArrowDown size={18} color='black' />
                    </button>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {changeData?.map((item, index) => {
            return (
              <tr className={`h-20 ${index % 2 == 0 ? 'bg-gray-200' : ''} `}>
                <td>{item.id}</td>
                <td>{item.userId}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        siblingCount={2}
        totalCount={tempData.length}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default Table;
