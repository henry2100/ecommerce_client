import React, { useEffect, useState } from 'react';
import PageTitle from 'components/atoms/PageTitle';
import { connect } from 'react-redux';
import editicon from '../../../assets/svg/edit-black.svg';
import leftArrow_d from '../../../assets/svg/arrows/arrow_dl.svg';
import leftArrow_w from '../../../assets/svg/arrows/arrow_wl.svg';
import EditSettlement from '../ModalComponents/EditSettlement';
import EditUserAddress from '../ModalComponents/EditUserAddress';
import Alert from 'components/atoms/Alert';
import CreditCardForm from 'components/molecules/CreditCardInput';
import { getSumation } from 'utils';
import { useLocation, useNavigate } from 'react-router';
import { BASE_URL, deleteRequest } from 'services/http';
import { clearShoppingCart } from '../../../redux/app/app.action';

const Checkout = (props) => {
    const [addressModal, setAddressModal] = useState(false);
    const [settlementModal, setSettlementModal] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const orderId = location.state?.orderId;

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${props.accessToken}`
    }

    useEffect(() => {
        if (orderId === undefined || orderId === null) {
            navigate(-1);
            Alert('error', 'Something went wrong, please try again', props.darkMode);
        }
    }, [orderId, navigate]);

    useEffect(() => {
        if (
            props.userData?.address?.street === '' ||
            props.userData?.address?.city === '' ||
            props.userData?.address?.state === ''
        ) {
            Alert('error', 'You have to update your address information', props.darkMode);
            setAddressModal(true);
        }
    }, [props.userData, props.darkMode]);

    const productPrices = props.shopping_cart.map(item => item.price);
    const totalprice = getSumation(productPrices);

    const OrderInvoice = location.state;

    const creditCardHandler = (status) => {
        if (status) {
            Alert('success', 'Transaction Successful', props.darkMode);
            setTimeout(() => {
                navigate('/dashboard/order_invoice', { state: {orderId: orderId} });
                props.clearShoppingCart();
            }, 1500);
        } else {
            Alert('error', 'Please, fill all fields');
        }
    };

    const deleteOrder = async () => {
        const res = await deleteRequest(`${BASE_URL}orders/delete/${orderId}`, headers);

        // console.log("Delete_order_response:", res, props.accessToken);
        
        if (res?.status === 200) {
            Alert('success', res?.data.message, props.darkMode);
            navigate('/dashboard/home');
        } else {
            res?.data.message !== undefined && Alert('error', res?.data.message, props.darkMode);
        }
    };

    const cancelOrder = () => {
        deleteOrder();
    };

    return (
        <div className='flex flex-col gap-4 py-10 mobile:p-5'>
            <div className='desktop:max-w-6xl max-w-xl mobile:max-w-full w-full mx-auto relative flex mobile:flex-col items-start gap-5'>
                <div className={`group -left-24 flex items-center w-fit h-auto px-2 py-1 rounded-md cursor-pointer hover:bg-Primary_Accents_md mobile:bg-Primary_Accents_md transition ease-in duration-250`}
                    onClick={() => navigate(-1)}
                >
                    <img src={props.darkMode ? leftArrow_w : leftArrow_d} alt='back_button' className='w-4 h-4' />
                    <p className='font-normal text-sm mobile:text-xs text-Primary group-hover:text-Primary_300'>Back</p>
                </div>
                
                <PageTitle
                    pageTitle='Checkout'
                    pageTitleStyle='!font-semibold !text-xl mobile:!text-lg !text-Primary'
                    style='!mt-0 !mb-12 !pb-0'
                />
            </div>

            <div className='text-SecondaryAccent flex mobile:flex-col gap-5 desktop:max-w-6xl max-w-xl mobile:max-w-full w-full mx-auto'>
                <div className='w-full flex flex-col gap-8'>
                    <div className='flex justify-between items-center'>
                        <PageTitle
                            pageTitle='Address'
                            pageTitleStyle='!font-semibold !text-base mobile:!text-sm !text-PrimaryActive'
                            style='!mb-0 !pb-0'
                        />
                        <img src={editicon} alt='edit' className='w-4 h-4 cursor-pointer' onClick={() => setAddressModal(true)} />
                    </div>
                    <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex flex-col gap-1 font-normal border-b pb-1`}>
                        <p className={`${props.darkMode ? 'text-Primary_600' : 'text-GrayCustom1'} text-xs tablet:text-[10px]`}>Name</p>
                        <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} text-sm tablet:text-xs`}>
                            {props.userData?.data.firstname + " " + props.userData?.data.lastname}
                        </p>
                    </span>

                    <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex flex-col gap-1 font-normal border-b pb-1`}>
                        <p className={`${props.darkMode ? 'text-Primary_600' : 'text-GrayCustom1'} text-xs tablet:text-[10px]`}>Email</p>
                        <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} text-sm tablet:text-xs`}>
                            {props.userData?.data.email}
                        </p>
                    </span>

                    <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex flex-col gap-1 font-normal border-b pb-1`}>
                        <p className={`${props.darkMode ? 'text-Primary_600' : 'text-GrayCustom1'} text-xs tablet:text-[10px]`}>Delivery Address</p>
                        <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} ${!props.userData?.data.address?.street && 'text-BackDrop_d_sm'} text-sm tablet:text-xs`}>
                            {props.userData?.data.address?.street || 'Enter house address'}
                        </p>
                    </span>

                    <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex flex-col gap-1 font-normal border-b pb-1`}>
                        <p className={`${props.darkMode ? 'text-Primary_600' : 'text-GrayCustom1'} text-xs tablet:text-[10px]`}>City, State</p>
                        <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} ${!props.userData?.data.address?.city && !props.userData?.data.address?.state && 'text-BackDrop_d_sm'} text-sm tablet:text-xs`}>
                            {props.userData?.data.address?.city && props.userData?.data.address?.state ? `${props.userData?.data.address?.city}, ${props.userData?.data.address?.state}` : 'Enter city and state of residence'}
                        </p>
                    </span>

                    <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex flex-col gap-1 font-normal border-b pb-1`}>
                        <p className={`${props.darkMode ? 'text-Primary_600' : 'text-GrayCustom1'} text-xs tablet:text-[10px]`}>Country</p>
                        <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} text-sm tablet:text-xs`}>
                            {props.userData?.data.country?.country}
                        </p>
                    </span>
                </div>

                <div className={`${props.darkMode ? 'bg-BackDrop_d_sm' : 'bg-Primary_200'} w-full p-5 rounded-lg flex flex-col gap-5`}>
                    <div className='flex items-center gap-5 w-full'>
                        <span className={`${props.darkMode ? 'bg-Primary_700' : 'bg-Primary_Accents_md'} w-full p-3 rounded-md`}>
                            <p className='font-normal text-base mobile:text-sm'>Number of Items</p>
                            <p className={`${props.darkMode ? 'text-Primary_200' : 'text-Primary_800'} font-semibold text-2xl mobile:text-xl`}>
                                {props.shopping_cart.length}
                            </p>
                        </span>

                        <span className={`${props.darkMode ? 'bg-Primary_700' : 'bg-Primary_Accents_md'} w-full p-3 rounded-md`}>
                            <p className='font-normal text-base mobile:text-sm'>Total Amount</p>
                            <p className={`${props.darkMode ? 'text-Primary_200' : 'text-Primary_800'} font-semibold text-2xl mobile:text-xl`}>
                                {props.userData?.data.country?.currencySymbol} {Intl.NumberFormat().format(totalprice)}
                            </p>
                        </span>
                    </div>

                    <CreditCardForm creditCardHandler={creditCardHandler} cancelOrder={cancelOrder} darkMode={props.darkMode} />
                </div>
            </div>
            {addressModal && <EditUserAddress setAddressModal={setAddressModal} />}
        </div>
    );
};

const mapStateToProps = (state) => ({
    darkMode: state.app.darkMode,
    shopping_cart: state.app.shopping_cart || [],
    userData: state.auth.user_authData,
    accessToken: state.auth.user_authData?.token.accessToken,
});

const mapDispatchToProps = (dispatch:any) => ({
    clearShoppingCart: () => dispatch(clearShoppingCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
