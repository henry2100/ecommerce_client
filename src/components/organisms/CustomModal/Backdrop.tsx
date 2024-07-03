import React from 'react'

type Props = {
    onClose: () => void
}

const Backdrop:React.FC<Props> = ({onClose}) => {
    return <div onClick={onClose} className='bg-BackDrop_d_2xl fixed z-20 top-0 left-0 h-full w-full'></div>
}

export default Backdrop