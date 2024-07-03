import React from 'react'

type Props = {
    btnId?: string,
    btnType: "button" | "submit" | "reset" | undefined,
    btnText?: string | React.ReactNode,
    btnImg?: string,
    btnImgStyle?: string,
    btnStyle?: string,
    disabled?: boolean,
    disabledClass?: string,
    onClick?: (e: any) => void,
    handleMouseHover?: (e: any) => void
} 

const Button = ({btnId, btnType, btnText, btnImg, btnImgStyle, btnStyle, disabled, disabledClass, onClick, handleMouseHover}:Props) => {
    
    return (
        <button 
            id={btnId}
            type={btnType} 
            className={`${btnStyle} ${disabled ? disabledClass : 'hover:shadow-md hover:transition-all' } flex justify-center gap-3 items-center rounded-md`} 
            onClick={onClick}
            onMouseEnter={handleMouseHover}
            disabled={disabled}
        >
            {btnText &&
                <span className='flex-shrink-0'>
                    {btnText}
                </span>
            }
            {btnImg &&
                <span className='flex-shrink-0'>
                    <img src={btnImg} alt='btn_icon' className={`${btnImgStyle}`}/>
                </span>
            }
        </button>
    )
}

export default Button