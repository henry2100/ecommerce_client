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
import { ToTitleCase } from 'components/atoms/CaseManager';
import Carousel from 'components/atoms/carousel';

import imgOne from '../../../assets/images/img-11.avif'
import imgTwo from '../../../assets/images/img-12.avif'
import imgThree from '../../../assets/images/img-13.avif';
import imgFour from '../../../assets/images/img-1.jpg';
import imgFive from '../../../assets/images/img-2.jpg';
import imgSix from '../../../assets/images/img-3.jpg';
import imgSeven from '../../../assets/images/img-4.jpg';
import imgEight from '../../../assets/images/img-5.jpg';
import imgNine from '../../../assets/images/img-6.png';
import BlurredCard from 'components/molecules/BlurryCard';
import { getRandomObjects } from 'utils';
import ErrorEmptyState from 'components/atoms/ErrorEmptyState';
import { addToCart, removeFromCart } from '../../../redux/app/app.action';

interface ProductProps {
    authData: any;
    addToCart: any;
    removeFromCart: any;
}

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    currency: string;
    tags: string[];
    imageUrl: string[];
    updatedAt: string;
}

const Product: React.FC<ProductProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const [loadingRelated, setLoadingRelated] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [allProducts, setAllProducts] = useState<any>([]);
    const [counter, setCounter] = useState(1);
    const [selectedImg, setSelectedImg] = useState<string>('');
    const [currentItem, setCurrentItem] = useState(1);
    const [carouselStyle, setCarouselStyle] = useState('');
    const { id } = useParams<{ id: string }>();

    const refreshState = () => setRefresh((prevState) => !prevState);

    const calcPrice = product ? product.price * counter : 0;

    const headers = {
        "Content-Type": "application/json",
    }

    const getAllProducts = async () => {
        setLoadingRelated(true);
        const res = await getRequest(`${BASE_URL}products`, headers);

        if (res?.status === 200) {
            setLoadingRelated(false);
            setAllProducts(res?.data.data);
        } else {
            setLoadingRelated(false);
        }
    }

    const getProduct = async () => {
        setLoading(true);
        const res = await getRequest(`${BASE_URL}products/product/${id}`, headers);

        if (res?.status === 200) {
            Alert('success', res?.data.message);
            setProduct(res?.data.data);
            setLoading(false);

        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
        getAllProducts();
    }, [refresh]);

    const handleAddToCart = () => {
        const productItem = {
            id: product?._id,
            name: product?.name,
            category: product?.category,
            currency: product?.currency,
            tags: product?.tags,
            productImg: product?.imageUrl[product?.imageUrl.length - 1],
            price: calcPrice,
            quantity: counter,
            init_price: product?.price,
            quantity_in_stock: product?.quantity
        }

        console.log("ProductItem:", productItem);
        props.addToCart(productItem);
    };

    const handleImgSelect = (item: string) => {
        setSelectedImg(item);
    };

    const filterRelatedProducts = allProducts.filter(item => item.category === product?.category || Object.keys(item.tags).some(key => product?.tags.hasOwnProperty(key)));

    const filterResult = filterRelatedProducts.filter(itemData => itemData.id !== product?._id);

    const randomRelatedProducts = getRandomObjects(filterResult, 3);

    const content = randomRelatedProducts.map((item, i) => (
        currentItem === i + 1 &&
        <div key={i} className={`${carouselStyle} transition ease-in-out duration-500`}>
            <div className={`absolute z-[5] w-full h-full ${carouselStyle} transition ease-in-out duration-500`}>
                <img src={item.imageUrl[item.imageUrl.length - 1]} alt="carousel_img" className="w-full h-full object-cover object-fit object-center" />
            </div>
            <BlurredCard
                style={`${carouselStyle} transition ease-in-out duration-500 absolute z-[7] w-2/5 h-[50%] mobile:w-[85%] mobile:h-[85%] left-0 right-0 my-[12rem] mobile:my-10 mx-auto text-SecondaryAccent3 p-[4rem] mobile:p-8 mobile:justify-evenly hover:bg-BackDrop_d_lg bg-BackDrop_d_md`}
                titleText={item.name}
                descText={item.description.length > 50 ? item.description.slice(0, 50) + '...' : item.description}
                smallTextTop={item.currency + ' ' + item.price}
                btnElement={true}
                btnType={'button'}
                btnText={'View'}
                btnImg={item.imageUrl[0]}
                btnImgStyle={'w-8 h-8 object-cover object-fit object-center rounded-full'}
                btnStyle={'border border-white hover:bg-white hover:text-DarkBg3 font-semibold text-lg rounded-md bottom-5 left-0 right-0 w-fit mx-auto px-7 py-3 uppercase cursor-pointer'}
                onClick={() => { }}
            />
        </div>
    ))

    return (
        <div className='desktop:px-52 desktop:py-10 px-20 py-5 mobile:p-5 flex flex-col gap-5 min-h-screen'>
            <div className='flex justify-end'>
                <Button
                    btnType='button'
                    btnText='Refresh'
                    btnImg={refreshIcon}
                    btnImgStyle={`w-4 h-4 ${loading && 'animate-fullRoll'}`}
                    btnStyle='bg-SecondaryAccent5 text-Primary text-sm !rounded-lg truncate flex gap-4 justify-center items-center px-5 py-2 font-normal text-base leading-7 rounded-lg truncate'
                    onClick={refreshState}
                />
            </div>

            <div className='flex mobile:flex-col gap-8 mobile:gap-16 mb-24'>
                <div className='flex flex-row-reverse mobile:flex-col gap-4 w-full'>
                    <div className='rounded-lg border w-full h-auto min-h-[30vh] mobile:min-h-[15vh] max-h-[60vh] overflow-hidden'>
                        <img
                            src={product && product.imageUrl.length > 0 && product.imageUrl[0] !== ''
                                ? selectedImg.length === 0
                                    ? product.imageUrl[product.imageUrl.length - 1]
                                    : selectedImg
                                : product_placeholder
                            }
                            alt='product_placeholder'
                            className='w-full h-full object-center object-cover scale-105'
                        />
                    </div>
                    <div className={`${product && product.imageUrl.length > 0 && product.imageUrl[0] !== '' ? 'flex' : 'hidden'} flex-col mobile:flex-row gap-1 mobile:justify-center items-center`}>
                        {product?.imageUrl?.map((item, i) => (
                            <div
                                key={i}
                                onClick={() => handleImgSelect(item)}
                                className={`relative w-[50px] h-[50px] ${item === selectedImg && 'border-Primary'} rounded-md cursor-pointer`}
                            >
                                <img
                                    src={item}
                                    alt={`${i}`}
                                    className='w-full h-full object-center object-cover rounded-[4px]'
                                />
                                {item === selectedImg && (
                                    <>
                                        <img
                                            src={arrow_right}
                                            alt='pointer'
                                            className='block mobile:hidden w-5 h-5 object-center object-cover absolute -right-[13px] top-4'
                                        />
                                        <img
                                            src={arrow_up}
                                            alt='pointer'
                                            className='hidden mobile:block w-5 h-5 object-center object-cover absolute left-4 -top-[13px]'
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
                        {/* {Intl.NumberFormat().format(props.price)} */}
                        <div className='flex flex-col justify-end gap-1'>
                            <p className='font-bold text-right text-xl mobile:text-base text-Primary'>
                                {'NGN ' +  product?.price}
                            </p>
                            <p className='font-normal text-right text-base mobile:text-sm text-GrayCustom'>
                                {calcPrice.toFixed(2)}
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='flex justify-between items-center gap-5 font-normal pb-1'>
                            <p className='text-xs tablet:text-[10px] text-GrayCustom'>Category</p>
                            <p className='text-sm tablet:text-xs text-PrimaryActive'>{product?.category && ToTitleCase(product?.category)}</p>
                        </span>
                        <div className='flex justify-between items-center gap-5 font-normal pb-1'>
                            <p className='text-xs tablet:text-[10px] text-GrayCustom'>Tags</p>
                            <div className='flex gap-3 items-center text-PrimaryActive overflow-x-scroll custom_container'>
                                {product?.tags &&
                                    product?.tags.map(tag => (
                                        <span className='group border px-3 py-1 whitespace-nowrap text-ellipsis text-sm mobile:xs rounded-md flex flex-shrink-0 gap-2 justify-between items-center transition ease-in-out duration-500'>
                                            {tag}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <Button
                        btnType='button'
                        btnText='Add To Cart'
                        btnStyle={`px-5 py-2 w-full font-bold text-lg mobile:text-sm text-white bg-Primary hover:bg-Primary_Accents_3xl`}
                        onClick={handleAddToCart}
                    />
                </div>
            </div>

            <div className='flex flex-col gap-5'>
                <span className='font-semibold text-lg text-Primary'>
                    Related Products
                </span>

                {product?.category === ''
                    ? <div className='w-full h-full flex justify-center items-center mobile:p-24'>
                        <ErrorEmptyState img={true} style='!bg-NoColor' />
                    </div>

                    : <Carousel
                        data={randomRelatedProducts}
                        containerStyle="w-full h-[60vh] rounded-xl overflow-hidden"
                        currentItem={currentItem}
                        setCurrentItem={setCurrentItem}
                        carouselStyle={carouselStyle}
                        setCarouselStyle={setCarouselStyle}
                        component={content}
                        autoSlide={true}
                        // slideDirection='forward'
                        // slideDirection='backward'
                        slideDuration={3000}
                    />
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    authData: state.auth.user_authData,
});

const mapDispatchToProps = (dispatch: any) => ({
    addToCart: (data: any) => dispatch(addToCart(data)),
    removeFromCart: (id: any) => dispatch(removeFromCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);