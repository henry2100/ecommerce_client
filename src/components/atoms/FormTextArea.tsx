import React from 'react'
import { connect } from 'react-redux';

const FormTextArea = (props) => {
    return (
        <div className={`a ${props.layoutStyle} flex flex-col`}>
            {props.label && <label className={`${props.labelStyle} ${props.darkMode ? 'text-Primary' : 'text-PrimaryActive'} mb-2`}>{props.label}</label>}

            <div className={`${props.inputContainerStyle} flex`}>
                <span className={`d-span flex ${props.inputStyle} ${props.darkMode ? 'bg-Primary_600 !border-none text-Primary_200' : 'bg-white'} items-start rounded-md overflow-hidden relative`}>
                    {props.value === '' && <img src={props.img} alt="icon" className={`${props.imgStyle} absolute right-5 top-4`} onClick={props.imgOnClick} />}

                    <textarea 
                        name={props.name}
                        placeholder={props.placeholder}
                        rows={props.rows}
                        cols={props.cols}
                        required={props.required}
                        disabled={props.disabled}
                        className={`${props.inputStyle2} w-full bg-NoColor outline-none py-2 pr-2 pl-4 text-justify`}
                        value={props.value}
                        onChange={props.onChange}
                    >{props.value}</textarea>
                </span>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    darkMode: state.app.darkMode,
});

export default connect(mapStateToProps, null)(FormTextArea);
