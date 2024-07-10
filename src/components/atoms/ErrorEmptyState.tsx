import React from 'react'
import emptyIcon from '../../assets/svg/empty.svg';
import Button from './Button';

type Props = {
    img: boolean
    errorMssg?: string,
    emptyImg?: string,
    style?: string,

    btn?: boolean
    btnText?: string,
    btnStyle?: string,
    btnImg?: string,
    btnImgStyle?: string,
    onClick?: (e:any) => void
}

const ErrorEmptyState:React.FC<Props> = ({img, errorMssg, emptyImg, style, btn, btnText, btnStyle, btnImg, btnImgStyle, onClick}) => {
    return (
        <div className={`${style} absolute flex flex-col items-center py-10 justify-center w-full min-h-full border-b bg-white bg-opacity-75`}>
            {img &&
                <img 
                    src={   emptyImg 
                            ?   emptyImg
                            :   emptyIcon
                        } 
                    alt="emptyIcon" 
                    className='h-20 w-20'
                />
            }
            <div className='p-3 mb-8'>
                <span className='text-gray-500 text-sm font-semibold leading-5'>{errorMssg ? errorMssg : 'Oops, we have nothing to show!'}</span>
            </div>
            <div className={`${btn ? 'flex' : 'hidden'}`}>
                <Button 
                    btnType='button'   
                    btnText={btnText}    
                    btnStyle={`${btnStyle} bg-black text-white px-4 py-2 font-semibold text-sm leading-5`}    
                    btnImg={btnImg}
                    btnImgStyle={btnImgStyle}
                    onClick={onClick}         
                />
            </div>
        </div>
    )
}

export default ErrorEmptyState