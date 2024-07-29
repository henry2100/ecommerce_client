import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { connect } from 'react-redux';
import Footer from 'components/organisms/Footer';
import { toggleDarkMode } from '../../redux/app/app.action';
import TopNav from '../../components/organisms/Navigation';
import { getValues } from 'services/storage';
import { handleLogout } from 'utils';
import moment from 'moment';
import RefreshUserSession from './ModalComponents/RefreshUserSession';
import MobileNav from 'components/organisms/Navigation/MobileNav';

const Dashboard = (props) => {
    // const [showModal, setShowModal] = useState(false);
    // const [date, setDate] = useState(new Date());
    // const [currentTime, setCurrentTime] = useState(new Date());

    // const authToken_available = getValues('auth_token');
    // const expireAt = getValues('expiredAt');
    // const [dummy, setDummy] = useState(1721267505000);

    // useEffect(() => {
    //     if (authToken_available === null) handleLogout();
    // }, [authToken_available]);

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setCurrentTime(new Date());
    //     }, 1000);

    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, []);

    // useEffect(() => {
    //     if (expireAt) {
    //         const currentMoment = moment(currentTime);
    //         const expireMoment = moment(expireAt);

    //         if (currentMoment.isSameOrAfter(expireMoment)) {
    //             // handleLogout();
    //             setShowModal(true);
    //         }
    //     }
    // }, [currentTime, expireAt]);

    // console.log("dateTime:", {
    //   currentTime: moment(currentTime),
    //   expireAt: moment(expireAt),
    //   checkMoment: moment(currentTime).isSameOrAfter(moment(expireAt))
    // });

    const navigate = useNavigate();

    const userAuthData = props.authData;
    const userLogStatus = props.loggedIn;

    return (
        <div className={`${props.darkMode ? 'bg-Primary_800' : 'bg-Background1'} w-full h-fit min-h-screen`}>
            <TopNav />
            <div id="top"></div>
            <div className='flex flex-col justify-between'>
                
                <main className={`${props.darkMode ? 'bg-Primary_900' : 'bg-white'} min-h-screen`}>
                    <Outlet />
                </main>
                {userAuthData === null && !userLogStatus && <Footer />}
            </div>
            {/* {showModal && (
                <RefreshUserSession
                    closeModal={setShowModal}
                    setDummyDateTime={setDummy} 
                />
            )} */}
            <div id="end"></div>
        </div>
    )
}

const mapStateToProps = state => ({
    darkMode: state.app.darkMode,
    loggedIn: state.auth?.user_loggedIn,
    authData: state.auth?.user_authData
});

const mapDispatchToProps = dispatch => ({
    toggleDarkMode: () => dispatch(toggleDarkMode())
})


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);







