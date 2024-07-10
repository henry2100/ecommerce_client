import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { connect } from 'react-redux';
import Footer from 'components/organisms/Footer';
import { toggleDarkMode } from '../../redux/app/app.action';
import TopNav from '../../components/organisms/Navigation';

const Dashboard = (props) => {
    const navigate = useNavigate();

    const userAuthData = props.authData;
    const userLogStatus = props.loggedIn;

    return (
        <div className={`${props.darkMode ? 'bg-Primary_700' : 'bg-Background1'} w-full h-fit min-h-screen`}>
            <TopNav />
            <div className='flex flex-col justify-between'>
                <main className={`${props.darkMode ? 'bg-Primary_900' : 'bg-white'} min-h-screen`}>
                    <Outlet />
                </main>
                {userAuthData === null && !userLogStatus && <Footer />}
            </div>
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