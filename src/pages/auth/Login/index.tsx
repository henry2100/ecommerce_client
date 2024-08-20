import React, { useState } from 'react';
import loginImg from '../../../assets/images/img-6.png';
import FormInput from 'components/atoms/FormInput';
import userIcon from '../../../assets/svg/user_profile.svg';
import showIcon from '../../../assets/svg/show.svg';
import hideIcon from '../../../assets/svg/hide.svg';
import Button from 'components/atoms/Button';
import { BASE_URL, getRequest, postRequest, putRequest } from 'services/http';
import Alert from 'components/atoms/Alert';
import Spinner from 'components/atoms/Spinner';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { storeUserData, setUserLogStatus } from '../../../redux/auth/auth.action';
import { updateCartFromDb } from '../../../redux/app/app.action';
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

    const updateCart = async (cartId: string, token: string, reqData: any) => {
        const res = await putRequest(`${BASE_URL}cart/update/${cartId}`, {
            ...headers,
            'Authorization': `Bearer ${token}`
        }, reqData);
        
        if (res?.status === 200) {
            setLoading(false);
            props.updateCartFromDb(res?.data.data.products);
        } else {
            setLoading(false);
            Alert('error', res?.data.message);
        }
    }

    const getUserCart = async (cartId:string, token:string) => {
        const res = await getRequest(`${BASE_URL}cart/fetch/${cartId}`, {
            ...headers,
            'Authorization': `Bearer ${token}`
        })

        console.log('User Cart:', res);

        if(res?.status === 2000){
            setLoading(false);
            props.updateCartFromDb(res?.data.data.products);
        }else{
            setLoading(false);
            Alert('error', res?.data.message);
        }
    }

    const verifyUser = async (reqData: any) => {
        setLoading(true);
        const res = await postRequest(`${BASE_URL}users/user/login`, headers, reqData);

        if (res?.status === 200) {
            Alert('success', res?.data.message, props.darkMode);

            props.storeUserData({ ...props.user_authData, ...res?.data });
            props.setUserLogStatus(true);

            // if (props.shopping_cart.length > 0) {
                const reqData = {
                    userId: res?.data.data._id,
                    products: props.shopping_cart
                }

                updateCart(res?.data.data.cartId, res?.data.token.accessToken, reqData)
            // }else{
                // getUserCart(res?.data.data.cartId, res?.data.token.accessToken);
            // }

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
        <div className={`${props.darkMode ? 'bg-Primary_700' : 'bg-Background1'} shadow-2xl flex mobile:flex-col-reverse desktop:max-w-[40vw] max-w-[60vw] mobile:max-w-[100vw] mobile:w-[70vw] desktop:rounded-2xl rounded-xl overflow-hidden`}>
            <span className='desktop:w-1/2 w-2/5 mobile:w-full mobile:h-[50px] overflow-hidden'>
                <img src={loginImg} alt='loginImg' className='w-full h-full object-center object-cover scale-105' />
            </span>
            <form onSubmit={handleSubmit} className={`${props.darkMode ? 'bg-Primary_700' : 'bg-Background1'} desktop:w-1/2 w-3/5 mobile:w-full  flex flex-col justify-evenly gap-5 p-5`}>
                <div className='flex justify-center items-center'>
                    <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-Primary'} text-2xl font-bold`}>Login</p>
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
                    // btnStyle={`px-5 py-2 w-full font-bold text-lg mobile:text-sm text-white bg-Primary ${!disableBtn && 'hover:bg-Primary_Accents_3xl'}`}
                    btnStyle={`${props.darkMode ? 'bg-Primary_800 text-Primary' : 'bg-SecondaryAccent5 text-Primary'} hover:bg-Primary_Accents_md w-full mobile:w-full relative right-0 top-0 z-[22] mb-0 text-sm !rounded-lg truncate flex gap-4 justify-center items-center px-5 py-2 font-normal text-base leading-7 rounded-lg truncate transition ease-in-out duration-250`}
                    disabled={disableBtn}
                    disabledClass={`${disableBtn && 'cursor-not-allowed !text-GrayCustom2 bg-PrimaryDisabled'}`}
                />

                <div className='flex flex-col gap-1 justify-center items-center'>
                    <p className={`${props.darkMode ? 'text-Primary_200' : 'text-SecondaryAccent6'} font-normal text-sm mobile:xs`}>No account yet?
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
    darkMode: state.app.darkMode,
    user_loggedIn: state.auth.user_loggedIn,
    user_authData: state.auth.user_authData,
    shopping_cart: state.app?.shopping_cart || []
});

const mapDispatchToProps = dispatch => ({
    storeUserData: (data) => dispatch(storeUserData(data)),
    setUserLogStatus: (data) => dispatch(setUserLogStatus(data)),
    updateCartFromDb: (data) => dispatch(updateCartFromDb(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);