import React, {useState} from 'react'
import leftArrow from '../../../assets/svg/arrows/angle-left-2.svg';
import rightArrow from '../../../assets/svg/arrows/angle-right-2.svg'

const SlideNav = ({data, currentItem, setCurrentItem, nextAction, prevAction, layout, darkMode}) => {

    return (
        <div aria-label="Page navigation example" className={`${layout} flex items-center justify-between py-5`}>
            <div className="inline-flex -space-x-px">
                <span className="cursor-pointer bg-BackDrop_d_md mobile:bg-NoColor p-5 rounded-full absolute left-10 mobile:-left-3" onClick={prevAction}>
                    <img src={leftArrow} alt="leftArrow" className='w-5 h-5 mobile:w-4 mobile:h-4 cursor-pointer'/>
                </span>
                
                <div className='flex py-2 gap-1 absolute w-full justify-center items-center bottom-8'>
                {data.map((_, i) => (
                    <span
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                            currentItem === i + 1 ? "w-8 bg-white" : "w-4 bg-white/50"
                        }`}
                        onClick={() => setCurrentItem(i + 1)}
                    />
                ))}
                </div>

                <span className="cursor-pointer bg-BackDrop_d_md mobile:bg-NoColor p-5 rounded-full absolute right-10 mobile:-right-3" onClick={nextAction}>
                    <img src={rightArrow} alt="leftArrow" className='w-5 h-5 mobile:w-4 mobile:h-4 cursor-pointer'/>
                </span>
            </div>
        </div>
    )
}

export default SlideNav