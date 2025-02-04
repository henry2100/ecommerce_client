import React, { useRef, useState } from 'react';
import addIcon from '../../assets/svg/math/math_add.svg';
import minusIcon from '../../assets/svg/math/math_minus.svg';
import product_placeholder from '../../assets/svg/product_placeholder.png';
import Alert from 'components/atoms/Alert';
import Button from 'components/atoms/Button';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import trashIcon from '../../assets/svg/trash.svg';
import { BASE_URL, deleteRequest } from 'services/http';

const AdminProductCard = (props) => {
    const [counter, setCounter] = useState(0);
    const [showDetails, setShowDetails] = useState(false);

    const navigate = useNavigate();

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${props.accessToken}`
    }

    const calcPrice = props.price * counter;

    const disableBtn = props.quantity === 0;

    const handleRedirect = () => {
        navigate(`/dashboard/product/${props.productId}`);
    }

    const deleteProduct = async (productId:any) => {
        const res = await deleteRequest(`${BASE_URL}products/remove/${productId}`, headers);

        if (res?.status === 200) {
            Alert('success', res?.data.message, props.darkMode);
        }
    }

    return (
        <div className={`group relative overflow-hidden rounded-lg min-w-[200px] max-w-[200px] w-[200px] h-[200px] mobile:min-w-[182px] transition flex-shrink-0 ease-in duration-250`}>
            {props.quantity === 0 &&
                <div className='absolute w-24 h-24 mobile:w-16 mobile:h-16 flex justify-center items-center bg-DangerAccent3 p-2 right-3 top-3 mobile:right-1 mobile:top-1 rounded-full'>
                    <p className='font-normal text-base mobile:text-[10px] text-wrap text-center text-SecondaryAccent'>Out of stock</p>
                </div>
            }

            <img src={props.productImg[0] !== '' ? props.productImg[props.productImg.length - 1] : product_placeholder} alt="product_placeholder" className='absolute transition ease-in-out duration-250 w-full h-full object-cover' />

            <div className={`hidden group-hover:flex transition ease-in-out duration-250 animate-fade_in absolute z-20 w-full h-full ${props.productImg[0] !== '' ? 'bg-BackDrop_d_2xl' : 'bg-Primary_Accents_md'}`}></div>

            <div className={`hidden group-hover:flex flex-col transition ease-in-out duration-250 absolute z-20 gap-2 mobile:gap-2 w-full h-full bg-[#00000000] rounded-lg p-2 mobile:p-1 animate-fade_in`}>
                <p className={`font-bold text-base mobile:text-sm ${props.productImg[0] !== '' ? 'text-PrimaryDisabled' : 'text-PrimaryActive'}`}>{props.name.length > 15 ? props.name.slice(0, 15) + '...' : props.name}</p>
                <p className={`font-light text-xs mobile:text-[10px] mobile:leading-4 ${props.productImg[0] !== '' ? 'text-PrimaryDisabled' : 'text-PrimaryActive'}`}>{props.desc.length > 50 ? props.desc.slice(0, 50) + "..." : props.desc}</p>

                <div className='flex flex-col gap-1 w-4/5 mt-1'>
                    <span className='flex justify-between items-center gap-3 leading-4'>
                        <p className={`font-normal text-sm mobile:text-xs ${props.productImg[0] !== '' ? 'text-PrimaryDisabled' : 'text-Primary'}`}>In Stock</p>
                        <p className={`font-semibold text-base mobile:text-sm ${props.productImg[0] !== '' ? 'text-Primary_200' : 'text-PrimaryActive'}`}>{props.quantity}</p>
                    </span>

                    <span className='flex justify-between items-center gap-3 leading-4'>
                        <p className={`font-normal text-sm mobile:text-xs ${props.productImg[0] !== '' ? 'text-PrimaryDisabled' : 'text-Primary'}`}>Price</p>
                        <p className={`font-semibold text-base mobile:text-sm ${props.productImg[0] !== '' ? 'text-Primary_200' : 'text-PrimaryActive'}`}>{Intl.NumberFormat().format(props.price)}</p>
                    </span>
                </div>
            </div>

            <span className='hidden group-hover:flex justify-center items-center absolute transition ease-in-out duration-250 bottom-1 left-1 z-[22] w-10 h-10 bg-NoColor hover:bg-[#C2040033] rounded-full animate-pulse cursor-pointer'
                onClick= {() => deleteProduct(props.productId)}
            >
                <img src={trashIcon} alt='delete_btn' className='w-4 h-4' />
            </span>

            <Button
                btnType='button'
                btnText='View'
                btnStyle={`${props.darkMode ? 'text-Primary' : 'text-Primary_200'} absolute right-1 bottom-1 z-[22] px-5 py-2 w-fit font-bold text-base mobile:text-sm bg-NoColor hover:bg-[#94a3b833] hover:!text-white hover:border-none hover:shadow-none ${!disableBtn && 'hover:text-Primary_Accents_3xl'}`}
                disabled={false}
                onClick={() => { }}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    darkMode: state.app.darkMode,
    accessToken: state.auth.user_authData.token.accessToken,
})

export default connect(mapStateToProps, null)(AdminProductCard);