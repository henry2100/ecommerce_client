import React from 'react'
import TableRow from './TableRow';
import { TableColumn } from 'types';

type TableBodyProps = {
  columns: TableColumn[];
  data: any[];
};

const TableBody: React.FC<TableBodyProps> = ({ columns, data }) => {

  const content = (item, rowIndex) => {
    if((rowIndex % 2) === 0){
      return <TableRow key={rowIndex} columns={columns} rowData={item} style=""/>
    }else{
      return <TableRow key={rowIndex} columns={columns} rowData={item}/>
    }
  }
  
  return (
    <tbody>
      {data.map((item, rowIndex) => content(item, rowIndex))}
    </tbody>
  );
};

export default TableBody;