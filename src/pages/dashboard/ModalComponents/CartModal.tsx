import React from 'react';
import AppModal from '../../../components/organisms/CustomModal';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../../redux/app/app.action';
import CartItem from 'components/atoms/CartItem';
import Button from 'components/atoms/Button';
import { useNavigate } from 'react-router';

const CartModal = (props: any) => {
    const navigate = useNavigate();

    console.log("Cart:", props?.shopping_cart);

    return (
        <AppModal
            handleClose={() => props.setShowCartModal(false)}
            modalStyle={`shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] overflow-scroll desktop:w-[25%] w-2/5 mobile:w-4/5 min-h-fit max-h-[600px] mobile:max-h-[80vh] h-fit z-30 right-16 top-16 mobile:top-8 mobile:right-0 mobile:left-0 mobile:mx-auto animate-slide_left mobile:animate-fade_in rounded-xl mobile:rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition ease-in-out duration-500`}
            backDropStyle='!bg-BackDrop_d_md mobile:!bg-BackDrop_d_lg'
            contentStyle={`h-fit flex flex-col  custom_container ${props.darkMode ? 'bg-Primary_800' : 'bg-white'}`}
            closeBtnStyle='hidden'
        >
            <div className={`${props?.shopping_cart.length === 0 ? 'hidden' : 'block'} p-3`}>
                <Button
                    btnType='button'
                    btnText='Open Cart'
                    btnStyle={`${props.darkMode ? 'bg-Primary_700 hover:bg-Primary_Accents_md' : 'bg-Primary hover:bg-Primary_300'} px-5 py-2 w-full font-bold text-lg mobile:text-sm text-white`}
                    onClick={() => {
                        navigate('/dashboard/cart')
                        props.setShowCartModal(false)
                    }}
                />
            </div>
            <div className={`h-fit overflow-y-scroll flex flex-col max-h-[30%]`}>
                {props?.shopping_cart.length > 0
                    ? props.shopping_cart.map((item, i) => (
                        <CartItem key={i} {...item} className={i !== props.shopping_cart.length - 1 && `border-b-[.5px] ${props.darkMode ? 'border-Primary_600' : 'border-Primary_200'}`} />
                    )).reverse()

                    : <span className='cursor-default font-normal text-sm leading-6 text-Danger rounded-md p-2 hover:bg-BackDrop_d_xs'>
                        There are no items in your cart yet
                    </span>
                }
            </div>


        </AppModal>
    )
}

const mapStateToProps = (state: any) => ({
    darkMode: state.app.darkMode,
    shopping_cart: state.app?.shopping_cart || []
});

const mapDispatchToProps = (dispatch: any) => ({
    addToCart: (data: any) => dispatch(addToCart(data)),
    removeFromCart: (id: any) => dispatch(removeFromCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);




// {props?.shopping_cart.length > 0
//     ? props.shopping_cart.map((item, i) => (
//         <CartItem key={i} {...item} className={i !== props.shopping_cart.length - 1 && `border-b-[.5px] ${props.darkMode ? 'border-Primary_600' : 'border-Primary_200'}`} />
//     ))

//     : <span className='cursor-default font-normal text-sm leading-6 text-Danger rounded-md p-2 hover:bg-BackDrop_d_xs'>
//         There are no items in your cart yet
//     </span>
// }