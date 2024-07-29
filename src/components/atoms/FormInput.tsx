import React, { useState } from 'react'
import Button from './Button'
import { connect } from 'react-redux';

type Props = {
    darkMode?: boolean,
    type: string,
    name?: string,
    autoComplete?: "on" | "off",
    indicatorStyle?: string,
    placeholder?: string,
    style?: string,
    inputStyle?: string,
    inputStyle2?: string,
    inputContainerStyle?: string,
    label?: string,
    labelStyle?: string,
    value?: string,
    img?: string,
    imgStyle?: string,
    imgOnClick?: (e?: any) => void,
    min?: number,
    max?: number,
    disabled?: boolean
    required?: boolean;
    btnElement?: boolean,
    btnType?: "button" | "submit" | "reset" | undefined,
    btnText?: string,
    btnImg?: any,
    btnImgStyle?: string, 
    btnStyle?: string,
    validationErr?: any,
    onClick?: () => void,
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

const FormInput = React.forwardRef(({
    darkMode,
    label, 
    labelStyle,
    indicatorStyle,
    autoComplete,
    type, 
    name, 
    placeholder, 
    style, 
    inputStyle, 
    inputStyle2, 
    inputContainerStyle, 
    value, 
    required,
    img,
    imgStyle, 
    imgOnClick, 
    min,
    max,
    validationErr, 
    disabled,
    onChange, 
    
    btnElement, 
    btnType, 
    btnText, 
    btnImg,
    btnImgStyle, 
    btnStyle, 
    onClick}:Props, ref) => {
    const btnContent = (
        <Button btnType={btnType} btnText={btnText} btnImg={btnImg} btnImgStyle={btnImgStyle} btnStyle={btnStyle} onClick={onClick}/>
    )

    return (
        <div className={`${darkMode ? '' : ''} ${style} flex flex-col`}>
            {label && <label className={`${labelStyle} ${darkMode ? 'text-Primary' : 'text-PrimaryActive'} mb-2`}>{label}</label>}
            {   btnElement && img
                ?   <div className={`${inputContainerStyle} flex`}>
                        <span className={`${inputStyle} ${darkMode ? 'bg-Primary_Accents_sm !border-none text-Primary_200' : 'bg-white'} flex items-center w-3/4 rounded-md overflow-hidden relative`}>
                            <img src={img} alt="icon" className={`${imgStyle} absolute right-5`} onClick={imgOnClick}/>
                            <input 
                                type={type} 
                                name={name}
                                placeholder={placeholder}
                                onChange={onChange}
                                value={value}
                                min={min}
                                max={min}
                                required={required}
                                className={`${inputStyle2} py-2 bg-NoColor outline-none w-full`}
                                disabled={disabled}
                                autoComplete={autoComplete}
                            />
                        </span>
                        {btnContent}
                    </div>
                :btnElement && !img   
                ?   <div className={`${inputContainerStyle} flex`}>
                        <span className={`${inputStyle} ${darkMode ? 'bg-Primary_Accents_sm !border-none text-Primary_200' : 'bg-white'} rounded-md overflow-hidden w-3/4`}>
                            <input
                                type={type} 
                                name={name} 
                                placeholder={placeholder}
                                onChange={onChange}
                                value={value}
                                min={min}
                                max={min}
                                required={required}
                                className={`${inputStyle2} w-full bg-NoColor outline-none py-2 px-2`}
                                disabled={disabled}
                                autoComplete={autoComplete}
                            />
                        </span>
                        {btnContent}
                    </div>
                :   !btnElement && img
                ?   <span className={`${darkMode ? 'bg-Primary_Accents_sm !border-none text-Primary_200' : 'bg-white'} d-span flex ${inputStyle} items-center rounded-md overflow-hidden relative`}>
                        <img src={img} alt="icon" className={`${imgStyle} absolute right-5`} onClick={imgOnClick}/>
                        <input
                            type={type} 
                            name={name} 
                            placeholder={placeholder}
                            onChange={onChange}
                            value={value}
                            min={min}
                            max={min}
                            required={required}
                            className={`${inputStyle2} w-full bg-NoColor outline-none py-2 px-2`}
                            disabled={disabled}
                            autoComplete={autoComplete}
                        />
                    </span>
                :   <span className={`${darkMode ? 'bg-Primary_Accents_sm !border-none text-Primary_200' : 'bg-white'} e-span ${inputStyle} rounded-md overflow-hidden`}>
                        <input
                            type={type} 
                            name={name} 
                            placeholder={placeholder}
                            onChange={onChange}
                            value={value}
                            min={min}
                            max={min}
                            required={required}
                            className={`${inputStyle2} w-full bg-NoColor outline-none py-2 px-2`}
                            disabled={disabled}
                            autoComplete={autoComplete}
                        />
                    </span>
            }
            <div className={`${indicatorStyle} border border-NoColor w-full rounded-full p-[1px] mt-1`}></div>
            {   validationErr &&
                    <div className="f-span text-right mt-2">
                        <span className="text-xs font-medium text-red-500">
                            {validationErr}
                        </span>
                    </div>
            }
        </div>
    )
})

const mapStateToProps = state => ({
    darkMode: state.app.darkMode,
})

export default connect(mapStateToProps, null)(FormInput);