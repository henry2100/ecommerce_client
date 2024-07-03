// src/Table.tsx
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Pagination from './Pagination';
import { TableColumn } from 'types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Spinner from 'components/atoms/Spinner';
import ErrorEmptyState from '../../atoms/ErrorEmptyState';

type TableProps = {
  columns: TableColumn[];
  data: any[];
  loading?: boolean;
  loaderHeight?: string
  errorState?: boolean;
  empty?: boolean;
  addedStyle?: string
  itemsPerPage: any;
  dataLength?: any;
  getCurrentPage: (pageNum: number) => void;
};

const AppTable: React.FC<TableProps> = ({ columns, data, itemsPerPage, loading, loaderHeight, errorState, addedStyle, dataLength, getCurrentPage}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pagesValue = dataLength / itemsPerPage
  const totalPages = dataLength ? Math.ceil( pagesValue ) : Math.ceil(data.length / itemsPerPage);

  // console.log("totalPages:", totalPages);
  // console.log("dataLength:", dataLength);
  // console.log("length_test:", data.length);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataLength ? data : data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    getCurrentPage(pageNumber);
  }

  return (
    <div className={`relative flex flex-col ${data.length < 10 ? 'min-h-[15vh]' : 'min-h-[60vh]'}`}>
      <div className="overflow-x-auto rounded-lg bg-white">
        <table className={`min-w-full mobile:min-h-full ${loading && !loaderHeight && 'min-h-[587px]'} ${loading && loaderHeight && 'min-h-[406px]'} ${errorState && 'min-h-[300px]'} divide-y divide-gray-200`}>
          <TableHeader columns={columns}/>
          { loading ?
            <div className={`absolute z-10 flex items-center py-10 justify-center w-full h-[80%] ${addedStyle}`}>
              <Spinner
                text="Loading..."
              />
            </div> 
          
          :!errorState && data.length > 0 ? 
            <TableBody columns={columns} data={currentData}/>
          
          : <tbody>
              <ErrorEmptyState img={true}/>
            </tbody>
          }
        </table>
      </div>
      {data.length > 0 && totalPages > 1 && !errorState && <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalData={dataLength ? dataLength : data.length}
        onPageChange={handlePageChange}
      />}
    </div>
  );
};

export default AppTable