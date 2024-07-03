import React from 'react';
import { getValues } from 'services/storage';

import homeIcon from '../../assets/svg/navIcons/home_linear.svg';
import homeIconSolid from '../../assets/svg/navIcons/home_bold.svg';
import shopIcon from '../../assets/svg/navIcons/shop_linear.svg';
import shopIconSolid from '../../assets/svg/navIcons/shop_bold.svg';
import callIcon from '../../assets/svg/navIcons/call_linear.svg';
import callIconSolid from '../../assets/svg/navIcons/call_bold.svg';
import searchIcon from '../../assets/svg/navIcons/search_linear.svg';
import searchIconSolid from '../../assets/svg/navIcons/search_bold.svg';
import settingsIcon from '../../assets/svg/navIcons/settings_linear.svg';
import settingsIconSolid from '../../assets/svg/navIcons/settings_bold.svg';

import logoutIcon from '../../assets/svg/navIcons/navMenuIcons/logout_linear.svg';
import logoutIconSolid from '../../assets/svg/navIcons/navMenuIcons/logout_bold.svg';
import loginIcon from '../../assets/svg/navIcons/navMenuIcons/logout_linear.svg';
import loginIconSolid from '../../assets/svg/navIcons/navMenuIcons/logout_bold.svg';
import newUserIcon from '../../assets/svg/navIcons/navMenuIcons/user_cirlce_add_linear.svg';
import newUserIconSolid from '../../assets/svg/navIcons/navMenuIcons/user_cirlce_add_bold.svg';

import userIcon from '../../assets/svg/user-black.svg';
import userIconSolid from '../../assets/svg/user-white.svg';

const navMenu = (userStatus, logoutHandler, handleLogout) => {

    const navMenuItems = [
        { navType:'dash', navFunc: null, navItem: 'Home', style: `hidden ${userStatus ? 'hidden' : 'tablet:flex'}`, icon1: homeIconSolid, icon2: homeIcon, available: true },
        { navType:'dash', navFunc: null, navItem: 'Shop', style: `hidden ${userStatus ? 'tablet:flex' : 'hidden'}`, icon1: shopIconSolid, icon2: shopIcon, available: true },
        { navType:'dash', navFunc: null, navItem: 'Search', style: `hidden tablet:flex`, icon1: searchIconSolid, icon2: searchIcon, available: false },
        { navType:'dash', navFunc: null, navItem: 'Contact Us', style: `hidden tablet:flex`, icon1: callIconSolid, icon2: callIcon, available: true },
        { navType:'dash', navFunc: null, navItem: 'Settings', style: `hidden ${userStatus ? 'tablet:flex' : 'hidden'}`, icon1: settingsIconSolid, icon2: settingsIcon, available: true },

        { navType:'dash', navFunc: null, navItem: 'Profile', style: `${userStatus ? 'block' : 'hidden'}`, icon1: userIconSolid, icon2: userIcon, available: true },
        { navType:'auth', navFunc: null, navItem: 'Create Account', style: `${userStatus ? 'hidden' : 'block'}`, icon1: newUserIconSolid, icon2: newUserIcon, available: true },
        { navType:'auth', navFunc: null, navItem: 'Login', style: `${userStatus ? 'hidden' : 'block'}`, icon1: loginIconSolid, icon2: loginIcon, available: true },
        { navType:'auth', navFunc: handleLogout, navItem: 'Log Out', style: `${userStatus ? 'block' : 'hidden'}`, icon1: logoutIconSolid, icon2: logoutIcon, available: true },
    ];

    return {navMenuItems}
}

export default navMenu;