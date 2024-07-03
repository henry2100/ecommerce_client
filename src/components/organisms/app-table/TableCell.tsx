import React from 'react';
import { connect } from 'react-redux';
import { TableColumn } from 'types';

type TableCellProps = ReturnType<typeof mapStateToProps> & {
  column: TableColumn;
  rowData: any;
};

const TableCell: React.FC<TableCellProps> = ({ column, rowData }) => {
  const { render, onClick } = column;

  return (
    <td
      className="whitespace-nowrap text-sm mobile:text-xs font-medium text-gray-900"
      onClick={onClick}
    >
      {render(rowData)}
    </td>
  );
};

const mapStateToProps = (state: any) => ({ 
  darkMode: state.app.darkMode 
});

export default connect(mapStateToProps)(TableCell);