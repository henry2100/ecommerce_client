import React, { useEffect, useState } from 'react'
import Button from './Button';
import addIcon from '../../assets/svg/math/math_add.svg';
import minusIcon from '../../assets/svg/math/math_minus.svg';
import removeIcon from '../../assets/svg/trash.svg';
import Alert from './Alert';
import { addToQuantity, removeFromCart, removeFromQuantity } from '../../redux/app/app.action';
import { connect } from 'react-redux';

const CartItem = (props: any) => {
    const [counter, setCounter] = useState(props?.quantity);

    const calcPrice = props ? props?.init_price * counter : 0;

    useEffect(() => {
        if (counter < 1) {
            props?.removeFromCart(props?.id);
        }
    }, [counter]);

    return (
        <div className={`group ${props.darkMode ? 'text-slate-500 bg-Primary_800' : 'text-PrimaryActive bg-white'} ${props.className} hover:bg-Primary_Accents_xs transition ease-in-out duration-250 group flex items-center gap-3 p-4 w-full shadow-custom_border cursor-pointer`}>
            <span className='w-[50px] h-[50px] rounded-md overflow-hidden'>
                <img src={props?.productImg} alt='' className='w-full h-full object-cover object-center' />
            </span>
            <div className='flex justify-between gap-4 w-full'>
                <div className={`rounded-md flex flex-col`}>
                    <p className={`${props.darkMode ? 'group-hover:text-white' : 'text-PrimaryActive'} transition ease-in-out duration-250 block mobile:hidden font-semibold text-sm leading-5`}>{props?.name?.length > 25 ? props?.name?.slice(0, 25) + '...' : props?.name}</p>
                    <p className={`${props.darkMode ? 'group-hover:text-white' : 'text-PrimaryActive'} transition ease-in-out duration-250 hidden mobile:block font-semibold text-sm leading-5`}>{props?.name?.length > 12 ? props?.name?.slice(0, 12) + '...' : props?.name}</p>
                    <p className={`${props.darkMode ? 'group-hover:text-white' : 'text-PrimaryActive'} transition ease-in-out duration-250 font-semibold text-xs leading-5`}>{props?.category}</p>

                    <div className='w-fit flex gap-3 mobile:gap-2'>
                        <Button
                            btnType='button'
                            btnStyle={`${props.darkMode ? 'bg-Primary_800' : 'bg-Primary_300'} transition ease-in-out duration-250 w-6 h-6 mobile:w-4 mobile:h-4 rounded-md flex justify-center items-center cursor-pointer`}
                            btnImg={minusIcon}
                            btnImgStyle='w-3 h-3'
                            onClick={() => {
                                if (props.quantity <= 1) {
                                    props.removeFromCart(props.id);
                                } else {
                                    props.removeFromQuantity(props.id);
                                }
                            }}
                        />
                        <span className={`${props.darkMode ? 'bg-NoColor hover:bg-Primary_Accents_sm' : 'bg-[#f8fafc]'} transition ease-in-out duration-250 w-6 h-6 mobile:w-4 mobile:h-4 rounded-md flex justify-center items-center font-semibold text-xl mobile:text-lg text-Primary`}>
                            {props.quantity}
                        </span>
                        <Button
                            btnType='button'
                            btnStyle={`${props.darkMode ? 'bg-Primary_800' : 'bg-Primary_300'} hover:Primary_Accents_xs transition ease-in-out duration-250 w-6 h-6 mobile:w-4 mobile:h-4 rounded-md flex justify-center items-center cursor-pointer`}
                            btnImg={addIcon}
                            btnImgStyle='w-3 h-3'
                            onClick={() => {
                                if (props.quantity === props?.quantity_in_stock) {
                                    Alert('warning', 'Maximum quantity reached');
                                    return;
                                } else {
                                    props.addToQuantity(props.id);
                                }
                            }}
                        />
                    </div>
                </div>

                <div className='flex flex-col justify-end items-end gap-2'>

                    <span className='font-normal text-right text-base mobile:text-sm text-Primary'>
                        {props.currency + " " + (Intl.NumberFormat().format(props.price))}
                    </span>

                    <span className='w-fit flex' onClick={() => props.removeFromCart(props?.id)}>
                        <img src={removeIcon} alt='remove_icon' className='w-4 h-4' />
                    </span>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    darkMode: state.app.darkMode
})

const mapDispatchToProps = (dispatch: any) => ({
    removeFromCart: (id: any) => dispatch(removeFromCart(id)),
    addToQuantity: (id: any) => dispatch(addToQuantity(id)),
    removeFromQuantity: (id: any) => dispatch(removeFromQuantity(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);