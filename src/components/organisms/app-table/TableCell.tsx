import React from 'react';
import { connect } from 'react-redux';
import { TableColumn } from 'types';

type TableCellProps = ReturnType<typeof mapStateToProps> & {
  column: TableColumn;
  rowData: any;
  darkMode: boolean;
};

const TableCell: React.FC<TableCellProps> = ({ column, rowData, darkMode }) => {
  const { render, onClick } = column;

  return (
    <td
      className={`${darkMode ? 'text-Primary' : ' text-gray-900'} whitespace-nowrap text-sm mobile:text-xs font-medium`}
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