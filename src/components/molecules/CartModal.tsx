import React from 'react';
import AppModal from '../organisms/CustomModal';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/app/app.action';
import CartItem from 'components/atoms/CartItem';

const CartModal = (props: any) => {

    console.log("Cart:", props?.shopping_cart);

    return (
        <AppModal
            handleClose={() => props.setShowCartModal(false)}
            modalStyle={`bg-white overflow-y-scroll desktop:w-[25%] w-2/5 mobile:w-4/5 min-h-fit max-h-[600px] mobile:max-h-[80vh] h-fit z-30 right-16 top-16 mobile:top-8 mobile:right-0 mobile:left-0 mobile:mx-auto animate-slide_left mobile:animate-fade_in rounded-xl mobile:rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition ease-in-out duration-500`}
            backDropStyle='!bg-BackDrop_d_sm mobile:!bg-BackDrop_d_lg'
            contentStyle="h-fit p-3 flex flex-col gap-2"
            closeBtnStyle='hidden'
        >
            {props?.shopping_cart.length > 0
                ? props.shopping_cart.map(item => (
                    <CartItem {...item} />
                ))

                : <span className='cursor-default font-normal text-sm leading-6 text-Danger rounded-md p-2 hover:bg-BackDrop_d_xs'>
                    There are no items in your cart yet
                </span>
            }
        </AppModal>
    )
}

const mapStateToProps = (state: any) => ({
    shopping_cart: state.app?.shopping_cart || []
});

const mapDispatchToProps = (dispatch: any) => ({
    addToCart: (data: any) => dispatch(addToCart(data)),
    removeFromCart: (id: any) => dispatch(removeFromCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);