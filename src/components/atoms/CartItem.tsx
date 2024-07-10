import React, { useEffect, useState } from 'react'
import Button from './Button';
import addIcon from '../../assets/svg/math/math_add.svg';
import minusIcon from '../../assets/svg/math/math_minus.svg';
import Alert from './Alert';
import { removeFromCart } from '../../redux/app/app.action';
import { connect } from 'react-redux';

const CartItem = (props: any) => {
    const [counter, setCounter] = useState(props.quantity);

    const calcPrice = props ? props.init_price * counter : 0;

    useEffect(() => {
        if (counter < 1) {
            props.removeFromCart(props.id);
        }
    }, [counter]);

    return (
        <div className='group flex items-center gap-3 px-2 py-1 rounded-md w-full shadow-custom_border bg-Primary_Accents_md hover:bg-PrimaryDisabled cursor-pointer'>
            <span className='w-[50px] h-[50px] rounded-md overflow-hidden'>
                <img src={props.productImg} alt='' className='w-full h-full object-cover object-center' />
            </span>
            <div className='flex justify-between gap-4 w-full'>
                <span className='rounded-md flex flex-col'>
                    <p className='block mobile:hidden font-semibold text-sm leading-5 text-PrimaryActive'>{props.name.length > 25 ? props.name.slice(0, 25) + '...' : props.name}</p>
                    <p className='hidden mobile:block font-semibold text-sm leading-5 text-PrimaryActive'>{props.name.length > 12 ? props.name.slice(0, 12) + '...' : props.name}</p>
                    <p className='font-semibold text-xs leading-5 text-PrimaryActive'>{props.category}</p>
                    {/* <span className='flex w-[98%] overflow-x-scroll custom_container justify-start items-center gap-1'>
                        {props.tags.map((tag, i) => (
                            <p key={i} className='font-normal text-xs leading-5 text-Primary'>{tag}</p>
                        ))}
                    </span> */}
                </span>

                <div className='flex flex-col justify-end items-end gap-2'>
                    <span className='w-fit flex gap-3 mobile:gap-2'>
                        <Button
                            btnType='button'
                            btnStyle='w-5 h-5 rounded-[3px] bg-Primary flex justify-center items-center cursor-pointer'
                            btnImg={minusIcon}
                            btnImgStyle='w-[10px] h-[10px]'
                            onClick={() => {
                                setCounter(counter - 1);
                            }}
                        />
                        <span className='w-5 h-5 rounded-[3px] bg-[#f8fafc] flex justify-center items-center font-normal text-base mobile:text-sm text-Primary'>
                            {counter}
                        </span>
                        <Button
                            btnType='button'
                            btnStyle='w-5 h-5 rounded-[3px] bg-Primary flex justify-center items-center cursor-pointer'
                            btnImg={addIcon}
                            btnImgStyle='w-[10px] h-[10px]'
                            onClick={() => {
                                if (counter === props?.quantity_in_stock) {
                                    Alert('warning', 'Maximum quantity reached');
                                } else {
                                    setCounter(counter + 1);
                                }
                            }}
                        />
                    </span>
                    <span className='font-normal text-right text-base mobile:text-sm text-Primary'>
                        {props.currency + ' ' + Intl.NumberFormat().format(calcPrice)}
                    </span>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch: any) => ({
    removeFromCart: (id: any) => dispatch(removeFromCart(id)),
});

export default connect(null, mapDispatchToProps)(CartItem);