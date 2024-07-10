import React, { useEffect, useState } from 'react';
import NavItem from './NavItem';
import { ToSnakeCase } from 'components/atoms/CaseManager';

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

import { getValues } from 'services/storage';
import MobileNav from './MobileNav';
import navMenu from 'components/molecules/navMenu';
import useWindowSize from '../../atoms/WindowWidth';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserLogStatus } from '../../../redux/auth/auth.action';
import { toggleSearchBar } from '../../../redux/app/app.action';
import { handleLogout } from 'utils';
import SearchBox from 'components/molecules/SearchBox';
import CartModal from 'components/molecules/CartModal';

interface Props {
    darkMode: boolean;
    showSearch: boolean;
    loggedIn: boolean;
    authData: any;
    shopping_cart: any[];
    toggleSearchBar: () => void;
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

    const { navMenuItems } = navMenu(userStatus, handleLogout);
    const { windowWidth } = useWindowSize();

    const navData = [
        { navItem: 'Home', action: null, style: `${userStatus ? 'hidden' : 'block'}`, icon1: homeIconSolid, icon2: homeIcon, available: true },
        { navItem: 'Shop', action: null, style: `${userStatus ? 'block' : 'hidden'}`, icon1: shopIconSolid, icon2: shopIcon, available: true },
        { navItem: 'Search', action: () => props.toggleSearchBar(), style: 'block', icon1: searchIconSolid, icon2: searchIcon, available: true },
        // { navItem: 'Contact Us', action: null, style: `${userStatus ? '' : 'block'}`, icon1: callIconSolid, icon2: callIcon, available: true },
        // { navItem: 'Settings', action: null, style: `${userStatus ? '' : 'block'}`, icon1: settingsIconSolid, icon2: settingsIcon, available: true },
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
        navigate(`/dashboard/${props.loggedIn ? 'shop' : 'home'}`);
    }, [props.showSearch]);

    useEffect(() => {
        if(showCartModal){
            setShowModal(false);
            setDropdown(false);
        }
        if(showModal) {
            setShowCartModal(false);
            setDropdown(false);
        }
        if(dropdown){
            setShowModal(false);
            setShowCartModal(false);
        }
    }, [showCartModal, showModal, dropdown]);

    useEffect(()=>{
        setCartNotifyer(true);

        setTimeout(() => setCartNotifyer(false), 1000);
    }, [props.shopping_cart.length]);

    return (
        <div className={`relative z-[25] flex justify-between items-center gap-5 ${props.showSearch ? 'px-5 py-[11.5px]' : 'p-5'}`}>
            <span className='desktop:w-1/10 desktop:mx-20 nav_title_text cursor-pointer' onClick={() => navigate(`/dashboard/${userStatus ? 'shop' : 'home'}`)}>
                <h3 className='nav_title_text text-slate-500'>Empire</h3>
            </span>

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

                <div className={`${props.showSearch ? 'tablet:hidden flex' : 'flex'} group items-center gap-3 group transition ease-in-out duration-250 cursor-pointer ml-8 mobile:ml-0 mr-0 bg-slate-100 hover:bg-Primary_300 px-3 py-1 rounded-md`}
                    onClick={() => setShowCartModal(prevState => !prevState)}
                >
                    <span className={`${cartNotifyer ? 'w-[22px] h-[22px] text-Accent_blue font-bold text-sm' : 'w-5 h-5 text-Primary font-semibold text-xs'} rounded-full bg-Primary_200 group-hover:bg-white text-Primary group-hover:text-PrimaryActive flex justify-center items-center`}>
                        {props.shopping_cart.length}
                    </span>
                    <span>
                        <img src={cartIcon_linear} alt='cart-icon' className='block group-hover:hidden w-7 h-7 transition ease-in-out duration-250' />
                        <img src={cartIcon_solid} alt='cart-icon' className='hidden group-hover:block w-7 h-7 transition ease-in-out duration-250' />
                    </span>
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
                        className={`px-5 py-1 flex justify-center items-center flex-shrink-0 gap-3 rounded-md ${showModal || dropdown ? 'bg-slate-300' : ''} bg-slate-100 text-slate-500 hover:bg-slate-300 cursor-pointer transition-all relative z-10`}
                        onClick={() => {
                            if (windowWidth > 1199) {
                                setDropdown(prevState => !prevState);
                            } else {
                                setShowModal(prevState => !prevState);
                            }
                        }}
                    >
                        <img src={showModal || dropdown ? arrow_up_d : arrow_down_d} alt='more_icon' className='block tablet:hidden w-4 h-4 cursor-pointer' />
                        <img src={navMenuIcon} alt='more_icon' className='hidden tablet:block w-4 h-4 cursor-pointer' />
                        <p>More</p>
                    </div>

                    {dropdown && (
                        <div className='absolute right-0 top-10 min-w-[200px] w-full mobile:w-[90vw] bg-white rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] animate-slide_down2 mobile:animate-slide_left z-[5] flex mobile:hidden flex-col overflow-hidden'>
                            {navMenuItems.map((item, i) => (
                                <span
                                    key={i}
                                    onClick={item.navFunc === null ? (e) => handleSideNavClick(e, item) : item.navFunc}
                                    className={`flex items-center gap-3 group text-slate-500 hover:bg-slate-400 hover:text-white font-normal text-base mobile:text-xl px-5 py-[6px] mobile:py-3 transition-all cursor-pointer ${item.style}`}
                                >
                                    {item.icon1 && <img src={item.icon1} alt='menu_icon' className='w-4 h-4 mobile:w-5 mobile:h-5 hidden group-hover:block' />}
                                    {item.icon2 && <img src={item.icon2} alt='menu_icon' className='w-4 h-4 mobile:w-5 mobile:h-5 block group-hover:hidden' />}
                                    {item.navItem}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                {showModal && <MobileNav setShowModal={setShowModal} />}
                {showCartModal && <CartModal setShowCartModal={setShowCartModal}/>}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);