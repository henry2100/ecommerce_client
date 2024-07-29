import React, { useEffect, useState } from 'react'
import AppModal from '../../../components/organisms/CustomModal'
import PageTitle from 'components/atoms/PageTitle'
import Button from 'components/atoms/Button'
import { BASE_URL, postRequest } from 'services/http'
import { getValues, setValues } from 'services/storage'
import Alert from 'components/atoms/Alert'
import { handleLogout } from 'utils'
import refreshIcon from '../../../assets/svg/refresh.svg';
import logoutIcon from '../../../assets/svg/navIcons/navMenuIcons/logout_linear.svg';
import CountdownTimer from 'components/atoms/CountDown'
import { connect } from 'react-redux'

const RefreshUserSession = (props) => {
    const [loading, setLoading] = useState(false);
    const [timerCount, setTimerCount] = useState('');

    const userName = getValues('username');
    const refreshToken = getValues('refreshToken');

    const refreshTokenFunc = async (reqBody: any) => {
        setLoading(true);
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${props.bearerToken}`
        }
        const res = await postRequest(`${BASE_URL}auth/refresh-token`, { headers: headers }, reqBody);

        if (res?.data?.responseCode === '00') {

            setTimeout(() => {
                Alert('success', res?.data.message);
                setValues('auth_token', res.data.data.token.token);
                setValues('issuedAt', res.data.data.token.issuedAt);
                setValues('expiredAt', res.data.data.token.expiredAt);
                setLoading(false);
                props.closeModal(false);
            }, 1500);
        } else {
            Alert('error', res?.data.message);
            setLoading(false);
        }
    }

    const callRefresher = () => {
        const reqBody = {
            username: userName,
            refreshToken: props.refreshToken
        }

        refreshTokenFunc(reqBody);
    }

    const handleSignOut = () => {
        setLoading(true);

        setTimeout(() => {
            handleLogout();
            setLoading(false);
        }, 2000);
    }

    useEffect(() => {
        if (timerCount) handleLogout();
    }, [timerCount]);

    const timerStatus = (status: any) => setTimerCount(status);

    return (
        <AppModal
            handleClose={() => props.closeModal(false)}
            modalStyle="desktop:w-1/4 w-[45%] mobile:w-3/4 bg-white min-h-[250px] h-fit z-30 my-[10rem] mx-auto left-0 right-0 animate-slide_up rounded-lg p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all"
            contentStyle=""
        >
            <div className='flex flex-col gap-1'>
                <PageTitle
                    pageTitle='Authentication Token Expired'
                    pageTitleStyle='!mb-0 !mt-0 !truncate !text-base'
                />
                <div className='flex flex-col gap-8'>
                    <span className='font-normal text-base text-SecondaryAccent flex flex-col gap-3'>
                        <p>You are about to be Signed out of your account due to token expiration.</p>
                        <p>Do you wish to stay Signed In?</p>
                    </span>

                    <div className='flex justify-between items-center gap-5'>
                        <Button
                            btnType='button'
                            btnText="Logout"
                            btnStyle='bg-SecondaryAccent5 text-DarkBg3 !text-sm !rounded-lg truncate flex gap-4 ju4tify-center items-center px-5 py-2 font-normal text-base leading-7 rounded-lg truncate'
                            onClick={handleSignOut}
                            btnImg={logoutIcon}
                            btnImgStyle={`w-4 h-4`}
                        />
                        <Button
                            btnType='button'
                            btnText='Yes'
                            btnStyle='bg-DarkBg3 text-white !text-sm !rounded-lg truncate flex gap-4 ju4tify-center items-center px-5 py-2 font-normal text-base leading-7 rounded-lg truncate'
                            onClick={callRefresher}
                            btnImg={refreshIcon}
                            btnImgStyle={`w-4 h-4 ${loading && 'animate-fullRoll'}`}
                        />
                    </div>

                    <div className='flex gap-2 justify-center items-center text-SecondaryAccent'>
                        <p className=''>Log out in </p>
                        {timerCount 
                            ? '--:--'

                            : <CountdownTimer initialSeconds={30} timerStatus={timerStatus} style='font-semibold text-base text-Primary'/>
                        }
                    </div>
                </div>
            </div>
        </AppModal>
    )
}

const mapStateToProps = state => ({
    userData: state.auth.user_authData,
    bearerToken: state.auth.user_authData.token.token,
    refreshToken: state.auth.user_authData.token.refreshToken
})

export default connect(mapStateToProps, null)(RefreshUserSession);