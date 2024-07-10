import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { handleLogout } from '../utils';
import { setValues } from '../services/storage'
import { connect } from 'react-redux';

import Auth from '../pages/auth';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

import Dashboard from '../pages/dashboard';
import Home from '../pages/dashboard/Home';
// import Shop from '../pages/dashboard/Shop_old';
import Product from '../pages/dashboard/Product';
import ContactUs from '../pages/dashboard/ContactUs';
import Settings from '../pages/dashboard/Settings'
import Profile from '../pages/dashboard/Profile';
import AboutMe from '../pages/dashboard/Profile/AboutMe';
import OrderHistory from '../pages/dashboard/Profile/OrderHistory';
import TransactionHistory from '../pages/dashboard/Profile/TransactionHistory';
import ProfileSettings from '../pages/dashboard/Profile/ProfileSettings';
import MyProducts from '../pages/dashboard/Profile/MyProducts';
import AddProduct from '../pages/dashboard/Profile/AddProduct';

const AppRouter = (props) => {
    const userAvailable = props.user_loggedIn && props.user_authData !== null;

    useEffect(() => {
        if (!userAvailable) {
            setValues('userLoggedIn', false);
            // handleLogout();
        }else{
            setValues('userLoggedIn', true);
        }
    }, [userAvailable]);

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Navigate to='/dashboard' />} />

                <Route exact path='/dashboard' element={<Navigate to={`/dashboard/${userAvailable ? 'shop' : 'home'}`} />} />

                <Route exact path='/dashboard' element={<Dashboard />}>
                    <Route exact path='/dashboard/home' element={userAvailable ? <Navigate to='/dashboard/shop'/> : <Home />} />
                    <Route exact path='/dashboard/shop' element={userAvailable ? <Home /> : <Navigate to='/dashboard/home'/>} />
                    <Route exact path='/dashboard/profile' element={userAvailable ? <Profile /> : <Navigate to='/dashboard/home'/>}>
                        <Route exact path='/dashboard/profile' element={userAvailable ? <Navigate to='/dashboard/profile/profile'/> : <Navigate to='/dashboard/home'/>}/>
                        <Route exact path='/dashboard/profile/profile' element={userAvailable ? <AboutMe/> : <Navigate to='/dashboard/home'/>}/>
                        <Route exact path='/dashboard/profile/order_history' element={userAvailable ? <OrderHistory/> : <Navigate to='/dashboard/home'/>}/>
                        <Route exact path='/dashboard/profile/transaction_history' element={userAvailable ? <TransactionHistory/> : <Navigate to='/dashboard/home'/>}/>
                        <Route exact path='/dashboard/profile/profile_settings' element={userAvailable ? <ProfileSettings/> : <Navigate to='/dashboard/home'/>}/>
                        <Route exact path='/dashboard/profile/my_products' element={userAvailable ? <MyProducts/> : <Navigate to='/dashboard/home'/>}/>
                        <Route exact path='/dashboard/profile/add_product' element={userAvailable ? <AddProduct/> : <Navigate to='/dashboard/home'/>}/>
                    </Route>
                    {/* <Route exact path='/dashboard/product/:id' element={userAvailable ? <Product/> : <Navigate to='/dashboard/home'/>}/> */}
                    <Route exact path='/dashboard/product/:id' element={<Product/>}/>
                    <Route exact path='/dashboard/contact_us' element={<ContactUs />} />
                    <Route exact path='/dashboard/settings' element={<Settings />} />
                </Route>

                <Route exact path='/auth' element={<Auth />}>
                    <Route exact path='/auth/login' element={userAvailable ? <Navigate to='/dashboard/shop'/> : <Login />} />
                    <Route exact path='/auth/create_account' element={userAvailable ? <Navigate to='/dashboard/shop'/> : <Register />} />
                    <Route exact path='/auth/forgot_password' element={userAvailable ? <Navigate to='/dashboard/shop'/> : <ForgotPassword />} />
                </Route>
            </Routes>
        </Router>
    )
}

const mapStateToProps = state => ({
    user_loggedIn: state.auth.user_loggedIn,
    user_authData: state.auth.user_authData
});

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);