import React, { useState } from 'react'
import FormInput from '../FormInput'
import arrowUp from '../../../assets/svg/arrow-up.svg'
import arrowDown from '../../../assets/svg/arrow-down.svg'

type Props = {
    label?: string;
    labelStyle?: string;
    placeholder?: string;
    name?: string;
    data: any[];
    imgOpts?: any;
    inputImgStyle?: string;
    inputWrapStyle?: string;
    inputStyle?: string;
    containerStyle?: string;
    dropdownStyle?: string;
    selected?: any;
    setSelected: (data?: any) => void;
}

const Select: React.FC<Props> = ({ label, labelStyle, placeholder, name, data, imgOpts, inputImgStyle, inputWrapStyle, inputStyle, containerStyle, dropdownStyle, setSelected }) => {
    const [loading, setLoading] = useState(false);
    const [dropdown, setDropdown] = useState(false)
    const [value, setValue] = useState('')
    const [valueErr, setValueErr] = useState('')

    const handleInputChange = e => {
        setValue(e.target.value)

        if (e.target.value.length >= 1) {
            setDropdown(true);
        } else {
            setDropdown(false);
        }


    }

    const handleSelect = (item) => {
        setSelected(item.value)
        setValue(item.label)
        setDropdown(false)
    }

    const filteredData = data?.filter(item => {
        if (item.label.toLowerCase().includes(value.toLowerCase())) {
            return item;
        }
        else {
            return;
        }
    })

    return (
        <div className={`${containerStyle} w-full relative`}>
            <FormInput
                type="text"
                name={name}
                placeholder={placeholder}
                style={`${inputWrapStyle} w-full relative z-[15]`}
                inputStyle={`${inputStyle} border border-transparent text-Black2 w-full bg-white`}
                label={label}
                labelStyle={labelStyle}
                value={value}
                onChange={handleInputChange}
                autoComplete="off"
                validationErr={valueErr}
                img={
                    imgOpts
                        ? imgOpts
                        : dropdown
                            ? arrowUp
                            : arrowDown
                }
                imgStyle={`${inputImgStyle} w-4 h-4 cursor-pointer`}
                imgOnClick={() => setDropdown(prevState => !prevState)}
            />
            {dropdown &&
                <div className={`${dropdownStyle} flex flex-col gap-2 absolute z-10 right-0 p-1 bg-white rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-1/2 h-fit animate-slide_down2`}>
                    {filteredData?.length === 0
                        ? <span className='cursor-default font-normal text-base leading-6 text-Primary rounded-md p-2 hover:bg-BackDrop_d_xs'>
                            Not found
                        </span>

                        : filteredData?.map((dataItem, i) => (
                            <span key={i} onClick={() => handleSelect(dataItem)} className='cursor-pointer font-normal text-base leading-6 text-Black2 rounded-md p-2 hover:bg-BackDrop_d_xs'>
                                {dataItem.label}
                            </span>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Select;