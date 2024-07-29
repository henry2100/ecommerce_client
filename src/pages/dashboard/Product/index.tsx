import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import Marquee from "react-marquee-slider";

import BlurredCard from 'components/molecules/BlurryCard';
import { getRandomObjects } from 'utils';
import ErrorEmptyState from 'components/atoms/ErrorEmptyState';
import { addToCart, removeFromCart } from '../../../redux/app/app.action';
import Spinner from 'components/atoms/Spinner';
import RelatedProductItem from 'components/molecules/RelatedProductItem';

// interface ProductProps {
//     authData: any;
//     addToCart: any;
//     darkMode: boolean;
//     removeFromCart: any;
// }

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

// const Product: React.FC<ProductProps> = (props) => {
const Product = (props: any) => {
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

    const navigate = useNavigate();

    const refreshState = () => setRefresh((prevState) => !prevState);

    const calcPrice = product ? product.price * counter : 0;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

    const getProduct = async (productId?: any) => {
        setLoading(true);
        const res = await getRequest(`${BASE_URL}products/product/${productId}`, headers);

        if (res?.status === 200) {
            // Alert('success', res?.data.message, props.darkMode);
            setProduct(res?.data.data);
            setLoading(false);

        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct(id);
        getAllProducts();
    }, [refresh]);

    useEffect(() => refreshState(), [id]);

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

        props.addToCart(productItem);
    };

    console.log("CartData:", props.shopping_cart);

    const handleImgSelect = (item: string) => {
        setSelectedImg(item);
    };

    const filterRelatedProducts = allProducts.filter(item => item.category === product?.category);
    // const filterRelatedProducts = allProducts.map((item) => {
    //     if(item.category === product?.category)Object.keys(item.tags).some(key => product?.tags.hasOwnProperty(key));
    // });

    const filteredResult = filterRelatedProducts.filter(itemData => itemData._id !== product?._id);

    console.log("results:", {
        filterRelatedProducts: filterRelatedProducts,
        filteredResult: filteredResult
    });

    const randomRelatedProducts = getRandomObjects(filteredResult, 5);

    return (
        <div className={`relative desktop:px-32 desktop:py-10 px-16 py-8 mobile:p-3 min-h-[90vh] flex ${loading ? 'justify-center items-center' : 'flex-col justify-between gap-12'}`}>
            {loading
                ? <Spinner
                    text='Fetching Products...'
                    textStyle='text-lg font-semibold text-Primary'
                    borderStyle='border-4 border-Primary border-r-transparent w-8 h-8'
                />

                : <>
                    <div className='flex justify-end'>
                        <Button
                            btnType='button'
                            btnText='Refresh'
                            btnImg={refreshIcon}
                            btnImgStyle={`w-4 h-4 ${loading && 'animate-fullRoll'}`}
                            btnStyle={`${props.darkMode ? 'bg-Primary_600 text-Primary hover:bg-Primary_700' : 'bg-SecondaryAccent5 text-Primary'} relative right-0 top-0 z-[22] mb-0 text-sm !rounded-lg truncate flex gap-4 justify-center items-center px-5 py-2 font-normal text-base leading-7 rounded-lg truncate`}
                            onClick={refreshState}
                        />
                    </div>

                    <div className='flex mobile:flex-col gap-8 mobile:gap-16 mb-16'>
                        <div className='flex flex-row-reverse tablet:flex-col gap-4 w-full'>
                            <div className='rounded-lg w-full h-auto min-h-[30vh] mobile:min-h-[15vh] max-h-[60vh] overflow-hidden'>
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
                            <div className={`${product && product.imageUrl.length > 0 && product.imageUrl[0] !== '' ? 'flex' : 'hidden'} flex-col tablet:flex-row gap-1 mobile:justify-center items-center`}>
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
                                        btnStyle={`${props.darkMode ? 'bg-Primary_800 hover:bg-Primary_700' : 'bg-Primary hover:bg-Primary_300'} transition ease-in-out duration-250 w-8 h-8 mobile:w-5 mobile:h-5 rounded-md flex justify-center items-center cursor-pointer`}
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
                                    <span className={`${props.darkMode ? 'bg-NoColor hover:bg-Primary_Accents_sm' : 'bg-[#f8fafc]'} transition ease-in-out duration-250 w-8 h-8 mobile:w-5 mobile:h-5 rounded-md flex justify-center items-center font-semibold text-xl mobile:text-lg text-Primary`}>
                                        {counter}
                                    </span>
                                    <Button
                                        btnType='button'
                                        btnStyle={`${props.darkMode ? 'bg-Primary_800 hover:bg-Primary_700' : 'bg-Primary hover:bg-Primary_300'} transition ease-in-out duration-250 w-8 h-8 mobile:w-5 mobile:h-5 rounded-md flex justify-center items-center cursor-pointer`}
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
                                        {`${product?.currency} ${product?.price}`}
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
                                            product?.tags.map((tag, i) => (
                                                <span key={i} className='group border-[.5px] px-3 py-1 whitespace-nowrap text-ellipsis text-sm mobile:xs rounded-md flex flex-shrink-0 gap-2 justify-between items-center transition ease-in-out duration-250'>
                                                    {tag}
                                                </span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='flex mobile:flex-col gap-5'>
                                <Button
                                    btnType='button'
                                    btnText='Add To Cart'
                                    btnStyle={`${props.darkMode ? 'bg-Primary_800 text-Primary hover:bg-Primary_700' : 'bg-SecondaryAccent5 text-Primary'} w-3/4 mobile:w-full relative right-0 top-0 z-[22] mb-0 text-sm !rounded-lg truncate flex gap-4 justify-center items-center px-5 py-2 font-normal text-base leading-7 rounded-lg truncate transition ease-in-out duration-250`}
                                    onClick={handleAddToCart}
                                />
                                <Button
                                    btnType='button'
                                    btnText='view Cart'
                                    btnStyle={`${props.darkMode ? 'bg-Primary_600 hover:bg-PrimaryActive' : 'bg-Primary hover:bg-Primary_300'} w-1/4 mobile:w-full relative right-0 top-0 z-[22] mb-0 text-sm !rounded-lg truncate flex gap-4 justify-center items-center px-5 py-2 font-normal text-base leading-7 rounded-lg truncate text-white transition ease-in-out duration-250`}
                                    onClick={() => navigate('/dashboard/cart')}
                                />
                            </div>
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

                            : <div className={`${randomRelatedProducts.length > 3 ? 'justify-center' : randomRelatedProducts.length === 1 ? 'justify-start' : 'justify-evenly'} min-h-[20vh] flex mobile:flex-col items-center gap-10`}>
                                {randomRelatedProducts.length > 3
                                    ? <Marquee
                                        velocity={25}
                                        direction={'rtl'}
                                        scatterRandomly={false}
                                        resetAfterTries={0}
                                        onInit={() => { }}
                                        onFinish={() => { }}>
                                        {randomRelatedProducts.map(item => (
                                            <RelatedProductItem {...item} getProduct={getProduct} />
                                        ))}
                                    </Marquee>

                                    : randomRelatedProducts.map(item => (
                                        <RelatedProductItem {...item} getProduct={getProduct} />
                                    ))
                                }
                            </div>
                        }
                    </div>
                </>
            }
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    authData: state.auth.user_authData,
    darkMode: state.app.darkMode,
    shopping_cart: state.app?.shopping_cart || []
});

const mapDispatchToProps = (dispatch: any) => ({
    addToCart: (data: any[]) => dispatch(addToCart(data)),
    removeFromCart: (id: any) => dispatch(removeFromCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);