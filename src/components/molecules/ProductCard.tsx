import React, { useRef, useState } from 'react';
import addIcon from '../../assets/svg/math/math_add.svg';
import minusIcon from '../../assets/svg/math/math_minus.svg';
import product_placeholder from '../../assets/svg/product_placeholder.png';
import Alert from 'components/atoms/Alert';
import Button from 'components/atoms/Button';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { storeSearchQuery } from '../../redux/app/app.action';

const ProductCard = (props) => {
    const navigate = useNavigate();

    const disableBtn = props.quantity === 0;

    const handleRedirect = () => {
        navigate(`/dashboard/product/${props.productId}`);
        props.storeSearchQuery('');
    }

    return (
        <div className={`${props.darkMode ? 'bg-Primary_700' : 'shadow-[0_8px_30px_rgb(0,0,0,0.12)]'} relative flex flex-grow-0 flex-col gap-5 mobile:gap-2 p-5 mobile:p-3 mx-auto rounded-lg w-fit h-fit`}>
            {props.quantity === 0 &&
                <div className='absolute w-24 h-24 mobile:w-16 mobile:h-16 flex justify-center items-center bg-DangerAccent3 p-2 right-3 top-3 mobile:right-1 mobile:top-1 rounded-full'>
                    <p className='font-normal text-base mobile:text-[10px] text-wrap text-center text-SecondaryAccent'>Out of stock</p>
                </div>
            }
            <div className='border overflow-hidden desktop:min-w-[200px] desktop:max-w-[298px] desktop:h-[300px] w-full h-auto mobile:w-full mobile:h-[120px] flex-shrink-0 rounded-lg bg-BackDrop_d_xs'>
                <img src={props.productImg[0] !== '' ? props.productImg[props.productImg.length - 1] : product_placeholder} alt="product_placeholder" className='w-full h-full object-cover' />
            </div>
            <div className='w-full h-full flex flex-col gap-5 mobile:gap-2'>
                <div className='flex flex-col gap-4 mobile:gap-2'>
                    <div className={`${props.darkMode ? 'bg-Primary_800' : 'bg-[#f8fafc]'} flex flex-col rounded-lg p-4 mobile:p-2`}>
                        <p className='font-bold text-SecondaryAccent text-xl mobile:text-lg'>{props.name}</p>
                        <p className='font-light text-base mobile:text-xs text-SecondaryAccent6'>{props.desc.length > 30 ? props.desc.slice(0, 30) + "..." : props.desc}</p>
                    </div>
                    <div className='flex justify-end gap-2'>
                        <p className='font-bold text-right text-xl mobile:text-base text-Primary'>
                            {props.currency ? props.currency : 'NaN'}
                        </p>
                        <p className='font-bold text-right text-xl mobile:text-base text-Primary'>
                            {Intl.NumberFormat().format(props.price)}
                        </p>
                    </div>
                </div>
                <Button
                    btnType='button'
                    btnText='Open'
                    btnStyle={`px-5 py-2 w-full font-bold text-lg mobile:text-sm text-white bg-Primary ${!disableBtn && 'hover:bg-Primary_Accents_3xl'}`}
                    disabled={disableBtn}
                    disabledClass={`${disableBtn && 'cursor-not-allowed bg-PrimaryDisabled'}`}
                    onClick={handleRedirect}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    darkMode: state.app.darkMode,
})

const mapDispatchToProps = (dispatch: any) => ({
    storeSearchQuery: (data: any) => dispatch(storeSearchQuery(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);