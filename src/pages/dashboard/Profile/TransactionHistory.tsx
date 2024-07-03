import React, { useState } from 'react'
import PageTitle from 'components/atoms/PageTitle'
import AppTable from 'components/organisms/app-table'
import TableDataSpan from 'components/organisms/app-table/TableDataSpan'
import {TransactionList} from './DummyData/DummyTransactionData'
import moment from 'moment'
import CopyText from 'components/atoms/CopyText'

const TransactionHistory = () => {
    const [loading, setLoading] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const [pageNum, setPageNum] = useState(null);
    const [recordsPerPage] = useState(10);
    

    const getCurrentPage = (pageNumber) => {
        setPageNum(pageNumber);
    }

    const columns = [
        {
            label: 'Date',
            render: (data) => <TableDataSpan
                handleMouseEnter={() => { }}
                // onClick={() => viewTransaction(data.reference)}
                additionalClass='text-opacity-70 text-xs cursor-pointer'
                text={moment(data.date).format('MMM DD, YYYY - LTS')}
            />
        },
        {
            label: 'Customer Name',
            render: (data) => <TableDataSpan
                handleMouseEnter={() => { }}
                // onClick={() => viewTransaction(data.reference)}
                additionalClass='text-opacity-70 text-xs cursor-pointer'
                text={data.customerName}
            />
        },
        {
            label: 'Amount',
            render: (data) => <TableDataSpan
                handleMouseEnter={() => { }}
                // onClick={() => viewTransaction(data.reference)}
                additionalClass="cursor-default"
                text={data.currency + " " + (Intl.NumberFormat().format(data.transactionAmount))}
            />
        },
        {
            label: 'Payment Channel',
            render: (data) => <TableDataSpan
                // onClick={() => viewTransaction(data.reference)}
                handleMouseEnter={() => { }}
                text={data.paymentChannel}
                additionalClass='text-opacity-70 text-xs cursor-pointer'
            />
        },
        {
            label: 'Transaction Reference',
            render: (data) => <TableDataSpan
                // onClick={() => viewTransaction(data.reference)}
                handleMouseEnter={() => { }}
                additionalClass='text-opacity-70 text-xs cursor-pointer'
            >
                <CopyText
                    text={data.reference}
                    textStyle=''
                    
                />
            </TableDataSpan>
        },
        {
            label: 'Status',
            render: (data) => <TableDataSpan
                handleMouseEnter={() => { }}
                // onClick={() => viewTransaction(data.reference)}
                additionalClass='text-opacity-70 text-xs cursor-pointer'
            >
                <div className='flex gap-2 justify-start items-center'>
                    <span className={`${data.status === 'Success' ? 'bg-Green_Accent8 text-Success2' : data.status === 'Failed' ? 'bg-DangerAccent5 text-Danger4' : data.status === 'Pending' ? 'bg-Yellow_Accent text-Yellow' : 'bg-SecondaryAccent11 text-Accent_blue6'} px-[10px] py-[5px] rounded-md`}>
                        {data.status}
                    </span>
                </div>
            </TableDataSpan>
        },
    ]

    return (
        <div className='flex flex-col gap-4'>
            <PageTitle
                pageTitle='Transaction History'
                pageTitleStyle='!font-semibold !text-xl mobile:!text-lg !text-Primary'
                style='!mb-0 !pb-0'
            />

            <div className='text-SecondaryAccent flex flex-col gap-4'>
                <AppTable
                    columns={columns}
                    data={TransactionList}
                    itemsPerPage={recordsPerPage}
                    addedStyle={`h-[40vh] ${loading && 'h-[30vh]'}`}
                    loading={loading}
                    errorState={errorState}
                    // dataLength={TransactionList.length}
                    getCurrentPage={getCurrentPage}
                />
            </div>
        </div>
    )
}

export default TransactionHistory