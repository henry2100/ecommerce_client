import React, {useState} from 'react';
import copyIcon from '../../assets/svg/copy.svg';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Alert from './Alert'
import { connect } from 'react-redux';

type Props = {
    text: any,
    displayedText?: any,
    textStyle?: string,
    style?: string,
    mssgStyle?: string,
    imgStyle?: string,
    darkMode?: boolean
}

const CopyText: React.FC<Props> = ({text, displayedText, textStyle, style, mssgStyle, imgStyle, darkMode}) => {
    const [showMssg, setShowMssg] = useState(false)

    const conetent = <span className={`${mssgStyle} font-semibold text-sm leading-5 text-Success absolute`}>Copied!</span>

    const handleCopy = () => {
        Alert('success','Copied!', darkMode);
        
        setShowMssg(true)
        setTimeout(() => {
            setShowMssg(false)
        }, 1500);
    }

    return (
        <div className={`flex justify-between gap-3 items-center w-fit relative ${style} ${textStyle}`}>
            <span className={`text-sm`}>
                {displayedText ? displayedText : text}
            </span>
            <span className='flex-shrink-0 cursor-pointer'>
                <CopyToClipboard text={text} onCopy={handleCopy}>
                    <img src={copyIcon} alt='copyIcon' className={`${imgStyle} cursor-pointer`}/>
                </CopyToClipboard>
            </span>
            {/* {showMssg && conetent} */}
        </div>
    )
}

const mapStateToProps = (state:any) => ({
    darkMode: state.app.darkMode
})

export default connect(mapStateToProps, null)(CopyText);