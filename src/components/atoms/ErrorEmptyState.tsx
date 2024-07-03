import React from 'react'
// import { t } from 'i18next'
// import TextBlock from './TextBlock'
import emptyIcon from '../../assets/svg/empty.svg';
// import Button from './Button';
// import { storeDeviceAuthData } from 'redux/auth/auth.actions';
// import { setUserLoggedIn } from 'redux/app/app.action';
// import { setValues, removeValues } from 'services/storage';
// import { useNavigate } from 'react-router';

type Props = {
    img: boolean
    errorMssg?: string,
    emptyImg?: string,
    style?: string
}

const ErrorEmptyState:React.FC<Props> = ({img, errorMssg, emptyImg, style}) => {
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
            <div className='p-3'>
                {errorMssg ? <span className='text-gray-500 text-sm font-semibold leading-5'>{errorMssg}</span> : <span className='text-gray-500 text-sm font-semibold leading-5'>Oops, we have nothing to show!</span>}
            </div>
            {/* <div>
                <Button 
                    btnType={undefined}   
                    btnText="Log out"    
                    btnStyle='bg-black text-white px-4 py-2 font-semibold text-sm leading-5'    
                    onClick={()=>{}}         
                />
            </div> */}
        </div>
    )
}

export default ErrorEmptyState