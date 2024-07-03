import React from 'react'
import { TableColumn } from 'types';
import TableHeaderCell from './TableHeaderCell';

type TableHeaderProps = {
  columns: TableColumn[];
  darkMode?: boolean,
};

const TableHeader: React.FC<TableHeaderProps> = ({ columns, darkMode }) => {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <TableHeaderCell key={index} label={column.label} />
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;