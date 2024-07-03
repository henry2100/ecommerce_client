import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL, getRequest } from 'services/http';

import arrow_up from '../../../assets/svg/arrows/arrow_du.svg';
import arrow_right from '../../../assets/svg/arrows/arrow_dr.svg';
import product_placeholder from '../../../assets/svg/product_placeholder.png';
import refreshIcon from '../../../assets/svg/refresh.svg';
import addIcon from '../../../assets/svg/math/math_add.svg';
import minusIcon from '../../../assets/svg/math/math_minus.svg';
import Alert from 'components/atoms/Alert';
import Button from 'components/atoms/Button';
import moment from 'moment';
import { connect } from 'react-redux';

interface ProductProps {
    authData: any;
}

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string[];
    updatedAt: string;
}

const Product: React.FC<ProductProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [product, setProduct] = useState<any>([]);
    const [counter, setCounter] = useState(1);
    const [selectedImg, setSelectedImg] = useState<string>('');
    const { id } = useParams<{ id: string }>();

    const refreshState = () => setRefresh((prevState) => !prevState);

    const calcPrice = product ? product.price * counter : 0;

    const getProduct = async () => {
        setLoading(true);
        try {
            const res = await getRequest(`${BASE_URL}products/product/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    // "Authorization": `Bearer ${}`
                },
            });

            console.log('Product_res:', res);

            if (res?.status === 200) {
                Alert('success', res?.data.message);
                setProduct(res?.data.data);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, [refresh]);

    const handleAddToCart = () => { };

    const handleImgSelect = (item: string) => {
        setSelectedImg(item);
    };

    // console.log('selectedImg:', selectedImg);
    console.log('product:', product);

    return (
        <div className='desktop:px-52 desktop:py-10 px-20 py-5 mobile:p-5 flex flex-col gap-5 min-h-screen'>
            <div className='flex justify-end'>
                <Button
                    btnType='button'
                    btnText='Refresh'
                    btnImg={refreshIcon}
                    btnImgStyle={`w-4 h-4 ${loading && 'animate-fullRoll'}`}
                    btnStyle='bg-SecondaryAccent5 text-DarkBg3 text-sm !rounded-lg truncate flex gap-4 justify-center items-center px-5 py-2 font-normal text-base leading-7 rounded-lg truncate'
                    onClick={refreshState}
                />
            </div>
            <div className='border border-rose-500 flex mobile:flex-col gap-8 mobile:gap-16'>
                <div className='flex flex-row-reverse mobile:flex-col gap-4 w-full'>
                    <div className='rounded-lg border w-full h-auto min-h-[30vh] mobile:min-h-[15vh] max-h-[60vh] overflow-hidden'>
                        <img
                            src={product?.imageUrl[0] !== ''
                                ? selectedImg.length === 0
                                    ? product?.imageUrl[product?.imageUrl.length - 1]
                                    : selectedImg
                                : product_placeholder
                            }
                            alt='product_placeholder'
                            className='w-full h-full object-center object-cover scale-105'
                        />
                    </div>
                    <div className={`${product?.imageUrl[0] !== '' ? 'flex' : 'hidden'} flex-col mobile:flex-row gap-1 mobile:justify-center items-center`}>
                        {product?.imageUrl?.map((item, i) => (
                            <div
                                key={i}
                                onClick={() => handleImgSelect(item)}
                                className={`relative w-[50px] h-[50px] ${item === selectedImg && 'border-2 border-black'} rounded-md cursor-pointer`}
                            >
                                <img
                                    src={item}
                                    alt={`${i}`}
                                    className='w-full h-full object-center object-cover rounded-sm'
                                />
                                {item === selectedImg && (
                                    <>
                                        <img
                                            src={arrow_right}
                                            alt='pointer'
                                            className='block mobile:hidden w-4 h-4 object-center object-cover absolute -right-3 top-4'
                                        />
                                        <img
                                            src={arrow_up}
                                            alt='pointer'
                                            className='hidden mobile:block w-4 h-4 object-center object-cover absolute left-4 -top-3'
                                        />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full flex flex-col justify-between gap-6'>
                    <div className='flex flex-col gap-5'>
                        <span className='flex flex-col gap-2'>
                            <p className='font-bold text-4xl mobile:text-2xl text-SecondaryAccent'>{product?.name}</p>
                            <p className='font-normal text-sm mobile:xs text-SecondaryAccent6'>
                                {product ? moment(product.updatedAt).format('MMM DD, YYYY - LTS') : ''}
                            </p>
                        </span>
                        <span className='font-normal text-base mobile:sm text-GrayCustom text-justify break-all'>
                            <p className='text-wrap'>{product?.description}</p>
                        </span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='w-fit flex gap-3 mobile:gap-2'>
                            <Button
                                btnType='button'
                                btnStyle='w-8 h-8 mobile:w-5 mobile:h-5 rounded-md bg-Primary flex justify-center items-center cursor-pointer'
                                btnImg={minusIcon}
                                btnImgStyle='w-3 h-3'
                                onClick={() => {
                                    if (counter <= 1) {
                                        setCounter(1);
                                    } else {
                                        setCounter(counter - 1);
                                    }
                                }}
                            />
                            <span className='w-8 h-8 mobile:w-5 mobile:h-5 rounded-md bg-[#f8fafc] flex justify-center items-center font-semibold text-xl mobile:text-lg text-Primary'>
                                {counter}
                            </span>
                            <Button
                                btnType='button'
                                btnStyle='w-8 h-8 mobile:w-5 mobile:h-5 rounded-md bg-Primary flex justify-center items-center cursor-pointer'
                                btnImg={addIcon}
                                btnImgStyle='w-3 h-3'
                                onClick={() => {
                                    if (counter === product?.quantity) {
                                        Alert('warning', 'Maximum quantity reached');
                                    } else {
                                        setCounter(counter + 1);
                                    }
                                }}
                            />
                        </div>
                        <div className='flex flex-col justify-end gap-1'>
                            <p className='font-bold text-right text-xl mobile:text-base text-Primary'>
                                {'NGN ' + product?.price}
                            </p>
                            <p className='font-normal text-right text-base mobile:text-sm text-GrayCustom'>
                                {calcPrice.toFixed(2)}
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 border border-Accent_blue p-3'>
                        <span className='border border-Success p-3'>
                            <p>Category</p>
                            {/* <p>{product?.category}</p> */}
                        </span>
                        <span className='border border-Warning p-3'>

                        </span>
                    </div>
                    <Button
                        btnType='button'
                        btnText='Add To Cart'
                        btnStyle={`px-5 py-2 w-full font-bold text-lg mobile:text-sm text-white bg-Primary hover:bg-Primary_Accents_3xl`}
                        onClick={handleAddToCart}
                    />
                </div>
            </div>
            <div className='related_products border border-rose-400 p-5'></div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    authData: state.auth.user_authData,
});

export default connect(mapStateToProps, null)(Product);