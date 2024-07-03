import React, { useEffect, useState } from 'react';

type Props = {
  handleClick: (data?: any) => void,
  checked: boolean,
  label?: string,
  labelStyle?: string,
  style?: string,
  notifyMssg?: string,
  notifyMssgStyle?: string,
  disapperMssg?: boolean
}

const Toggle = ({ handleClick, checked, label, labelStyle, style, notifyMssg, notifyMssgStyle, disapperMssg }: Props) => {
  const [showMssg, setShowMssg] = useState(false)

  const handleOnChange = () => {
    handleClick();

    setShowMssg(true);
    disapperMssg && setTimeout(() => setShowMssg(false), 3000);
  }

  useEffect(() => {

    if (disapperMssg) {
      setShowMssg(true);
      setTimeout(() => setShowMssg(false), 3000)
    } else {
      setShowMssg(true)
    }
  }, []);

  return (
    <div className='flex items-center gap-3'
      onMouseEnter={() => setShowMssg(true)}
      onMouseLeave={() => setShowMssg(false)}
    >
      {showMssg ?
        notifyMssg &&
        <span
          className={`${notifyMssgStyle} ${checked ? 'text-DarkBg3' : 'text-SecondaryAccent'} font-light text-xs leading-5`}
        >{notifyMssg}</span>
        : null
      }

      <div className="inline-block w-fit">
        <label htmlFor="toggle-id" className={`${label && 'mr-5'} inline-flex relative items-center cursor-pointer`}>
          <input
            type="checkbox"
            value=""
            id="toggle-id"
            className="sr-only peer"
            checked={checked}
            onChange={handleOnChange}
          />
          <div className={`${style} bg-gray-200 rounded-full peer-checked:after:translate-x-[100%] peer-checked:after:border-white after:content-[''] after:absolute after:bg-white after:shadow-md after:rounded-full after:transition-all`}></div>
          {label && <span className={`${labelStyle} ml-3 text-sm font-medium`}>{label}</span>}
        </label>
      </div>
    </div>
  )
}

export default Toggle;