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
  tableItem?: string
  selectTableItem?: (data:any) => void
} & ReturnType<typeof mapStateToProps>;

const TableRow: React.FC<TableRowProps> = ({ columns, rowData, style, tableItem, selectTableItem}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    console.log("tableItem:", tableItem)
    
    navigate(tableItem)
    selectTableItem && selectTableItem('')
  }

  return (
    // <tr className={`${style} border-b border-gray-100 hover:bg-GrayCustom3 hover:bg-opacity-30 transition-all cursor-pointer`} onClick={handleClick}>
    <tr className={`${style} border-b border-gray-100 hover:bg-GrayCustom3 hover:bg-opacity-30 transition-all cursor-pointer`}>
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