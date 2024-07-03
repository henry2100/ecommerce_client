import React from 'react'
import Button from 'components/atoms/Button'
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll"

type Props = {
    customCard?: boolean
    children?: JSX.Element

    style?: string,
    titleText?: string,
    titleTextStyle?:  string,

    descText?: string,
    descTextStyle?: string,

    smallTextTop?: string, 
    smallTextStyle?: string,

    link?: boolean, /* To determine if the button click action type */
    linkTo?:string,

    btnElement?: boolean,
    btnType?: "button" | "submit" | "reset" | undefined,
    btnText?: string,
    btnImg?: string,
    btnImgStyle?: string,
    btnStyle?: string,
    validationErr?: string,
    onClick?: () => void,
}

const BlurredCard = ({
    customCard,
    children,
    style,
    titleText,
    titleTextStyle,
    descText,
    descTextStyle,
    smallTextTop,
    smallTextStyle, 
    link,
    linkTo,
    btnElement, 
    btnType, 
    btnText, 
    btnImg, 
    btnImgStyle,
    btnStyle, 
    onClick}: Props) => {

    const btnContent = (
        link ?
        <Button 
            btnType={btnType} 
            btnText={btnText} 
            btnImg={btnImg} 
            btnImgStyle={btnImgStyle} 
            btnStyle={btnStyle} 
            onClick={onClick}
        />
        :   <ScrollLink
                to={`${linkTo}`}
                spy={true}
                smooth={true}
                offset={0}
                duration={1500}
                className={btnStyle}
                // onClick={close}
            >
            <Button 
                btnType={btnType} 
                btnText={btnText}
                btnImg={btnImg} 
                btnImgStyle={btnImgStyle} 
                onClick={onClick}
            />
            </ScrollLink>
    )

    return (
        <div className={`${style} rounded-lg backdrop-blur flex flex-col gap-8 justify-between transaition_all`}>  
            {customCard
                ?   <>
                        {children}
                    </>
                
                :   <>
                        <span className='text-left uppercase'>
                            <p className={`mb-3 ${smallTextStyle}`}>{smallTextTop}</p>
                            <p className={`text-[30px] ${titleTextStyle}`}>{titleText}</p>
                        </span>
                        <p className={`text-lg leading-7 ${descTextStyle}`}>{descText}</p>
                        {btnElement && btnContent}
                    </>
            }
        </div>
    )
}

export default BlurredCard



{/* <Button 
        btnType="button"
        btnText="Subscribe Now"
        btnStyle='border border-white hover:bg-white hover:text-DarkBg3 font-semibold text-lg rounded-md bottom-5 left-0 right-0 w-fit mx-auto px-7 py-3 uppercase'
        onClick={()=>{}}
    /> */}