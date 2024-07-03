import React from 'react'
import closeIcon from '../../../assets/svg/close-circle-solid.svg'

type Props = {
    children: JSX.Element,
    modalStyle: String,
    contentStyle?: String,
    closeBtnImg?: string,
    closeBtnStyle?: string,
    onClose: () => void
}

const Modal:React.FC<Props> = ({children, modalStyle, contentStyle, closeBtnImg, closeBtnStyle, onClose}) => {
    
    return (
        <div className={`${modalStyle} fixed`}>
            <div className={`${contentStyle} relative overflow-y-scroll custom_container`}>
                {onClose === undefined 
                    ?   null 
                    :   <img 
                            src={closeBtnImg ? closeBtnImg : closeIcon} 
                            alt="closeIcon" 
                            className={`${closeBtnStyle} absolute right-0 top-1 cursor-pointer`} 
                            onClick={onClose}
                        />}
                {children}
            </div>
        </div>
    )
}

export default Modal