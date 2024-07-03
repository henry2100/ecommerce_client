import React, { useState } from 'react'
import imgOne from '../../assets/images/img-11.avif'
import imgTwo from '../../assets/images/img-12.avif'
import imgThree from '../../assets/images/img-13.avif';
import imgFour from '../../assets/images/img-1.jpg';
import imgFive from '../../assets/images/img-2.jpg';
import imgSix from '../../assets/images/img-3.jpg';
import imgSeven from '../../assets/images/img-4.jpg';
import imgEight from '../../assets/images/img-5.jpg';
import imgNine from '../../assets/images/img-6.png';
import Carousel from 'components/atoms/carousel';
import BlurredCard from 'components/molecules/BlurryCard';
import FormInput from 'components/atoms/FormInput';
import userProfile from '../../assets/svg/user-black.svg';

import instagram_g from '../../assets/svg/social/Instagram-grey.svg';
import pintrest_g from '../../assets/svg/social/Pinterest-grey.svg';
import facebook_g from '../../assets/svg/social/Facebook-grey.svg';
import twitter_g from '../../assets/svg/social/Twitter-grey.svg';
import telegram_g from '../../assets/svg/social/Telegram-grey.svg';

import instagram_w from '../../assets/svg/social/Instagram-white.svg';
import pintrest_w from '../../assets/svg/social/Pinterest-white.svg';
import facebook_w from '../../assets/svg/social/Facebook-white.svg';
import twitter_w from '../../assets/svg/social/Twitter-white.svg';
import telegram_w from '../../assets/svg/social/Telegram-white.svg';
import { Link } from 'react-router-dom';
import { ToCamelCase } from 'components/atoms/CaseManager';

const Footer = () => {
    const [currentItem, setCurrentItem] = useState(1);
    const [clientEmail, setClientEmail] = useState('');

    const carouselData = [
        { bgImg: imgOne, title_text: "Title text one", desc_text: "Velit consequat tempor veniam cillum.Est nulla sint eu et amet eiusmod fugiat minim laborum velit dolore.", action: () => { } },
        { bgImg: imgTwo, title_text: "Title text Two", desc_text: "Do enim veniam incididunt enim nulla aliqua anim esse nulla qui.", action: () => { } },
        { bgImg: imgThree, title_text: "Title text Three", desc_text: "Ullamco velit ut culpa ipsum nostrud minim mollit esse deserunt cillum tempor irure et fugiat.", action: () => { } },
        { bgImg: imgFour, title_text: "Title text Four", desc_text: "Velit consequat tempor veniam cillum.Est nulla sint eu et amet eiusmod fugiat minim laborum velit dolore.", action: () => { } },
        { bgImg: imgFive, title_text: "Title text Five", desc_text: "Do enim veniam incididunt enim nulla aliqua anim esse nulla qui.", action: () => { } },
        { bgImg: imgSix, title_text: "Title text Six", desc_text: "Ullamco velit ut culpa ipsum nostrud minim mollit esse deserunt cillum tempor irure et fugiat.", action: () => { } },
        { bgImg: imgSeven, title_text: "Title text Seven", desc_text: "Velit consequat tempor veniam cillum.Est nulla sint eu et amet eiusmod fugiat minim laborum velit dolore.", action: () => { } },
        { bgImg: imgEight, title_text: "Title text Eight", desc_text: "Do enim veniam incididunt enim nulla aliqua anim esse nulla qui.", action: () => { } },
        { bgImg: imgNine, title_text: "Title text Nine", desc_text: "Ullamco velit ut culpa ipsum nostrud minim mollit esse deserunt cillum tempor irure et fugiat.", action: () => { } }
    ]

    const content = carouselData.map((item, i) => (
        currentItem === i + 1 &&
        <div key={i}>
            <div className={`absolute z-[5] w-full h-full animate-fadeIn ease-in-out`}>
                <img src={item.bgImg} alt="carousel_img" className="w-full h-full object-cover object-fit object-center" />
            </div>
            <BlurredCard
                style={'absolute z-[7] w-2/5 h-[50%] mobile:w-[85%] mobile:h-[85%] left-0 right-0 my-[12rem] mobile:my-10 mx-auto text-SecondaryAccent3 p-[4rem] mobile:p-8 mobile:justify-evenly hover:bg-BackDrop_d_lg bg-BackDrop_d_md'}
                titleText={item.title_text}
                descText={item.desc_text}
                smallTextTop={'Some title'}
                btnElement={true}
                btnType={'button'}
                btnText={'Subscribe Now'}
                btnImg={item.bgImg}
                btnImgStyle={'w-8 h-8 object-cover object-fit object-center rounded-full'}
                btnStyle={'border border-white hover:bg-white hover:text-DarkBg3 font-semibold text-lg rounded-md bottom-5 left-0 right-0 w-fit mx-auto px-7 py-3 uppercase'}
                onClick={() => { }}
            />
        </div>
    ))

    const shopLinks = [
        { text: "All Products" },
        { text: "Fresh Flowers" },
        { text: "Dried Flowers" },
        { text: "Live Plants" },
        { text: "Designer Vases" },
        { text: "Aroma Candles" },
        { text: "Freshener Diffuser" }
    ]

    const serviceLinks = [
        { text: "Flower Subcription" },
        { text: "Wedding & Event Decor" }
    ]

    const aboutLinks = [
        { text: "Our Story" },
        { text: "Blog" },
        { text: "Shipping & returns" },
        { text: "Terms & conditions" },
        { text: "Privacy policy" },
    ]

    return (
        <div className='min-h-[60vh] h-fit w-full relative overflow-hidden' id='footer'>
            <Carousel
                data={carouselData}
                containerStyle="w-full h-[60vh]"
                currentItem={currentItem}
                setCurrentItem={setCurrentItem}
                component={content}
                autoSlide={true}
                // slideDirection='backward'
                slideDuration={3000}
            />
            <div className='w-full h-fit bg-BackDrop_d_sm overflow-hidden relative'>
                <div className={`absolute z-[5] w-full h-full animate-fadeIn ease-in-out`}>
                    <img src={imgThree} alt="carousel_img" className="w-full h-full object-cover object-fit object-center " />
                </div>
                <div className={`absolute z-[5] w-full h-full animate-fadeIn ease-in-out bg-BackDrop_d_4xl`}></div>

                <div className='relative z-[8] p-5 w-full h-full flex mobile:flex-col-reverse justify-between gap-5 text-SecondaryAccent3'>
                    <BlurredCard
                        customCard={true}
                        style='w-full overflow-hidden bg-BackDrop_l_xs'
                    >
                        <div className='p-[2rem] w-full h-full flex flex-col gap-8 justify-between'>
                            <span className='flex flex-col gap-4'>
                                <p className='text_header text-xl mobile:text-lg'>Subscription</p>
                                <p className='text-base leading-5 text-left'>
                                    Remember to order beautiful flowers from Kyiv LuxeBouquets Valentines Day, Mothers Day, Christmas... Reminds you 7 days before. No spam or sharing your address
                                </p>
                            </span>
                            <div>
                                <FormInput
                                    type="text"
                                    name="email"
                                    placeholder='Your Email'
                                    onChange={e => setClientEmail(e.target.value)}
                                    value={clientEmail}
                                    inputStyle='w-full justify-between'
                                    inputStyle2='px-3 py-3 '
                                    inputContainerStyle='w-full gap-3 flex-col gap-4'
                                    img={userProfile}
                                    imgStyle={'w-5 h-5 object-cover object-fit object-center right-2'}

                                    btnElement={true}
                                    btnType='submit'
                                    btnText='Remind'
                                    btnStyle="uppercase bg-DarkBg3 text-SecondaryAccent3 px-5 py-3 truncate w-full transition-all"
                                    onClick={() => { }}
                                />
                            </div>
                        </div>
                    </BlurredCard>
                    <BlurredCard
                        customCard={true}
                        style='w-full overflow-hidden bg-BackDrop_l_xs'
                    >
                        <div className='p-[2rem] w-full h-full flex flex-col gap-10 justify-between'>
                            <div className='flex flex-col gap-4 justify-between'>
                                <span className='text_header text-xl mobile:text-lg'>Contact Us</span>
                                <span className='flex flex-col gap-2'>
                                    <p className='text-sm font-normal text-GrayCustom'>Address</p>
                                    <p className='text-base font-normal text-SecondaryAccent3 desktop:ml-5 tablet:text-center'>15/4 Khreshchatyk Street, Kyiv </p>
                                </span>
                                <span className='flex flex-col gap-2'>
                                    <p className='text-sm font-normal text-GrayCustom'>Phone</p>
                                    <p className='text-base font-normal text-SecondaryAccent3 desktop:ml-5 tablet:text-center'>+234 90 6462 7930 </p>
                                </span>
                                <span className='flex flex-col gap-2'>
                                    <p className='text-sm font-normal text-GrayCustom'>General Enquiry:</p>
                                    <p className='text-base font-normal text-SecondaryAccent3 desktop:ml-5 tablet:text-center'>henryadedugba@gmail.com</p>
                                </span>
                            </div>
                            <div className='flex flex-col justify-between'>
                                <span className='text_header text-xl mobile:text-lg'>Follow Us</span>
                                <div className='w-full py-5 flex justify-center items-center gap-5'>
                                    <span className='w-5 h-5 group transition-all flex justify-center items-center'>
                                        <img src={instagram_g} alt="social-icon-ig" className='w-full h-full object-cover object-fit object-center transition-all group-hover:hidden' />
                                        <img src={instagram_w} alt="social-icon-ig" className='w-full h-full object-cover object-fit object-center transition-all hidden group-hover:block' />
                                    </span>

                                    <span className='w-6 h-6 group transition-all flex justify-center items-center'>
                                        <img src={pintrest_g} alt="social-icon-pt" className='w-full h-full object-cover object-fit object-center transition-all group-hover:hidden' />
                                        <img src={pintrest_w} alt="social-icon-pt" className='w-full h-full object-cover object-fit object-center transition-all hidden group-hover:block' />
                                    </span>

                                    <span className='w-6 h-6 group transition-all flex justify-center items-center'>
                                        <img src={facebook_g} alt="social-icon-fb" className='w-full h-full object-cover object-fit object-center transition-all group-hover:hidden' />
                                        <img src={facebook_w} alt="social-icon-fb" className='w-full h-full object-cover object-fit object-center transition-all hidden group-hover:block' />
                                    </span>

                                    <span className='w-6 h-6 group transition-all flex justify-center items-center'>
                                        <img src={twitter_g} alt="social-icon-tw" className='w-full h-full object-cover object-fit object-center transition-all group-hover:hidden' />
                                        <img src={twitter_w} alt="social-icon-tw" className='w-full h-full object-cover object-fit object-center transition-all hidden group-hover:block' />
                                    </span>

                                    <span className='w-6 h-6 group transition-all flex justify-center items-center'>
                                        <img src={telegram_g} alt="social-icon-tg" className='w-full h-full object-cover object-fit object-center transition-all group-hover:hidden' />
                                        <img src={telegram_w} alt="social-icon-tg" className='w-full h-full object-cover object-fit object-center transition-all hidden group-hover:block' />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </BlurredCard>
                    <BlurredCard
                        customCard={true}
                        style='w-full overflow-hidden bg-BackDrop_l_xs'
                    >
                        <div className='p-[2rem] w-full h-full flex flex-col mobile:gap-8 justify-between'>
                            <div className='flex flex-col gap-4 justify-between'>
                                <span className='text_header text-xl mobile:text-lg'>Shop</span>
                                <span className='flex flex-col gap-1 ml-6'>
                                    {shopLinks.map((item, i) => (
                                        <Link to={`/${ToCamelCase(item.text)}`} key={i} className="text-sm font-normal hover:text-base hover:font-semibold transition-all">
                                            {item.text}
                                        </Link>
                                    ))}
                                </span>
                            </div>
                            <div className='flex flex-col gap-4 justify-between'>
                                <span className='text_header text-xl mobile:text-lg'>Service</span>
                                <span className='flex flex-col gap-1 ml-6'>
                                    {serviceLinks.map((item, i) => (
                                        <Link to={`/${ToCamelCase(item.text)}`} key={i} className="text-sm font-normal hover:text-base hover:font-semibold transition-all">
                                            {item.text}
                                        </Link>
                                    ))}
                                </span>
                            </div>
                        </div>
                    </BlurredCard>
                    <BlurredCard
                        customCard={true}
                        style='w-full overflow-hidden bg-BackDrop_l_xs'
                    >
                        <div className='p-[2rem] w-full h-full flex flex-col gap-4'>
                            <span className='text_header text-xl mobile:text-lg'>About Us</span>
                            <span className='flex flex-col gap-1 ml-6'>
                                {aboutLinks.map((item, i) => (
                                    <Link to={`/${ToCamelCase(item.text)}`} key={i} className="text-sm font-normal hover:text-base hover:font-semibold transition-all">
                                        {item.text}
                                    </Link>
                                ))}
                            </span>
                        </div>
                    </BlurredCard>
                </div>
            </div>
        </div>
    )
}

export default Footer