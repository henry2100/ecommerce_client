import React from 'react';
import { Outlet } from 'react-router';
import bgImg from '../../assets/images/desktop_bg.png';
import homeIcon_bold from '../../assets/svg/navIcons/home_bold.svg';
import homeIcon_outline from '../../assets/svg/navIcons/home_linear.svg';

const Auth = () => {
    return (
        <div className='relative z-10 flex justify-center w-full min-h-screen'>
            <img src={bgImg} alt='bg-img' className='absolute z-10 w-full h-full object-center object-cover' />
            <div className='relative z-[15] my-[15rem] mobile:my-[8rem] w-fit h-fit min-w-[20vw] min-h-[30vh]'>
                <Outlet />
                {/* <div className='flex justify-center items-center border-2 border-Success'>
                    <div className='group flex justify-center items-center gap-2 border-2 border-red-500'>
                        <img src={homeIcon_bold} alt='homeIcon' className='hidden group-hover:block w-6 h-6 transition-all' />
                        <img src={homeIcon_outline} alt='homeIcon' className='block group-hover:hidden w-6 h-6 transition-all' />
                        <p className='font-semibold text-lg'>Return Home</p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Auth;