import React, { useEffect, useMemo, useState } from "react";
import Pagination from "../Pagination";

interface rowType {
  body: string;
  id: number;
  title: string;
  userId: number;
}

const Table: React.FC = () => {
  const [data, setData] = useState<rowType[] | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [changeData, setChangeData] = useState<rowType[] | null>(null);
  let pageSize = 10;

  //   const currentData = useMemo(() => {

  //   }, [currentPage]);

  useEffect(() => {
    console.log("Hello");
    const firstIndex = (currentPage - 1) * pageSize;
    const lastIndex = firstIndex + pageSize;
    const changedData = data?.slice(firstIndex, lastIndex);
    setChangeData(changedData);
  }, [currentPage, data]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        let resp = await response.json();
        setData(resp);
      } catch (error) {}
      setLoading(false);
    })();
  }, []);

  console.log(data);
  if (loading) return null;
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>USERID</th>
            <th>TITLE</th>
            <th>BODY</th>
          </tr>
        </thead>
        <tbody>
          {changeData.map((item, index) => {
            return (
              <tr className={`h-20 ${index % 2 == 0 ? "bg-gray-200" : ""} `}>
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
        totalCount={data.length}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default Table;
