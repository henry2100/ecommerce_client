import React, {useState} from 'react';
import copyIcon from '../../assets/svg/copy.svg';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Alert from './Alert'

type Props = {
    text: any,
    displayedText?: any,
    textStyle?: string,
    style?: string,
    mssgStyle?: string,
    imgStyle?: string,
}

const CopyText: React.FC<Props> = ({text, displayedText, textStyle, style, mssgStyle, imgStyle}) => {
    const [showMssg, setShowMssg] = useState(false)

    const conetent = <span className={`${mssgStyle} font-semibold text-sm leading-5 text-Success absolute`}>Copied!</span>

    const handleCopy = () => {
        Alert('success','Copied!')
        
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

export default CopyText

// [
//     {
//         "reference": "Ljdhu889282ww343",
//         "amount": "10",
//         "currency": "NGN",
//         "accountNumber": "8061349079",
//         "bankCode": "100004",
//         "description": "test_01"
//     },
//     {
//         "reference": "Isuieuye289w334i212",
//         "amount": "10",
//         "currency": "NGN",
//         "accountNumber": "1243652511",
//         "bankCode": "000014",
//         "description": "test_02"
//     },
//     {
//         "reference": "223erfdd22e2",
//         "amount": "10",
//         "currency": "NGN",
//         "accountNumber": "8061349079",
//         "bankCode": "120001",
//         "description": "test_03"
//     }
// ]