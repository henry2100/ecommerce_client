import React from 'react'
import { TableColumn } from 'types';
import TableHeaderCell from './TableHeaderCell';

type TableHeaderProps = {
  columns: TableColumn[];
};

const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <TableHeaderCell key={index} label={column.label} />
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;