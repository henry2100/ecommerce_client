import React, { useState } from 'react';
import AppModal from '../CustomModal';
import userDefaultIcon from '../../../assets/svg/navIcons/navMenuIcons/user_linear.svg';
import userIcon_w from '../../../assets//svg/user-white.svg';
import userIcon_d from '../../../assets//svg/user-black.svg';
import Toggle from '../../atoms/Toggle';
import navMenu from 'components/molecules/navMenu';
import { connect } from 'react-redux';
import { setUserLogStatus } from '../../../redux/auth/auth.action';
import { ToSnakeCase } from 'components/atoms/CaseManager';
import { useNavigate } from 'react-router';
import { toggleDarkMode } from '../../../redux/app/app.action';
import { handleLogout } from 'utils';

const MobileNav = (props) => {
    const [toggle, setToggle] = useState(false);

    const navigate = useNavigate();

    // const handleLogout = () => {
    //     props.logoutHandler();
    //     navigate('/dashboard/home');
    // }

    const { navMenuItems } = navMenu(props.user_loggedIn, props.logoutHandler, handleLogout);

    const handleSideNavClick = (e, item) => {
        if (!item.available) {
            return;
        }

        const base_url = item.navType === 'dash' ? '/dashboard' : '/auth';

        navigate(`${base_url}/${ToSnakeCase(item.navItem)}`);
    }

    return (
        <AppModal
            handleClose={() => props.setShowModal(false)}
            modalStyle={`${props.darkMode ? 'bg-Primary_800' : 'bg-white'} hidden tablet:block w-2/5 mobile:w-3/4  min-h-screen h-fit z-30 top-0 right-0 animate-slide_left rounded-l-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all`}
            contentStyle="h-[100vh]"
        >
            <div className='flex flex-col gap-8 h-full'>
                <div className='flex items-center gap-5 p-8 pb-2'>
                    <span className='w-9 h-9 rounded-full border-2 border-Primary overflow-hidden'>
                        <img src={props.darkMode ? userIcon_w : userIcon_d} alt='user-profile' className='w-full h-full' />
                    </span>
                    <h4 className={`${props.darkMode ? 'text-Primary' : 'text-PrimaryActive'} font-semibold text-xl`}>Username</h4>
                </div>
                <div className='flex flex-col gap-5 justify-between h-full px-5 pt-2 pb-12'>
                    <div className={`${props.darkMode ? 'bg-Primary_600' : 'bg-PrimaryDisabled'} flex flex-col gap-1 overflow-hidden rounded-md p-3`}>
                        {navMenuItems.map((item, i) => (
                            <span 
                                key={i} 
                                onClick={item.navFunc === null
                                    ?   (e) => handleSideNavClick(e, item)
                                    :   item.navFunc
                                }
                                className={`${props.darkMode ? 'text-Primary hover:text-PrimaryDisabled hover:bg-PrimaryActive' : 'text-PrimaryActive hover:bg-slate-400 hover:text-white'} flex items-center gap-3 group rounded-md font-normal text-base px-5 py-2 transition-all cursor-pointer  ${item.style}`}
                            >
                                {item.icon1 && <img src={item.icon1} alt='menu_icon' className={`hidden group-hover:block w-4 h-4 mobile:w-5 mobile:h-5 `} />}
                                {item.icon2 && <img src={item.icon2} alt='menu_icon' className={`block group-hover:hidden w-4 h-4 mobile:w-5 mobile:h-5 `} />}
                                {item.navItem}
                            </span>
                        ))}
                    </div>
                    <div className={`${props.darkMode ? 'bg-Primary_600' : 'bg-PrimaryDisabled'} bg-PrimaryDisabled flex justify-between items-center gap-3 group text-slate-500 rounded-md px-5 py-2`}>
                        <span className={`${props.darkMode ? 'text-Primary' : 'text-PrimaryActive'} font-normal text-base`}>
                            Dark Mode
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
    user_loggedIn: state.auth.user_loggedIn,
    darkMode: state.app.darkMode
})

const mapDispatchToProps = dispatch => ({
    setUserLogStatus: (data) => dispatch(setUserLogStatus(data)),
    toggleDarkMode: () => dispatch(toggleDarkMode())
})

export default connect(mapStateToProps, mapDispatchToProps)(MobileNav);