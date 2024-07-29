import React from 'react'
import TableRow from './TableRow';
import { TableColumn } from 'types';

type TableBodyProps = {
  columns: TableColumn[];
  data: any[];
  darkMode: boolean;
};

const TableBody: React.FC<TableBodyProps> = ({ columns, data, darkMode }) => {
  
  return (
    <tbody>
      {data.map((item, rowIndex) => (
        <TableRow key={rowIndex} columns={columns} rowData={item} darkMode={darkMode} style={`${rowIndex !== data.length - 1 && 'border-b'}`}/>
      ))}
    </tbody>
  );
};

export default TableBody;