import React, { useEffect, useState } from 'react'
import NavItem from './NavItem';
import { ToSnakeCase } from 'components/atoms/CaseManager';

import arrow_down_d from '../../../assets/svg/arrows/arrow_dd.svg';
import arrow_up_d from '../../../assets/svg/arrows/arrow_du.svg';
import navMenuIcon from '../../../assets/svg/menu-icon.svg';

import homeIcon from '../../../assets/svg/navIcons/home_linear.svg';
import homeIconSolid from '../../../assets/svg/navIcons/home_bold.svg';
import shopIcon from '../../../assets/svg/navIcons/shop_linear.svg';
import shopIconSolid from '../../../assets/svg/navIcons/shop_bold.svg';
import callIcon from '../../../assets/svg/navIcons/call_linear.svg';
import callIconSolid from '../../../assets/svg/navIcons/call_bold.svg';
import searchIcon from '../../../assets/svg/navIcons/search_linear.svg';
import searchIconSolid from '../../../assets/svg/navIcons/search_bold.svg';
import settingsIcon from '../../../assets/svg/navIcons/settings_linear.svg';
import settingsIconSolid from '../../../assets/svg/navIcons/settings_bold.svg';

import logoutIcon from '../../../assets/svg/navIcons/navMenuIcons/logout_linear.svg';
import logoutIconSolid from '../../../assets/svg/navIcons/navMenuIcons/logout_bold.svg';
import loginIcon from '../../../assets/svg/navIcons/navMenuIcons/logout_linear.svg';
import loginIconSolid from '../../../assets/svg/navIcons/navMenuIcons/logout_bold.svg';
import newUserIcon from '../../../assets/svg/navIcons/navMenuIcons/user_cirlce_add_linear.svg';
import newUserIconSolid from '../../../assets/svg/navIcons/navMenuIcons/user_cirlce_add_bold.svg';

import { getValues } from 'services/storage';
import MobileNav from './MobileNav';
import navMenu from 'components/molecules/navMenu';
import useWindowSize from '../../atoms/WindowWidth';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { setUserLogStatus } from '../../../redux/auth/auth.action';
import { handleLogout } from 'utils';

const TopNav = (props) => {
    const [dropdown, setDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState('');

    const navigate = useNavigate();

    const userStatus = props.user_loggedIn;

    const { navMenuItems } = navMenu(userStatus, props.logoutHandler, handleLogout);
    const { windowWidth, windowHeight, width, height } = useWindowSize();

    const naviItems = [
        { navItem: 'Home', style: `${userStatus ? 'hidden' : 'block'}`, icon1: homeIconSolid, icon2: homeIcon, available: true },
        { navItem: 'Shop', style: `${userStatus ? 'block' : 'hidden'}`, icon1: shopIconSolid, icon2: shopIcon, available: true },
        { navItem: 'Contact Us', style: `${userStatus ? '' : 'block'}`, icon1: callIconSolid, icon2: callIcon, available: true },
        { navItem: 'Search', style: `${userStatus ? '' : 'block'}`, icon1: searchIconSolid, icon2: searchIcon, available: false },
        { navItem: 'Settings', style: `${userStatus ? '' : 'block'}`, icon1: settingsIconSolid, icon2: settingsIcon, available: true },
    ];

    useEffect(() => {
        const path = window.location.pathname.split('/')[2];
        switch (path) {
            case 'henry':
                return setSelected('henry');
            case 'shop':
                return setSelected('shop');
            case 'contact_us':
                return setSelected('contact_us');
            case 'search':
                return setSelected('search');
            case 'settings':
                return setSelected('settings');
            default:
                return setSelected('home');
        }
    }, []);

    const handleNavItemClick = (e, item) => {
        if (!item.available) {
            return;
        }
        setSelected(e.target.dataset.name);
    };

    const handleSideNavClick = (e, item) => {
        if (!item.available) {
            return;
        }

        const base_url = item.navType === 'dash' ? '/dashboard' : '/auth';

        navigate(`${base_url}/${ToSnakeCase(item.navItem)}`);

        windowWidth > 1199
            ? setDropdown(false)
            : setShowModal(false)
    }

    return (
        <div className='flex justify-between items-center gap-5'>
            <span className='desktop:w-1/10 desktop:mx-20 nav_title_text'>
                <h3 className='nav_title_text text-slate-500'>Empire</h3>
            </span>
            <span className='w-1/2 mx-5 tablet:hidden'>
                <nav className='flex justify-center items-center gap-5'>
                    {naviItems.map((item, i) => (
                        <NavItem
                            key={i}
                            navItem={item.navItem}
                            itemStyle="mx-5 truncate"
                            icon_1={item.icon1}
                            icon_2={item.icon2}
                            available={item.available}
                            style={item.style}
                            active={ToSnakeCase(item.navItem) === selected}
                            navLink={`/dashboard/${ToSnakeCase(item.navItem)}`}
                            onClick={(e) => handleNavItemClick(e, item)}
                        />
                    ))}
                </nav>
            </span>
            <span className='desktop:w-fit desktop:mx-20 relative'>
                <div
                    className={`px-5 py-1 flex justify-center items-center gap-3 rounded-md ${showModal || dropdown ? 'bg-slate-300' : ''} bg-slate-100 text-slate-500 hover:bg-slate-300 cursor-pointer transition-all relative z-10`}
                    onClick={() => {
                        windowWidth > 1199
                            ? setDropdown(prevState => !prevState)
                            : setShowModal(prevState => !prevState)
                    }}
                >
                    <img src={showModal || dropdown ? arrow_up_d : arrow_down_d} alt='more_icon' className='block tablet:hidden w-4 h-4 cursor-pointer' onClick={() => { }} />
                    <img src={navMenuIcon} alt='more_icon' className='hidden tablet:block w-4 h-4 cursor-pointer' onClick={() => { }} />
                    <p>More</p>
                </div>

                {dropdown &&
                    <div className='absolute right-0 top-10 min-w-[200px] w-full mobile:w-[90vw] bg-white rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] animate-slide_down2 mobile:animate-slide_left z-[5] flex mobile:hidden flex-col overflow-hidden'>
                        {navMenuItems.map((item, i) => (
                            <span
                                key={i}
                                onClick={item.navFunc === null
                                    ? (e) => handleSideNavClick(e, item)
                                    : item.navFunc
                                }
                                className={`flex items-center gap-3 group text-slate-500 hover:bg-slate-400 hover:text-white font-normal text-base mobile:text-xl px-5 py-[6px] mobile:py-3 transition-all cursor-pointer ${item.style}`}
                            >
                                {item.icon1 && <img src={item.icon1} alt='menu_icon' className='w-4 h-4 mobile:w-5 mobile:h-5 hidden group-hover:block' />}
                                {item.icon2 && <img src={item.icon2} alt='menu_icon' className='w-4 h-4 mobile:w-5 mobile:h-5 block group-hover:hidden' />}
                                {item.navItem}
                            </span>
                        ))}
                    </div>
                }
                {showModal && <MobileNav setShowModal={setShowModal} />}
            </span>
        </div>
    )
}

const mapStateToProps = state => ({
    user_loggedIn: state.auth.user_loggedIn
})

const mapDispatchToProps = dispatch => ({
    setUserLogStatus: (data) => dispatch(setUserLogStatus(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);