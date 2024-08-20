import React, { useState } from 'react';
import AppModal from '../CustomModal';
import userDefaultIcon from '../../../assets/svg/navIcons/navMenuIcons/user_linear.svg';
import userIcon_w from '../../../assets/svg/user-white.svg';
import userIcon_d from '../../../assets/svg/user-black.svg';
import user_placeholder from '../../../assets/svg/User_2.svg';
import cartIcon_solid from '../../../assets/svg/navIcons/shopping-cart-solid.svg';
import cartIcon_linear from '../../../assets/svg/navIcons/shopping-cart-linear.svg';
import sunIcon from '../../../assets/svg/sun.svg';
import moonIcon from '../../../assets/svg/moon.svg';
import Toggle from '../../atoms/Toggle';
import navMenu from 'components/molecules/navMenu';
import { connect } from 'react-redux';
import { setUserLogStatus } from '../../../redux/auth/auth.action';
import { ToSnakeCase } from 'components/atoms/CaseManager';
import { useNavigate } from 'react-router';
import { toggleDarkMode } from '../../../redux/app/app.action';
import { handleLogout } from 'utils';

const MobileNav = (props) => {
    const navigate = useNavigate();

    const userStatus = props.userLoggedIn;
    const userEmail = props.userData?.data?.email;
    const userProfileImg = props.userData?.data?.imageUrl;

    const { navMenuItems } = navMenu(props.userLoggedIn, handleLogout);

    const handleSideNavClick = (e, item) => {
        if (!item.available) {
            return;
        }

        const base_url = item.navType === 'dash' ? '/dashboard' : '/auth';

        navigate(`${base_url}/${ToSnakeCase(item.navItem)}`);
        props.setShowModal(false);
    }

    return (
        <AppModal
            handleClose={() => props.setShowModal(false)}
            modalStyle={`${props.darkMode ? 'bg-Primary_800' : 'bg-white'} hidden tablet:block w-2/5 mobile:w-3/4  min-h-screen h-fit z-30 top-0 right-0 animate-slide_left rounded-l-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition ease-in-out duration-500`}
            contentStyle="h-[100vh]"
            closeBtnStyle='hidden'
        >
            <div className='flex flex-col gap-8 h-full'>
                <div className='flex items-center gap-2 p-5 py-3 border-b-[.5px] border-Primary_200'>
                    <span className='w-10 h-10 rounded-full overflow-hidden flex-shrink-0'>
                        <img src={userStatus
                            ? userProfileImg
                                ? userProfileImg
                                : user_placeholder
                            : user_placeholder
                        } alt='user-profile' className='w-full h-full object-cover object-center' />
                    </span>
                    <span className={`${props.darkMode ? 'text-Primary' : 'text-PrimaryActive'} font-semibold truncate`}>
                        {userStatus
                            ? <p className='text-lg mobile:text-base'>{userEmail}</p>
                            : <p className='text-base mobile:text-sm'>Sign In</p>
                        }
                    </span>
                </div>

                <div className='flex flex-col gap-5 justify-between h-full px-5 pt-2 pb-12'>
                    <div className='flex flex-col gap-5'>
                        <div className={`${props.darkMode ? 'bg-Primary_600 text-Primary' : 'bg-PrimaryDisabled text-PrimaryActive'} flex justify-between items-center gap-3 group text-slate-500 rounded-md px-5 py-2 desktop:relative`}
                            onClick={() => {
                                navigate('/dashboard/cart');
                                props.setShowModal(false);
                            }}
                        >
                            <span className={`${props.darkMode ? 'text-Primary hover:text-PrimaryDisabled hover:bg-PrimaryActive' : 'text-PrimaryActive hover:bg-slate-400 hover:text-white'} flex items-center gap-3 group rounded-md font-normal text-base px-5 py-2 transition-all cursor-pointer flex-shrink-0`}>
                                <img src={cartIcon_linear} alt='cart-icon' className='block group-hover:hidden w-6 h-6 transition ease-in-out duration-250' />
                                <img src={cartIcon_solid} alt='cart-icon' className='hidden group-hover:block w-6 h-6 transition ease-in-out duration-250' />
                                Cart
                            </span>
                            <span className={`w-5 h-5 text-Primary font-semibold text-lg mobile:text-base rounded-full !bg-NoColor flex justify-center items-center`}>
                                {props.shopping_cart.length}
                            </span>
                        </div>
                        <div className={`${props.darkMode ? 'bg-Primary_600' : 'bg-PrimaryDisabled'} flex flex-col gap-1 overflow-hidden rounded-md p-3`}>
                            {navMenuItems.map((item, i) => (
                                <span
                                    key={i}
                                    onClick={item.navFunc === null
                                        ? (e) => handleSideNavClick(e, item)
                                        : item.navFunc
                                    }
                                    className={`${props.darkMode ? 'text-Primary hover:text-PrimaryDisabled hover:bg-PrimaryActive' : 'text-PrimaryActive hover:bg-slate-400 hover:text-white'} flex items-center gap-3 group rounded-md font-normal text-base px-5 py-2 transition-all cursor-pointer  ${item.style}`}
                                >
                                    {item.icon1 && <img src={item.icon1} alt='menu_icon' className={`hidden group-hover:block w-4 h-4 mobile:w-5 mobile:h-5 `} />}
                                    {item.icon2 && <img src={item.icon2} alt='menu_icon' className={`block group-hover:hidden w-4 h-4 mobile:w-5 mobile:h-5 `} />}
                                    {item.navItem}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className={`${props.darkMode ? 'bg-Primary_600' : 'bg-PrimaryDisabled'} bg-PrimaryDisabled flex justify-between items-center gap-3 group text-slate-500 rounded-md px-5 py-2`}>
                        <span className={`${props.darkMode ? 'text-Primary' : 'text-PrimaryActive'} font-normal text-base`}>
                            <img src={props.darkMode ? moonIcon : sunIcon} alt='weather_icon' className='w-4 h-4' onClick={props.toggleDarkMode} />
                        </span>
                        <Toggle
                            handleClick={props.toggleDarkMode}
                            checked={props.darkMode}
                            style="w-[26px] h-[14px] after:h-3 after:w-3 after:top-0 after:bottom-0 after:left-[1px] after:my-auto peer-checked:bg-black after:bg-GrayCustom6"
                            notifyMssg={props.darkMode ? 'Enabled' : 'Disabled'}
                            notifyMssgStyle={props.darkMode ? 'text-Success' : 'text-Danger'}
                            disapperMssg={false}
                        />
                    </div>
                </div>
            </div>
        </AppModal>
    )
}

const mapStateToProps = state => ({
    userLoggedIn: state.auth.user_loggedIn,
    userData: state.auth?.user_authData,
    darkMode: state.app.darkMode,
    shopping_cart: state.app?.shopping_cart || []
})

const mapDispatchToProps = dispatch => ({
    setUserLogStatus: (data) => dispatch(setUserLogStatus(data)),
    toggleDarkMode: () => dispatch(toggleDarkMode())
})

export default connect(mapStateToProps, mapDispatchToProps)(MobileNav);