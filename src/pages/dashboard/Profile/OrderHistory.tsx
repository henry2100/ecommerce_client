import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PageTitle from 'components/atoms/PageTitle';
import AppTable from 'components/organisms/app-table';
import TableDataSpan from 'components/organisms/app-table/TableDataSpan';
import { TransactionList } from './DummyData/DummyTransactionData';
import CopyText from 'components/atoms/CopyText';
import { connect } from 'react-redux';
import { BASE_URL, deleteRequest, getRequest } from 'services/http';
import removeIcon from '../../../assets/svg/trash.svg';
import Alert from 'components/atoms/Alert';
import { useNavigate } from 'react-router';

const OrderHistory = (props) => {
    const [loading, setLoading] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [orders, setOrders] = useState<any>([]);
    const [pageNum, setPageNum] = useState(null);
    const [recordsPerPage] = useState(10);

    const navigate = useNavigate();

    const refreshState = () => setRefresh((prevState) => !prevState);

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${props.accessToken}`
    }

    const getCurrentPage = (pageNumber) => {
        setPageNum(pageNumber);
    }

    const getOrders = async () => {
        setLoading(true);
        const res = await getRequest(`${BASE_URL}orders/all`, headers);

        if (res?.status === 200) {
            console.log('res:', res?.data.data);
            Alert('success', res?.data.message, props.darkMode);
            setOrders(res?.data.data)
            setLoading(false);
        } else {
            setLoading(false);
            setErrorState(true);
        }
    }

    const deleteOrder = async (id) => {
        const res = await deleteRequest(`${BASE_URL}orders/delete/${id}`, headers);

        if (res?.status === 200) {
            Alert('success', res?.data.message, props.darkMode);
        }
    }

    useEffect(() => {
        getOrders();
    }, [refresh])

    const columns = [
        {
            label: 'Date',
            render: (data) => <TableDataSpan
                onClick={() => navigate('/dashboard/order_invoice', { state: { orderId: data?._id } })}
                additionalClass='text-opacity-70 text-xs cursor-pointer'
                text={moment(data.createdAt).format('MMM DD, YYYY - LTS')}
            />
        },
        {
            label: 'Reference',
            render: (data) => <TableDataSpan
                handleMouseEnter={() => { }}
                additionalClass='text-opacity-70 text-xs cursor-pointer'
            >
                <CopyText
                    text={data._id}
                    textStyle=''
                />
            </TableDataSpan>
        },
        {
            label: 'No. of Items',
            render: (data) => <TableDataSpan
                onClick={() => navigate('/dashboard/order_invoice', { state: { orderId: data?._id } })}
                additionalClass='text-opacity-70 text-xs cursor-pointer'
                text={data.products.length}
            />
        },
        {
            label: 'Amount',
            render: (data) => <TableDataSpan
                onClick={() => navigate('/dashboard/order_invoice', { state: { orderId: data?._id } })}
                handleMouseEnter={() => { }}
                additionalClass="cursor-default"
                text={'NGN ' + Intl.NumberFormat().format(data.price)}
            />
        },
        {
            label: 'Status',
            render: (data) => <TableDataSpan
                onClick={() => navigate('/dashboard/order_invoice', { state: { orderId: data?._id } })}
                additionalClass='text-opacity-70 text-xs cursor-pointer'
            >
                <div className='flex gap-2 justify-start items-center'>
                    <span className={`${data.status === 'Success'
                        ? `${props.darkMode ? 'bg-[#027A481a]' : 'bg-Green_Accent8'} text-Success2`
                        : data.status === 'Failed'
                            ? `${props.darkMode ? 'bg-[#B423181a]' : 'bg-DangerAccent5'} text-Danger4`
                            : data.status === 'Pending'
                                ? `${props.darkMode ? 'bg-[#FFBF001a]' : 'bg-Yellow_Accent'} text-Yellow`
                                : `${props.darkMode ? 'bg-[#363F721a]' : 'bg-SecondaryAccent11'} text-PrimaryActive`
                        } px-[10px] py-[5px] rounded-md`}>
                        {data.status}
                    </span>
                </div>
            </TableDataSpan>
        },
        {
            label: 'Remove',
            render: (data) => <TableDataSpan
                additionalClass='text-opacity-70 text-xs cursor-pointer flex flex-end w-full'
            >
                <img src={removeIcon} alt='remove_icon' className='w-4 h-4' onClick={() => {
                    deleteOrder(data?._id);
                    refreshState();
                }} />
            </TableDataSpan>
        },
    ]

    return (

        <div className='flex flex-col gap-4'>
            <PageTitle
                pageTitle='Order history'
                pageTitleStyle='!font-semibold !text-xl mobile:!text-lg !text-Primary'
                style='!mb-0 !pb-0'
            />

            <div className='text-SecondaryAccent flex flex-col gap-4'>
                <AppTable
                    columns={columns}
                    data={orders}
                    itemsPerPage={recordsPerPage}
                    addedStyle={`h-[40vh] ${loading && 'h-[30vh]'}`}
                    loading={loading}
                    errorState={errorState}
                    // dataLength={orders.length}
                    getCurrentPage={getCurrentPage}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    darkMode: state.app.darkMode,
    accessToken: state.auth.user_authData.token.accessToken,
});

export default connect(mapStateToProps, null)(OrderHistory);