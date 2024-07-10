import React from 'react'
import ReactDOM from 'react-dom'
import Backdrop from './Backdrop'
import Modal from './Modal'

const AppModal = ({handleClose, modalStyle, contentStyle, closeBtnImg, closeBtnStyle, backDropStyle, children}) => {
    const portalElement = document.getElementById('modal_root')
    return (
        <>
           {ReactDOM.createPortal(<Backdrop onClose={handleClose} backDropStyle={backDropStyle}/>, portalElement)} 
           {ReactDOM.createPortal(<Modal onClose={handleClose} modalStyle={modalStyle} contentStyle={contentStyle} closeBtnImg={closeBtnImg} closeBtnStyle={closeBtnStyle}>{children}</Modal>, portalElement)} 
        </>
    )
}

export default AppModal