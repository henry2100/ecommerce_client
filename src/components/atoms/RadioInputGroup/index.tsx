import React, { useState } from 'react'
import './layout.css'

type Props = {
    style?: string,
    name?: string,
    checked?: boolean,
    containerStyle?: string,
    checkStyle?: string,
    inputData: any[],
    label?: any,
    labelStyle?: string
    validationErr?: string
    setSelected: (data?:any) => void
}

const RadioInput: React.FC<Props> = ({style, name, checked, containerStyle, checkStyle, inputData, label, labelStyle, validationErr, setSelected}) => {
    const [value, setValue] = useState('');

    const handleSelect = (item) => {
        setSelected(item.value)
        setValue(item.label)
    }

    return (
        <div className={`${style} flex flex-col justify-between my-1`}>
            {label && <label className={`${labelStyle}`}>{label}</label>}
            <div className='flex justify-between gap-5'>
                <div className={`flex ${containerStyle} `}>
                {inputData.length > 0 &&
                    inputData.map((item, i) => (
                        <div key={i} className='flex items-center gap-2 py-2 cursor-pointer'>
                            <label className='custom_radio_btn'>
                                <input type='radio' name={name} checked={checked} className="hidden" value={value} onChange={()=>handleSelect(item)}/>
                                <span className={`${checkStyle} checkmark items-center rounded-full`}></span>
                            </label>
                            <span className='text-xs leading-5 text-DarkBg6'>{item.label}</span>
                        </div>
                    ))
                }
                </div>
                {   validationErr !== '' &&
                        <div className="f-span text-right mt-2 ">
                            <span className="text-xs font-medium text-red-500">
                                {validationErr}
                            </span>
                        </div>
                }
            </div>
        </div>
    )
}

export default RadioInput