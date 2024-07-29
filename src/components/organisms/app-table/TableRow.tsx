import React, { useEffect, useRef } from 'react'
import { TableColumn } from 'types';
import TableCell from './TableCell';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectTableItem } from '../../../redux/app/app.action';

type TableRowProps = {
  columns: TableColumn[];
  rowData: any;
  style?: string;
  tableItem?: string;
  darkMode: boolean;
  selectTableItem?: (data:any) => void
} & ReturnType<typeof mapStateToProps>;

const TableRow: React.FC<TableRowProps> = ({ columns, rowData, style, tableItem, darkMode, selectTableItem}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    console.log("tableItem:", tableItem)
    
    navigate(tableItem)
    selectTableItem && selectTableItem('')
  }

  return (
    <tr className={`${style} ${darkMode ? 'border-Primary_700' : 'border-gray-100'} hover:bg-Primary_Accents_xs transition ease-in-out duration-250 cursor-pointer`}>
      {columns.map((column, columnIndex) => (
        <TableCell
          key={columnIndex}
          column={column}
          rowData={rowData}
        />
      ))}
    </tr>
  );
};

const mapStateToProps = (state: any) => ({
  tableItem: state.app.tableItem
});

const mapDispatchToProps = (dispatch:any) => ({
  selectTableItem: (data: any) => dispatch(selectTableItem(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);