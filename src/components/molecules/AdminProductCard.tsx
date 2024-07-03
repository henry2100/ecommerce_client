import React, { useRef, useState } from 'react';
import addIcon from '../../assets/svg/math/math_add.svg';
import minusIcon from '../../assets/svg/math/math_minus.svg';
import product_placeholder from '../../assets/svg/product_placeholder.png';
import Alert from 'components/atoms/Alert';
import Button from 'components/atoms/Button';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';

const AdminProductCard = (props) => {
    const [counter, setCounter] = useState(0);
    const [showDetails, setShowDetails] = useState(false);

    const navigate = useNavigate();

    const calcPrice = props.price * counter;

    const disableBtn = props.quantity === 0;

    const handleRedirect = () => {
        navigate(`/dashboard/product/${props.productId}`);
    }
    
    return (
        <div className={`group border relative overflow-hidden w-[250px] h-[250px] rounded-md transition ease-in duration-500`}>
            {props.quantity === 0 &&
                <div className='absolute w-24 h-24 mobile:w-16 mobile:h-16 flex justify-center items-center bg-DangerAccent3 p-2 right-3 top-3 mobile:right-1 mobile:top-1 rounded-full'>
                    <p className='font-normal text-base mobile:text-[10px] text-wrap text-center text-SecondaryAccent'>Out of stock</p>
                </div>
            }

            <img src={product_placeholder} alt="product_placeholder" className='absolute transition ease-in-out duration-500 w-full h-full object-cover' />

            <div className='hidden group-hover:flex transition ease-in-out duration-500 animate-fade_in absolute z-20 w-full h-full bg-Primary_Accents_md'></div>
            <div className={`hidden group-hover:flex flex-col justify-between items-end transition ease-in-out duration-500 absolute z-20 gap-4 mobile:gap-2 w-full h-full bg-[#00000000] rounded-lg p-4 mobile:p-2 animate-fade_in`}>
                <div className=''>
                    <p className='font-bold text-SecondaryAccent text-xl mobile:text-lg'>{props.name}</p>
                    <p className='font-light text-base mobile:text-xs text-SecondaryAccent6'>{props.desc.length > 50 ? props.desc.slice(1, 50) + "..." : props.desc}</p>

                    <div className='flex flex-col gap-4 w-3/5 mt-5'>
                        <span className='flex justify-between items-center gap-3 leading-4'>
                            <p className='font-normal text-sm mobile:text-xs text-SecondaryAccent6'>In Stock</p>
                            <p className='font-semibold text-base mobile:text-sm text-Primary_600'>{props.quantity}</p>
                        </span>

                        <span className='flex justify-between items-center gap-3 leading-4'>
                            <p className='font-normal text-sm mobile:text-xs text-SecondaryAccent6'>Price</p>
                            <p className='font-semibold text-base mobile:text-sm text-Primary_600'>{props.price}</p>
                        </span>
                    </div>
                </div>

                <Button
                    btnType='button'
                    btnText='View'
                    btnStyle='px-5 py-2 w-fit font-bold text-lg mobile:text-sm text-white bg-Primary'
                    onClick={()=>{}}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    darkMode: state.app.darkMode
})

export default connect(mapStateToProps, null)(AdminProductCard);


{/* <Button
                    btnType='button'
                    btnText='Open'
                    // btnStyle={`px-5 py-2 w-full font-bold text-lg mobile:text-sm text-white bg-Primary ${!disableBtn && 'hover:bg-Primary_Accents_3xl'}`}
                    btnStyle={``}
                    disabled={disableBtn}
                    disabledClass={`${disableBtn && 'cursor-not-allowed bg-PrimaryDisabled'}`}
                    onClick={handleRedirect}
                /> */}
