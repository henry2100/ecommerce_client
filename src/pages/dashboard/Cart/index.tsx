import CopyText from 'components/atoms/CopyText';
import PageTitle from 'components/atoms/PageTitle';
import AppTable from 'components/organisms/app-table';
import TableDataSpan from 'components/organisms/app-table/TableDataSpan';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { TransactionList } from '../Profile//DummyData/DummyTransactionData';
import { addToCart, addToQuantity, removeFromCart, removeFromQuantity } from '../../../redux/app/app.action';
import Button from 'components/atoms/Button';
import Alert from 'components/atoms/Alert';
import addIcon from '../../../assets/svg/math/math_add.svg';
import minusIcon from '../../../assets/svg/math/math_minus.svg';
import trashIcon from '../../../assets/svg/trash.svg';
import { getSumation } from 'utils';
import { useNavigate } from 'react-router';
import { BASE_URL, postRequest } from 'services/http';
import EditUserAddress from '../ModalComponents/EditUserAddress';

const Cart = (props) => {
    const [loading, setLoading] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const [pageNum, setPageNum] = useState(null);
    const [recordsPerPage] = useState(10);
    const [counter, setCounter] = useState(1);
    const [addressModal, setAddressModal] = useState(false);

    const navigate = useNavigate();

    // const headers = {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${props.accessToken}`
    // }

    const getCurrentPage = (pageNumber) => {
        setPageNum(pageNumber);
    }

    const calcPrice = props.price * counter;

    const cart = props.shopping_cart;

    const totalPrice = getSumation(props.shopping_cart.map(item => item.price));

    // console.log("Cart:", props.userData);

    const columns = [
        {
            label: 'Thumbnail',
            render: (data) => <TableDataSpan
                additionalClass='text-opacity-70 text-xs cursor-pointer'
            >
                <img src={data.productImg} alt='product_thumbnail' className='w-[50px] h-[50px] rounded-md' />
            </TableDataSpan>
        },
        {
            label: 'Product Name',
            render: (data) => <TableDataSpan
                handleMouseEnter={() => { }}
                // onClick={() => viewTransaction(data.reference)}
                additionalClass='text-opacity-70 text-xs cursor-pointer'
                text={data.name}
            />
        },
        {
            label: 'Price',
            render: (data) => <TableDataSpan
                handleMouseEnter={() => { }}
                // onClick={() => viewTransaction(data.reference)}
                additionalClass="cursor-default"
                text={data.currency + " " + (Intl.NumberFormat().format(data.price))}
            />
        },
        {
            label: 'Quantity',
            render: (data) => <TableDataSpan
                // onClick={() => viewTransaction(data.reference)}
                handleMouseEnter={() => { }}
                // text={data.paymentChannel}
                additionalClass='text-opacity-70 text-xs cursor-pointer'
            >
                <div className='w-fit flex gap-3 mobile:gap-2'>
                    <Button
                        btnType='button'
                        btnStyle={`${props.darkMode ? 'bg-Primary_800' : 'bg-Primary_300'} transition ease-in-out duration-250 w-8 h-8 mobile:w-5 mobile:h-5 rounded-md flex justify-center items-center cursor-pointer`}
                        btnImg={minusIcon}
                        btnImgStyle='w-3 h-3'
                        onClick={() => {
                            if (data.quantity <= 1) {
                                props.removeFromCart(data.id);
                            } else {
                                props.removeFromQuantity(data.id);
                            }
                        }}
                    />
                    <span className={`${props.darkMode ? 'bg-NoColor hover:bg-Primary_Accents_sm' : 'bg-[#f8fafc]'} transition ease-in-out duration-250 w-8 h-8 mobile:w-5 mobile:h-5 rounded-md flex justify-center items-center font-semibold text-xl mobile:text-lg text-Primary`}>
                        {data.quantity}
                    </span>
                    <Button
                        btnType='button'
                        btnStyle={`${props.darkMode ? 'bg-Primary_800' : 'bg-Primary_300'} hover:Primary_Accents_xs transition ease-in-out duration-250 w-8 h-8 mobile:w-5 mobile:h-5 rounded-md flex justify-center items-center cursor-pointer`}
                        btnImg={addIcon}
                        btnImgStyle='w-3 h-3'
                        onClick={() => {
                            if (data.quantity === props?.quantity_in_stock) {
                                Alert('warning', 'Maximum quantity reached');
                                return;
                            } else {
                                props.addToQuantity(data.id);
                            }
                        }}
                    />
                </div>
            </TableDataSpan>
        },
        {
            label: 'Action',
            render: (data) => <TableDataSpan
                additionalClass='text-opacity-70 text-xs cursor-pointer'
            >
                <div className='group hover:text-Danger flex items-center gap-3 transition ease-in-out duration-250'
                    onClick={() => props.removeFromCart(data.id)}
                >
                    <span className='w-8 h-8 rounded-full flex justify-center items-center group-hover:bg-[#FF3C381A] group-hover:animate-pulse transition ease-in-out duration-250'>
                        <img src={trashIcon} alt='remove_item' className='w-4 h-4' />
                    </span>
                    Remove
                </div>
            </TableDataSpan>
        }
    ]

    const createInvoice = async (reqData: any) => {
        setLoading(true);
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${props.accessToken}`
        };
        const res = await postRequest(`${BASE_URL}orders/create`, headers, reqData);

        if (res?.status === 200) {
            Alert('success', res?.data.message, props.darkMode);
            navigate('/dashboard/checkout', {state: {
                orderId: res?.data.data.orderId
            }});
            setLoading(false);
        } else {
            res?.data.message !== undefined && Alert('error', res?.data.message, props.darkMode);
            setLoading(false);
            setErrorState(true);
        }
    }

    const handleProceedToCheckout = () => {

        if (props.loggedIn) {
            const reqData = {
                userId:  props.userData._id,
                name:  props.userData.firstname+' '+props.userData.lastname,
                address:  props.userData.address.street+', '+props.userData.address.city+', '+props.userData.address.state,
                products: props.shopping_cart,
                currency: props.userData.country.currencySymbol,
                price: totalPrice
            }
            if(props.userData.address.street === '' || props.userData.address.city === '' || props.userData.address.state === ''){
                setAddressModal(true);
                Alert('error', 'You have to update your address information', props.darkMode);
            }else{
                createInvoice(reqData);
            }
        } else {
            return Alert('error', 'You have to sign in to proceed to Checkout', props.darkMode);
        }
    }

    return (
        <div className='flex flex-col gap-4 py-10 mobile:p-5'>
            <div className='desktop:max-w-6xl max-w-3xl mobile:max-w-full w-full mx-auto'>
                <PageTitle
                    pageTitle='Shopping Cart'
                    pageTitleStyle='!font-semibold !text-xl mobile:!text-lg !text-Primary'
                    style='!mb-0 !pb-0'
                />
            </div>

            <div className='text-SecondaryAccent flex tablet:flex-col gap-5 desktop:max-w-6xl max-w-3xl mobile:max-w-full w-full mx-auto'>
                <div className={`w-3/4 tablet:w-full overflow-hidden min-h-[30vh] rounded-lg`}>
                    <AppTable
                        columns={columns}
                        data={props.shopping_cart}
                        itemsPerPage={recordsPerPage}
                        addedStyle={`h-fit ${loading && errorState && 'h-[30vh]'}`}
                        loading={loading}
                        errorState={errorState}
                        // dataLength={TransactionList.length}
                        getCurrentPage={getCurrentPage}
                    />
                </div>
                <div className={`${props.darkMode ? 'bg-Primary_800' : 'bg-Primary_300'} w-1/4 tablet:w-full min-h-[30vh] rounded-lg p-5 flex flex-col justify-between gap-5`}>
                    <div>
                        <PageTitle
                            pageTitle='Transaction Summary'
                            pageTitleStyle='!font-semibold !text-xl mobile:!text-lg !text-Primary'
                            style='mb-8 !pb-0'
                        />

                        <div className='w-full flex flex-col gap-8'>
                            <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex justify-between items-center gap-5 font-normal border-b pb-1`}>
                                <p className={`${props.darkMode ? 'text-Primary' : 'text-Primary'} text-base mobile:text-sm`}>Number of Items</p>
                                <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} ${props.authData?.data?.settlementInfo?.bankName !== '' ? props.darkMode ? 'text-white' : 'text-PrimaryActive' : props.darkMode ? 'text-BackDrop_l_md' : 'text-BackDrop_d_sm'} text-lg mobile:text-base`}>
                                    {props.shopping_cart.length}
                                </p>
                            </span>
                            <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex justify-between items-center gap-5 font-normal border-b pb-1`}>
                                <p className={`${props.darkMode ? 'text-Primary' : 'text-Primary'} text-base mobile:text-sm`}>Total Price</p>
                                <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} ${props.authData?.data?.settlementInfo?.bankName !== '' ? props.darkMode ? 'text-white' : 'text-PrimaryActive' : props.darkMode ? 'text-BackDrop_l_md' : 'text-BackDrop_d_sm'} text-lg mobile:text-base`}>
                                    {Intl.NumberFormat().format(totalPrice)}
                                </p>
                            </span>
                        </div>
                    </div>
                    <Button
                        btnType='button'
                        btnText='Proceed to Checkout'
                        btnStyle={`${props.darkMode ? 'bg-Primary_700 text-Primary hover:bg-BackDrop_d_xs' : 'bg-SecondaryAccent5 text-Primary'} w-full mobile:w-full relative right-0 top-0 z-[22] mb-0 text-sm !rounded-lg truncate flex gap-4 justify-center items-center px-5 py-2 font-normal text-base leading-7 rounded-lg truncate transition ease-in-out duration-250`}
                        onClick={handleProceedToCheckout}
                    />
                </div>
            </div>
            {addressModal && <EditUserAddress setAddressModal={setAddressModal} />}
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    darkMode: state.app.darkMode,
    loggedIn: state.auth?.user_loggedIn,
    userData: state.auth.user_authData?.data,
    accessToken: state.auth.user_authData?.token.accessToken,
    shopping_cart: state.app?.shopping_cart || []
});

const mapDispatchToProps = (dispatch: any) => ({
    addToCart: (data: any) => dispatch(addToCart(data)),
    removeFromCart: (id: any) => dispatch(removeFromCart(id)),
    addToQuantity: (id: any) => dispatch(addToQuantity(id)),
    removeFromQuantity: (id: any) => dispatch(removeFromQuantity(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart)