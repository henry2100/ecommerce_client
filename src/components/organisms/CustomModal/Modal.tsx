import React from 'react'
import closeIcon from '../../../assets/svg/close-circle-solid.svg'
import useDisableBodyScroll from 'components/molecules/useDisableBodyScroll'

type Props = {
    isOpen: boolean,
    children: JSX.Element,
    modalStyle: String,
    contentStyle?: String,
    closeBtnImg?: string,
    closeBtnStyle?: string,
    onClose: () => void
}

const Modal: React.FC<Props> = ({ isOpen, children, modalStyle, contentStyle, closeBtnImg, closeBtnStyle, onClose }) => {
    // useDisableBodyScroll(isOpen);

    // if (isOpen) return null;

    return (
        <div className={`${modalStyle} fixed`}>
            <div className={`${contentStyle} relative z-30 overflow-y-scroll custom_container`}>
                {onClose === undefined
                    ? null
                    : <img
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