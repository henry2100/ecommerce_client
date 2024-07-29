import PageTitle from 'components/atoms/PageTitle';
import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { useReactToPrint } from 'react-to-print'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Button from 'components/atoms/Button';
import { BASE_URL, getRequest, putRequest } from 'services/http';
import Alert from 'components/atoms/Alert';
import Spinner from 'components/atoms/Spinner';

const OrderInvoice = (props) => {
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState<any>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const useNewRefEle = useRef<HTMLDivElement>(null);

    const orderID = location.state.orderId;

    const disableBtn = orderData.status === 'Success';

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${props.accessToken}`
    }

    console.log("OrderInvoice:", location.state.orderId);

    const getOrderInvoice = async () => {
        setLoading(true);
        const res = await getRequest(`${BASE_URL}orders/order/${orderID}`, headers);

        if (res?.status === 200) {
            Alert('success', res?.data.message, props.darkMode);
            // navigate('/dashboard/home');
            setOrderData(res?.data.data);
            setLoading(false);
        } else {
            res?.data.message !== undefined && Alert('error', res?.data.message, props.darkMode);
            setLoading(false);
        }
    }

    useEffect(() => {
        getOrderInvoice();
    }, [orderID, orderData.status]);

    const handlePrint = useReactToPrint({
        content: () => useNewRefEle.current,
    });

    const handleDownloadPdf = () => {
        const input = useNewRefEle.current;
        if (input) {
            html2canvas(input)
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF();
                    const imgProps = pdf.getImageProperties(imgData);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save('download.pdf');
                })
                .catch((error) => {
                    console.error('Could not generate PDF', error);
                });
        }
    };

    const confirmOrderStatus = async (reqData: any) => {
        setLoading(true);
        const res = await putRequest(`${BASE_URL}orders/update/${orderID}`, headers, reqData);

        console.log('update_order_res:', res);

    }

    const handleConfirmOrder = () => {
        confirmOrderStatus({ status: 'Success' });
    }

    useEffect(() => {
        if (location.state.orderId === null || undefined) {
            navigate(-1);
        }
    }, []);

    return (
        <div className='flex flex-col gap-4 py-10 mobile:p-5'>
            <div className='desktop:max-w-6xl max-w-xl mobile:max-w-full w-full mx-auto'>
                <PageTitle
                    pageTitle='Checkout'
                    pageTitleStyle='!font-semibold !text-xl mobile:!text-lg !text-Primary'
                    style='!mb-12 !pb-0'
                />
            </div>

            <div ref={useNewRefEle} className={`${props.darkMode ? 'bg-Primary_800' : 'bg-Primary_200'} ${loading && 'min-h-[60vh] justify-center items-center'} p-5 rounded-lg flex flex-col gap-5 desktop:max-w-xl max-w-xl mobile:max-w-full w-full mx-auto`}>
                {loading
                    ? <Spinner
                        text='Processing...'
                        textStyle='font-bold text-lg mobile:text-sm text-white'

                    />

                    : <>
                        <PageTitle
                            pageTitle='Order Invoice'
                            pageTitleStyle='!font-semibold !text-xl mobile:!text-lg !text-Primary'
                            style='!mb-4 !pb-0'
                        />

                        <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex flex-col gap-1 font-normal border-b pb-1`}>
                            <p className={`text-Primary text-xs tablet:text-[10px]`}>Name</p>
                            <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} text-semibold text-base tablet:text-sm`}>
                                {orderData.name}
                            </p>
                        </span>

                        <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex flex-col gap-1 font-normal border-b pb-1`}>
                            <p className={`text-Primary text-xs tablet:text-[10px]`}>Delivery Address</p>
                            <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} text-semibold text-base tablet:text-sm`}>
                                {orderData.address}
                            </p>
                        </span>

                        <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex justify-between items-center gap-5 font-normal border-b pb-1`}>
                            <p className={`text-Primary text-xs tablet:text-[10px]`}>Order Status</p>

                            <span className={`${orderData.status === 'Success'
                                ? `${props.darkMode ? 'bg-[#027A481a]' : 'bg-Green_Accent8'} text-Success2`
                                : orderData.status === 'Failed'
                                    ? `${props.darkMode ? 'bg-[#B423181a]' : 'bg-DangerAccent5'} text-Danger4`
                                    : orderData.status === 'Pending'
                                        ? `${props.darkMode ? 'bg-[#FFBF001a]' : 'bg-Yellow_Accent'} text-Yellow`
                                        : `${props.darkMode ? 'bg-[#363F721a]' : 'bg-SecondaryAccent11'} text-PrimaryActive`
                                } px-[10px] py-[5px] w-fit rounded-md`}>
                                {orderData.status}
                            </span>
                        </span>

                        <div className='flex flex-col justify-between gap-5 my-8'>
                            <div className={`text-Primary_600 flex mobile:flex-col justify-between gap-5 border-b-[.5px]`}>
                                <span className='w-2/4 text-left'>
                                    <p className='font-semibold text-lg'>Product Name</p>
                                </span>
                                <span className='w-1/4 text-right'>
                                    <p className='font-normal text-base'>Quantity</p>
                                </span>
                                <span className='w-1/4 text-right'>
                                    <p className='font-normal text-base'>Price</p>
                                </span>
                            </div>

                            {orderData.products?.map(item => (
                                <div className={`${props.darkMode ? 'text-Primary_300' : 'text-PrimaryActive'} border-b-[.5px] border-PrimaryActive flex mobile:flex-col justify-between gap-5`}>
                                    <span className='w-2/4 text-left'>
                                        <p className='font-semibold text-base'>{item.name}</p>
                                    </span>
                                    <span className='w-1/4 text-right'>
                                        <p className='font-normal text-base'>{item.quantity}</p>
                                    </span>
                                    <span className='w-1/4 text-right'>
                                        <p className='font-normal text-base'>{Intl.NumberFormat().format(item.price)}</p>
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className='flex mobile:flex-col justify-end gap-5'>
                            <Button
                                btnType='button'
                                btnText='Print'
                                btnStyle={`${props.darkMode ? 'bg-Primary_800 text-Primary hover:bg-Primary_700' : 'bg-SecondaryAccent5 text-Primary'} w-fit relative right-0 top-0 z-[22] mb-0 text-sm !rounded-lg truncate flex gap-4 justify-center items-center px-5 py-2 font-normal text-base leading-7 rounded-lg truncate transition ease-in-out duration-250`}
                                onClick={handlePrint}
                            />
                            <Button
                                btnType='button'
                                btnText='Download'
                                btnStyle={`${props.darkMode ? 'bg-Primary_600 hover:bg-PrimaryActive' : 'bg-Primary hover:bg-Primary_300'} w-fit relative right-0 top-0 z-[22] mb-0 text-sm !rounded-lg truncate flex gap-4 justify-center items-center px-5 py-2 font-normal text-base leading-7 rounded-lg truncate text-white transition ease-in-out duration-250`}
                                onClick={handleDownloadPdf}
                            />
                        </div>
                    </>}
            </div>

            <div className='flex justify-center items-center'>
                <Button
                    btnType='button'
                    btnText='Confirm Order'
                    btnStyle={`${props.darkMode ? 'bg-Primary_600 hover:bg-PrimaryActive' : 'bg-Primary hover:bg-Primary_300'} ${disableBtn && 'cursor-not-allowed hover:!bg-NoColor'} w-fit relative right-0 top-0 z-[22] mb-0 text-sm !rounded-lg truncate flex gap-4 justify-center items-center px-5 py-2 font-normal text-base leading-7 rounded-lg truncate text-white transition ease-in-out duration-250`}
                    onClick={handleConfirmOrder}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    darkMode: state.app.darkMode,
    accessToken: state.auth.user_authData?.token.accessToken
});

export default connect(mapStateToProps, null)(OrderInvoice);