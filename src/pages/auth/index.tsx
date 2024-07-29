import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import bgImg from '../../assets/images/desktop_bg.png';
import leftArrow_l from '../../assets/svg/arrows/arrow_dl.svg';
import leftArrow_d from '../../assets/svg/arrows/arrow_wl.svg';
import homeIcon_outline from '../../assets/svg/navIcons/home_linear.svg';
import { connect } from 'react-redux';

interface Props {
    darkMode: boolean;
}

const Auth = (props) => {
    const navigate = useNavigate();

    return (
        <div className='relative z-10 flex justify-center w-full min-h-screen'>
            <img src={bgImg} alt='bg-img' className='absolute z-10 w-full h-full object-center object-cover' />
            <div className='relative z-[15] my-[15rem] mobile:my-[8rem] w-fit h-fit min-w-[20vw] min-h-[30vh]'>
                <Outlet />
                <div className='flex justify-end items-center gap-2'>
                    <p className='font-semibold text-lg text-PrimaryActive hover:text-white cursor-pointer mt-3'
                        onClick={() => navigate(-1)}
                    >Return</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    darkMode: state.app.darkMode,
});

export default connect(mapStateToProps, null)(Auth);