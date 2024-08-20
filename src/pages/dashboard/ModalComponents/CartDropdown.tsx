import React from 'react';
import AppModal from '../../../components/organisms/CustomModal';
import { connect } from 'react-redux';
import { addToCart, clearShoppingCart, removeFromCart } from '../../../redux/app/app.action';
import CartItem from 'components/atoms/CartItem';
import Button from 'components/atoms/Button';
import { useNavigate } from 'react-router';
import closeIcon from '../../../assets/svg/close_x_red.svg';
import DropdownCard from 'components/atoms/DropdownCard';

type Props = {
    darkMode: boolean,
    shopping_cart: any[],
    addToCart: (e:any) => void,
    clearShoppingCart: () => void,
    removeFromCart: (e:any) => void,
    setShowCartModal: (e:any) => void,
}

const CartDropdown = (props: Props) => {
    const navigate = useNavigate();

    // console.log("Cart:", props?.shopping_cart);

    return (
        <DropdownCard handleClickOut={props.setShowCartModal} cardLayout={`${props.darkMode ? 'bg-Primary_800' : 'bg-Primary_200'} overflow-hidden absolute top-16 mobile:top-24 left-0 mobile:right-0 mobile:mx-auto rounded-md w-[350px] mobile:w-4/5 h-fit shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] animate-slide_down2 transition ease-in-out duration-500 custom_container`}>
            <div className={`h-full overflow-y-scroll desktop:max-h-[60vh] max-h-[90vh] flex flex-col`}>
                {props?.shopping_cart.length > 0
                    ? props.shopping_cart.map((item, i) => (
                        <CartItem key={i} {...item} className={i !== props.shopping_cart.length - 1 && `border-b-[.5px] ${props.darkMode ? 'border-Primary_600' : 'border-Primary_200'}`} handleClose={() => props.setShowCartModal(false)}/>
                    )).reverse()

                    : <span className={`${props.darkMode ? 'text-Primary_200' : 'text-Primary_800'} flex justify-between items-center cursor-default font-normal text-sm leading-6 rounded-md p-2 hover:bg-BackDrop_d_xs`}>
                        There are no items in your cart yet
                        {/* <img src={closeIcon} alt='close' className='w-4 h-4 cursor-pointer' onClick={() => props.setShowCartModal(false)}/> */}
                    </span>
                }
            </div>
            <div className={`${props?.shopping_cart.length === 0 ? 'hidden' : 'block'} ${props.darkMode ? 'bg-Primary_700' : 'bg-Primary_200'} flex gap-5 p-3`}>
                <Button
                    btnType='button'
                    btnText='Open Cart'
                    btnStyle={`${props.darkMode ? 'bg-Primary_800 text-Primary hover:bg-Primary_700' : 'bg-Primary_300 text-Primary'} w-3/4 mobile:w-full relative right-0 top-0 z-[22] mb-0 text-sm !rounded-lg truncate flex gap-4 justify-center items-center px-5 py-2 font-normal text-base leading-7 rounded-lg truncate transition ease-in-out duration-250`}
                    onClick={() => {
                        navigate('/dashboard/cart')
                        props.setShowCartModal(false)
                    }}
                />
                <Button
                    btnType='button'
                    btnText='Clear'
                    btnStyle={`${props.darkMode ? 'bg-Primary_800 hover:bg-PrimaryActive' : 'bg-Primary hover:bg-Primary_300'} w-1/4 mobile:w-full relative right-0 top-0 z-[22] mb-0 text-sm !rounded-lg truncate flex gap-4 justify-center items-center px-5 py-2 font-normal text-base leading-7 rounded-lg truncate text-white transition ease-in-out duration-250`}
                    onClick={() => props.clearShoppingCart()}
                />
            </div>
        </DropdownCard>
    )
}

const mapStateToProps = (state: any) => ({
    darkMode: state.app.darkMode,
    shopping_cart: state.app?.shopping_cart || []
});

const mapDispatchToProps = (dispatch: any) => ({
    addToCart: (data: any) => dispatch(addToCart(data)),
    removeFromCart: (id: any) => dispatch(removeFromCart(id)),
    clearShoppingCart: () => dispatch(clearShoppingCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);