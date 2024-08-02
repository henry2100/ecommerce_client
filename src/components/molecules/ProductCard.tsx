import React from 'react';
import addIcon from '../../assets/svg/math/math_add.svg';
import minusIcon from '../../assets/svg/math/math_minus.svg';
import product_placeholder from '../../assets/svg/product_placeholder.png';
import Alert from 'components/atoms/Alert';
import Button from 'components/atoms/Button';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { addToCart, storeSearchQuery } from '../../redux/app/app.action';

const ProductCard = (props) => {
    const navigate = useNavigate();

    const disableBtn = props.quantity === 0;

    const handleRedirect = () => {
        navigate(`/dashboard/product/${props.productId}`);
        props.storeSearchQuery('');
    };

    const handleAddToCart = () => {
        const productItem = {
            id: props?.productId,
            name: props?.name,
            category: props?.category,
            currency: props?.currency,
            tags: props?.tags,
            productImg: props.productImg[0] !== '' ? props.productImg[props.productImg.length - 1] : product_placeholder,
            price: props?.price,
            quantity: 1,
            init_price: props?.price,
            quantity_in_stock: props?.quantity,
        };

        props.addToCart(productItem);
    };

    return (
        <div className={`${props.darkMode ? 'bg-Primary_700' : 'shadow-[0_8px_30px_rgb(0,0,0,0.12)]'} relative flex flex-col gap-5 mobile:gap-2 p-5 mobile:p-1 mx-auto rounded-lg w-full h-fit min-w-[182px] max-w-lg`}>
            {props.quantity === 0 &&
                <div className='absolute w-24 h-24 flex justify-center items-center bg-DangerAccent3 p-2 right-3 top-3 rounded-full'>
                    <p className='font-normal text-base text-wrap text-center text-SecondaryAccent'>Out of stock</p>
                </div>
            }
            <div className='overflow-hidden w-full h-64 rounded-lg bg-BackDrop_d_xs'>
                <img src={props.productImg[0] !== '' ? props.productImg[props.productImg.length - 1] : product_placeholder} alt="product_placeholder" className='w-full h-full object-cover' />
            </div>
            <div className='w-full flex flex-col gap-5 mobile:gap-2'>
                <div className='flex flex-col gap-4 mobile:gap-2'>
                    <div className={`${props.darkMode ? 'bg-Primary_800' : 'bg-[#f8fafc]'} flex flex-col rounded-lg p-4`}>
                        <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} font-bold text-lg`}>{props.name}</p>
                        <p className={`${props.darkMode ? 'text-Primary_200' : 'text-SecondaryAccent6'} font-light text-base`}>{props.category}</p>
                    </div>
                    <div className='flex justify-between items-center gap-2'>
                        <Button
                            btnType='button'
                            btnText='Add To Cart'
                            btnStyle={`${props.darkMode ? 'bg-Primary_800 text-Primary hover:bg-BackDrop_d_xs' : 'bg-SecondaryAccent5 text-Primary'} w-fit relative right-0 top-0 z-[22] mb-0 text-sm !rounded-lg truncate flex gap-4 justify-center items-center px-5 py-2 font-normal text-base leading-7 truncate transition ease-in-out duration-250`}
                            onClick={handleAddToCart}
                        />
                        <div className='flex justify-end gap-1'>
                            <p className='font-bold text-right text-xl mobile:text-base text-Primary'>
                                {props.currency ? props.currency : 'NaN'}
                            </p>
                            <p className='font-bold text-right text-xl mobile:text-base text-Primary'>
                                {Intl.NumberFormat().format(props.price)}
                            </p>
                        </div>
                    </div>
                </div>
                <Button
                    btnType='button'
                    btnText='View'
                    btnStyle={`${props.darkMode ? 'bg-Primary_600 hover:bg-Primary_Accents_md' : 'bg-Primary hover:bg-Primary_300'} px-5 py-2 w-full font-bold text-lg text-white ${!disableBtn && 'hover:bg-Primary_Accents_3xl'}`}
                    disabled={disableBtn}
                    disabledClass={`${disableBtn && 'cursor-not-allowed bg-PrimaryDisabled'}`}
                    onClick={handleRedirect}
                />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    darkMode: state.app.darkMode,
});

const mapDispatchToProps = (dispatch) => ({
    addToCart: (data) => dispatch(addToCart(data)),
    storeSearchQuery: (data) => dispatch(storeSearchQuery(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
