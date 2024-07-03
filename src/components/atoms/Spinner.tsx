import React from 'react';

type Props = {
  borderStyle?: string,
  textStyle?: string,
  text?: string,
}

const Spinner: React.FC<Props> = ({ borderStyle, textStyle, text }) => {
  return (
    <div className='flex justify-center items-center gap-3'>
      <div
        className={`inline-block animate-spin rounded-full ${borderStyle ? borderStyle : 'border-4 border-current border-r-transparent w-8 h-8'} border-solid align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      >      
      </div>
      <span className={`${textStyle ? textStyle : 'text-DarkBg3 text-sm'}`}>{text}</span>
    </div>
  )
}

export default Spinner