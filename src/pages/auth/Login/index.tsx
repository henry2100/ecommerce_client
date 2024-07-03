import React, { useState } from 'react';
import loginImg from '../../../assets/images/img-6.png';
import FormInput from 'components/atoms/FormInput';
import userIcon from '../../../assets/svg/user_profile.svg';
import showIcon from '../../../assets/svg/show.svg';
import hideIcon from '../../../assets/svg/hide.svg';
import Button from 'components/atoms/Button';
import { BASE_URL, postRequest } from 'services/http';
import Alert from 'components/atoms/Alert';
import Spinner from 'components/atoms/Spinner';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import {storeUserData, setUserLogStatus} from '../../../redux/auth/auth.action';
import { setValues } from 'services/storage';

const Login = (props) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const formComplete = email !== '' && password !== '';
    const disableBtn = !formComplete || loading;

    const headers = {
        "Content-Type": "application/json"
    }

    const verifyUser = async (reqData: any) => {
        setLoading(true);
        const res = await postRequest(`${BASE_URL}users/user/login`, { headers: headers }, reqData);

        if (res?.status === 200) {
            setLoading(false);
            Alert('success', res?.data.message);

            props.storeUserData({...props.user_authData, ...res?.data});
            props.setUserLogStatus(true);
            navigate('/dashboard/shop');
        }

        setLoading(false);
    }

    const handleSubmit = e => {
        e.preventDefault();

        verifyUser({
            email: email,
            password: password
        });
    }

    return (
        <div className='bg-Background1 shadow-2xl flex mobile:flex-col-reverse desktop:max-w-[40vw] max-w-[60vw] mobile:max-w-[100vw] mobile:w-[70vw] desktop:rounded-2xl rounded-xl overflow-hidden'>
            <span className='desktop:w-1/2 w-2/5 mobile:w-full mobile:h-[50px] overflow-hidden'>
                <img src={loginImg} alt='loginImg' className='w-full h-full object-center object-cover scale-105' />
            </span>
            <form onSubmit={handleSubmit} className='desktop:w-1/2 w-3/5 mobile:w-full  flex flex-col justify-evenly gap-5 p-5'>
                <div className='flex justify-center items-center'>
                    <p className='text-2xl font-bold'>Login</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <FormInput
                        type='text'
                        name='email'
                        placeholder="example@gmail.com"
                        inputStyle="border border-transparent text-Black2"
                        label="Email Address"
                        labelStyle="font-normal text-sm leading-6 text-Black2"
                        img={userIcon}
                        imgStyle='w-4 h-4'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <FormInput
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder="xxxxxx"
                        inputStyle="border border-transparent text-Black2"
                        label="Password"
                        labelStyle="font-normal text-sm leading-6 text-Black2"
                        img={showPassword ? showIcon : hideIcon}
                        imgOnClick={() => setShowPassword(prevState => !prevState)}
                        imgStyle='w-4 h-4'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <Button
                    btnType='submit'
                    btnText={loading
                        ? <Spinner
                            text='Loading...'
                            textStyle='font-bold text-lg mobile:text-sm text-white'
                        />

                        : 'Login'
                    }
                    btnStyle={`px-5 py-2 w-full font-bold text-lg mobile:text-sm text-white bg-Primary ${!disableBtn && 'hover:bg-Primary_Accents_3xl'}`}
                    disabled={disableBtn}
                    disabledClass={`${disableBtn && 'cursor-not-allowed !text-GrayCustom2 bg-PrimaryDisabled'}`}
                />

                <div className='flex flex-col gap-1 justify-center items-center'>
                    <p className='font-normal text-sm mobile:xs text-SecondaryAccent6'>No account yet?
                        <span
                            className='font-semibold text-Primary hover:underline cursor-pointer ml-1'
                            onClick={() => navigate('/auth/create_account')}
                        >
                            Sign up
                        </span>
                    </p>
                    <span
                        className='text-sm mobile:xs font-semibold text-Primary hover:underline cursor-pointer ml-1'
                        onClick={() => navigate('/auth/forgot_password')}
                    >
                        Forgot Password?
                    </span>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    user_loggedIn: state.auth.user_loggedIn,
    user_authData: state.auth.user_authData
});

const mapDispatchToProps = dispatch => ({
    storeUserData: (data) => dispatch(storeUserData(data)),
    setUserLogStatus: (data) => dispatch(setUserLogStatus(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);