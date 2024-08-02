import React, { useEffect, useState } from 'react';
import NavItem from './NavItem';
import { ToSnakeCase } from 'components/atoms/CaseManager';

import user_placeholder from '../../../assets/svg/User_2.svg';
import cartIcon_solid from '../../../assets/svg/navIcons/shopping-cart-solid.svg';
import cartIcon_linear from '../../../assets/svg/navIcons/shopping-cart-linear.svg';

import arrow_down_d from '../../../assets/svg/arrows/arrow_dd.svg';
import arrow_up_d from '../../../assets/svg/arrows/arrow_du.svg';
import navMenuIcon from '../../../assets/svg/menu-icon.svg';

import homeIcon from '../../../assets/svg/navIcons/home_linear.svg';
import homeIconSolid from '../../../assets/svg/navIcons/home_bold.svg';
import shopIcon from '../../../assets/svg/navIcons/shop_linear.svg';
import shopIconSolid from '../../../assets/svg/navIcons/shop_bold.svg';
import searchIcon from '../../../assets/svg/navIcons/search_linear.svg';
import searchIconSolid from '../../../assets/svg/navIcons/search_bold.svg';

import sunIcon from '../../../assets/svg/sun.svg';
import moonIcon from '../../../assets/svg/moon.svg';

import contactIcon from '../../../assets/svg/navIcons/call_linear.svg';
import contactIconSolid from '../../../assets/svg/navIcons/call_bold.svg';

import { getValues } from 'services/storage';
import MobileNav from './MobileNav';
import navMenu from 'components/molecules/navMenu';
import useWindowSize from '../../atoms/WindowWidth';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserLogStatus } from '../../../redux/auth/auth.action';
import { toggleDarkMode, toggleSearchBar } from '../../../redux/app/app.action';
import { handleLogout } from 'utils';
import SearchBox from 'components/molecules/SearchBox';
import CartDropdown from 'pages/dashboard/ModalComponents/CartDropdown';
import DropdownCard from 'components/atoms/DropdownCard';
import Toggle from 'components/atoms/Toggle';
import Alert from 'components/atoms/Alert';

interface Props {
    darkMode: boolean;
    showSearch: boolean;
    loggedIn: boolean;
    authData: any;
    shopping_cart: any[];
    toggleSearchBar: () => void;
    toggleDarkMode: () => void;
}

const TopNav: React.FC<Props> = (props) => {
    const [dropdown, setDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);
    const [cartNotifyer, setCartNotifyer] = useState(false);
    const [selected, setSelected] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const currentPath = location.pathname.split('/')[2];

    const userStatus = props.loggedIn;
    const userProfileImg = props.authData?.data?.imageUrl;

    const { navMenuItems } = navMenu(userStatus, handleLogout);
    const { windowWidth } = useWindowSize();

    const navData = [
        { navItem: 'Home', action: null, style: `${userStatus ? 'hidden' : 'flex'}`, icon1: homeIconSolid, icon2: homeIcon, available: true },
        { navItem: 'Shop', action: null, style: `${userStatus ? 'flex' : 'hidden'}`, icon1: shopIconSolid, icon2: shopIcon, available: true },
        { navItem: 'Contact Us', action: null, style: 'flex', icon1: contactIconSolid, icon2: contactIcon, available: true },
        { navItem: 'Search', action: () => props.toggleSearchBar(), style: 'flex', icon1: searchIconSolid, icon2: searchIcon, available: true },
    ];

    const matchedNavItem = navData.find(item => ToSnakeCase(item.navItem) === currentPath);

    useEffect(() => {
        if (matchedNavItem) {
            const matched = ToSnakeCase(matchedNavItem.navItem);
            setSelected(matched);
        } else {
            setSelected(userStatus ? 'shop' : 'home');
        }
    }, [currentPath]);

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

        if (windowWidth > 1199) {
            setDropdown(false);
        } else {
            setShowModal(false);
        }
    };

    useEffect(() => {
        if (props.showSearch) navigate(`/dashboard/home`);
    }, [props.showSearch]);

    useEffect(() => {
        if (showCartModal) {
            setShowModal(false);
            setDropdown(false);
        }
        if (showModal) {
            setShowCartModal(false);
            setDropdown(false);
        }
        if (dropdown) {
            setShowModal(false);
            setShowCartModal(false);
        }
    }, [showCartModal, showModal, dropdown]);

    useEffect(() => {
        setCartNotifyer(true);

        setTimeout(() => {
            setCartNotifyer(false);
            if (props.shopping_cart.length > 0) Alert('success', 'Added Successfully', props.darkMode);
        }, 1000);
    }, [props.shopping_cart]);

    return (
        <div className={`relative z-[25] flex justify-between items-center gap-5 ${props.showSearch ? 'px-5 py-4' : 'p-5'}`}>
            <div className='desktop:w-1/10 desktop:mx-20 nav_title_text cursor-pointer flex items-center gap-3' onClick={() => navigate(`/dashboard/${userStatus ? 'shop' : 'home'}`)}>
                <span className='flex-shrink-0 flex-grow-0 w-10 h-10'>
                    <img src={userStatus
                        ? userProfileImg
                            ? userProfileImg
                            : user_placeholder
                        : user_placeholder}
                        alt='user_profile' className='w-full h-full object-cover object-center object-fit rounded-full' />
                </span>
                <p className='nav_title_text text-Primary !font-bold !text-lg'>Empire</p>
            </div>

            <span className='desktop:max-w-3/4 desktop:w-full w-fit desktop:mx-20 flex justify-end items-center gap-5'>
                {props.showSearch ? (
                    <SearchBox
                        showSearch={props.showSearch}
                        setShowSearch={props.toggleSearchBar}
                        layout={`${props.showSearch ? 'flex' : 'hidden tablet:flex'} w-2/5 tablet:w-full`}
                    />
                ) : (
                    <span className='flex-shrink-0 hidden tablet:flex justify-center items-center' onClick={() => props.toggleSearchBar()}>
                        <img src={searchIcon} alt='search-box' className='w-4 h-4' />
                    </span>
                )}

                <img src={props.darkMode ? moonIcon : sunIcon} alt='weather_icon' className={`${props.showSearch ? 'mobile:hidden block' : 'block'} w-5 h-5 cursor-pointer`} onClick={props.toggleDarkMode} />

                <div className='desktop:relative  ml-8 mobile:ml-0 mr-0' onClick={() => setShowCartModal(prevState => !prevState)}>
                    <div className={`${props.showSearch ? 'mobile:hidden flex' : 'flex'} group items-center gap-2 group transition ease-in-out duration-250 cursor-pointer ${props.darkMode ? 'bg-Primary_600 hover:bg-Primary_700' : 'bg-slate-100 hover:bg-Primary_300'} py-1 px-5 rounded-md`} >
                        <span className={`${cartNotifyer ? 'w-[24px] h-[24px] text-Accent_blue font-bold text-base mobile:text-sm' : 'w-5 h-5 text-Primary font-semibold text-sm mobile:text-xs'} rounded-full !bg-NoColor flex justify-center items-center`}>
                            {props.shopping_cart.length}
                        </span>
                        <span className='flex-shrink-0'>
                            <img src={cartIcon_linear} alt='cart-icon' className='block group-hover:hidden w-6 h-6 transition ease-in-out duration-250' />
                            <img src={cartIcon_solid} alt='cart-icon' className='hidden group-hover:block w-6 h-6 transition ease-in-out duration-250' />
                        </span>

                        {showCartModal && <CartDropdown setShowCartModal={setShowCartModal} />}
                    </div>
                </div>

                <nav className='flex justify-center items-center gap-5 flex-shrink-0 tablet:hidden'>
                    {navData.map((item, i) => (
                        <NavItem
                            key={i}
                            navItem={item.navItem}
                            itemStyle="truncate"
                            icon_1={item.icon1}
                            icon_2={item.icon2}
                            available={item.available}
                            style={item.style}
                            active={ToSnakeCase(item.navItem) === selected}
                            navLink={`/dashboard/${ToSnakeCase(item.navItem)}`}
                            onClick={(e) => handleNavItemClick(e, item)}
                            action={item.action}
                        />
                    ))}
                </nav>
                <div className='w-fit relative'>
                    <div
                        className={`${props.darkMode ? `${showModal || dropdown && '!bg-PrimaryActive'} bg-Primary_600 text-Primary hover:bg-Primary_Accents_sm` : `${showModal || dropdown && '!bg-slate-300'} bg-slate-100 text-slate-500 hover:bg-slate-300`} px-5 py-1 flex justify-center items-center flex-shrink-0 gap-3 rounded-md cursor-pointer transition ease-in-out duration-250 relative z-10`}
                        onClick={() => {
                            if (windowWidth > 1199) {
                                setDropdown(true);
                            } else {
                                setShowModal(true);
                            }
                        }}
                    >
                        <img src={showModal || dropdown ? arrow_up_d : arrow_down_d} alt='more_icon' className='block tablet:hidden w-4 h-4 cursor-pointer' />
                        <img src={navMenuIcon} alt='more_icon' className='hidden tablet:block w-4 h-4 cursor-pointer' />
                        <p>More</p>
                    </div>

                    {dropdown &&
                        <DropdownCard
                            handleClickOut={setDropdown}
                            cardLayout={`${props.darkMode ? 'bg-Primary_800' : 'bg-white'} absolute right-0 top-10 min-w-[200px] w-full mobile:w-[90vw] rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] animate-slide_down2 mobile:animate-slide_left z-[5] flex mobile:hidden flex-col overflow-hidden`}
                        >
                            {navMenuItems.map((item, i) => (
                                <span
                                    key={i}
                                    onClick={item.navFunc === null ? (e) => handleSideNavClick(e, item) : item.navFunc}
                                    className={`${props.darkMode ? 'text-slate-500 hover:text-white hover:bg-Primary_Accents_xs' : 'text-PrimaryActive hover:bg-Primary_Accents_xl hover:text-white'} flex items-center gap-3 group font-normal text-base mobile:text-xl px-5 py-[6px] mobile:py-3 transition-all cursor-pointer ${item.style}`}
                                >
                                    {item.icon1 && <img src={item.icon1} alt='menu_icon' className='w-4 h-4 mobile:w-5 mobile:h-5 hidden group-hover:block' />}
                                    {item.icon2 && <img src={item.icon2} alt='menu_icon' className='w-4 h-4 mobile:w-5 mobile:h-5 block group-hover:hidden' />}
                                    {item.navItem}
                                </span>
                            ))}
                        </DropdownCard>
                    }
                </div>
                {showModal && <MobileNav setShowModal={setShowModal} />}
            </span>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    darkMode: state.app.darkMode,
    showSearch: state.app.search_status,
    loggedIn: state.auth?.user_loggedIn,
    authData: state.auth?.user_authData,
    shopping_cart: state.app?.shopping_cart || []
});

const mapDispatchToProps = (dispatch: any) => ({
    toggleSearchBar: () => dispatch(toggleSearchBar()),
    setUserLogStatus: (data) => dispatch(setUserLogStatus(data)),
    toggleDarkMode: () => dispatch(toggleDarkMode())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);