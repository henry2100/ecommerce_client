import React from 'react'
import { connect } from 'react-redux';

type TableHeaderCellProps = ReturnType<typeof mapStateToProps> & {
  label: string;
  darkMode?: boolean
};

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ label, darkMode }) => {
  return (
    <th
      className={`px-6 py-3 text-left text-sm mobile:text-xs font-medium text-gray-500 uppercase tracking-wider truncate`}
    >
      {label}
    </th>
  );
};

const mapStateToProps = (state: any) => ({ 
  darkMode: state.app.darkMode 
});

export default connect(mapStateToProps)(TableHeaderCell);