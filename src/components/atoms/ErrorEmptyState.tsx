import React from 'react'
import emptyIcon from '../../assets/svg/empty.svg';
import emptyIcon_d from '../../assets/svg/empty-dark.svg';
import Button from './Button';
import { connect } from 'react-redux';

type Props = {
    img: boolean
    errorMssg?: string,
    emptyImg?: string,
    style?: string,
    darkMode:boolean,

    btn?: boolean
    btnText?: string,
    btnStyle?: string,
    btnImg?: string,
    btnImgStyle?: string,
    onClick?: (e:any) => void
}

const ErrorEmptyState:React.FC<Props> = ({img, errorMssg, emptyImg, style, darkMode, btn, btnText, btnStyle, btnImg, btnImgStyle, onClick}) => {
    return (
        <div className={`${style} absolute flex flex-col items-center py-10 justify-center w-full min-h-full bg-BackDrop_d_xs`}>
            {img &&
                <img 
                    src={   emptyImg 
                            ?   emptyImg
                            :   darkMode ? emptyIcon_d : emptyIcon
                        } 
                    alt="emptyIcon" 
                    className='h-20 w-20'
                />
            }
            <div className='p-3 mb-8'>
                <span className={`${darkMode ? 'text-Primary' : 'text-PrimaryActive'} text-sm font-semibold leading-5`}>{errorMssg ? errorMssg : 'Oops, we have nothing to show!'}</span>
            </div>
            <div className={`${btn ? 'flex' : 'hidden'}`}>
                <Button 
                    btnType='button'   
                    btnText={btnText}    
                    btnStyle={`${btnStyle} bg-black text-white px-4 py-2 font-semibold text-sm leading-5`}    
                    btnImg={btnImg}
                    btnImgStyle={btnImgStyle}
                    onClick={onClick}         
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state:any) => ({
    darkMode: state.app.darkMode
})

export default connect(mapStateToProps, null)(ErrorEmptyState);