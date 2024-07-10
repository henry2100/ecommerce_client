import React from 'react'

type Props = {
    onClose: () => void,
    backDropStyle: string,
}

const Backdrop:React.FC<Props> = ({onClose, backDropStyle}) => {
    return <div onClick={onClose} className={`${backDropStyle} bg-BackDrop_d_2xl fixed z-[28] top-0 left-0 h-full w-full transition ease-in duration-300`}></div>
}

export default Backdrop