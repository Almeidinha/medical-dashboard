"use client"

import React, { useEffect, useState } from 'react';
import HeaderTableComponent, { Column } from './components/header';
import BodyTableComponent, { DataItem } from './components/body';
import FooterTableComponent from './components/footer';
import { on } from 'events';

interface TableProps {
  columns: Column[];
  data: DataItem[];
  paginated?: boolean;
  showHeader?: boolean;
  title?: string;
  striped?: boolean;
  onRowClick?: (row: DataItem) => void;
}

const Table = (props: TableProps) => {
  const { 
    columns, 
    data, 
    paginated = true, 
    showHeader = true,
    title,
    striped = true,
    onRowClick
  } = props;

  const [page, setPage] = useState<number>(1);
  const [numberPerPage, setNumberPerPage] = useState(10);
  const [slicedData, setSlicedData] = useState<DataItem[]>([]);
  const [numberOfPage, setNumberOfPage] = useState(0);

  useEffect(() => {
    setNumberOfPage(Math.ceil(data.length / numberPerPage));
    setSlicedData(paginated ? data?.slice((page - 1) * numberPerPage, page * numberPerPage): data);
  }, [numberPerPage, data, page, paginated])

  const nextPage = () => {
    if (page + 1 <= numberOfPage) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (page - 1 >= 1) {
      setPage(page - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNumberPerPage(Number(e.target.value));
    setPage(1);
  };
  
  return (
    <div className="w-full">
      <div className="overflow-x-auto w-full">
        { title && <div className="flex justify-between items-center w-full h-16 bg-white border-b border-gray-200">
          <span className="font-bold text-gray-600 p-4">
            { title }
          </span>  
        </div>
        }
        <table className="min-w-full divide-y divide-gray-200">
          {
            showHeader && <HeaderTableComponent columns={columns} />
          }        
          <BodyTableComponent data={slicedData} columnsData={columns} striped={striped} onRowClick={onRowClick} />
        </table>
      </div>
      {
        paginated && <FooterTableComponent 
          handleChange={handleChange}
          nextPage={nextPage}
          previousPage={previousPage}
          page={page}
          numberPerPage={numberPerPage}
          numberOfPage={numberOfPage}
        />
      }
    </div>
  );
}

export default Table;