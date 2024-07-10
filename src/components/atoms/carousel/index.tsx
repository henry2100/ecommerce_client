import React, { useEffect, useState } from 'react'
import Alert from '../Alert'
import Button from '../Button'
import SlideNav from './SlideNav'

type Props = {
    data: any[],
    containerStyle?: string,
    component: any,
    autoSlide?: boolean,
    slideDirection?: "backward" | "forward" | undefined,
    slideDuration?: any,
    currentItem?: any,
    setCurrentItem?: (e: any) => void,
    carouselStyle?: string,
    setCarouselStyle?: (e: any) => void,
}

const Carousel = ({ component, data, containerStyle, autoSlide, slideDirection, slideDuration, currentItem, setCurrentItem, carouselStyle, setCarouselStyle }: Props) => {
    const [slideDelay, setSlideDelay] = useState(false);

    const nItems = data.length

    const nextItem = () => {

        if (slideDirection === "forward") {
            setCarouselStyle && setCarouselStyle('animate-carousel_slide_left');

        } else if (!slideDirection) {
            setCarouselStyle && setCarouselStyle('animate-fade_in');
        }

        if (currentItem !== nItems) {
            setCurrentItem && setCurrentItem(currentItem + 1)
        } else if (currentItem === nItems) {
            setCurrentItem && setCurrentItem(1)
        }

    }

    const prevItem = () => {
        setCarouselStyle && setCarouselStyle('animate-carousel_slide_right');

        if (currentItem !== 1) {
            setCurrentItem && setCurrentItem(currentItem - 1)
        } else if (currentItem === 1) {
            setCurrentItem && setCurrentItem(nItems)
        }
    }

    const autoSlideFunc = () => {
        if (slideDirection === "backward") {
            loopFunc(slideDuration ? slideDuration : 1000, prevItem);

        } else {
            loopFunc(slideDuration ? slideDuration : 1000, nextItem)
        }
    }

    const loopFunc = (duration: any, action: () => void) => {
        for (let i = 0; i <= data.length; i++) {
            if (slideDelay) {
                timeoutFunc(100000, action)
            } else {
                timeoutFunc(duration, action)
            }
        }
    }

    const delaySliderOnMouseOver = () => {
        setSlideDelay(true)
    }

    const delaySliderOnMouseLeave = () => {
        setSlideDelay(false)
    }

    const timeoutFunc = (duration: any, action: () => void) => {
        setTimeout(() => {
            action()
        }, duration)
    }

    useEffect(() => {
        autoSlideFunc()
    }, [slideDelay])

    // console.log("slideDelay:", slideDelay);

    return (
        <div className={`${containerStyle} h-[80vh] relative`} onLoad={autoSlide ? autoSlideFunc : () => { }} onMouseEnter={delaySliderOnMouseOver} onMouseLeave={delaySliderOnMouseLeave}>
            {component}
            <SlideNav
                data={data}
                nItems={nItems}
                nextAction={nextItem}
                prevAction={prevItem}
                currentItem={currentItem}
                setCurrentItem={setCurrentItem}
                layout="bg-BackDrop_d_xs absolute z-[7] w-full h-full"
            />
        </div>
    )
}

export default Carousel

{/* <div className='px-8 py-5 hover:bg-BackDrop_l_lg w-full bg-BackDrop_l_md backdrop-blur flex flex-col gap-8 transaition_all'>
                    <span className='text_header text-[20px]'>Subscription by your needs</span>
                    <p>With our subscription service tailored to your specific needs, you can enjoy the convenience of having beautiful bouquets delivered straight to your door at regular intervals. Our flexible service is perfect for busy individuals or those who want to ensure they always have fresh flowers on hand. You'll save time and money with this hassle-free solution to your floral needs.</p>
                </div> */}