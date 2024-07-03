import React, { useState } from 'react';
import loginImg from '../../../assets/images/img-6.png';
import userIcon from '../../../assets/svg/user_profile.svg';
import FormInput from 'components/atoms/FormInput';
import Button from 'components/atoms/Button';
import Spinner from 'components/atoms/Spinner';
import { useNavigate } from 'react-router';
import { BASE_URL, postRequest } from 'services/http';
import Alert from 'components/atoms/Alert';

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const disableBtn = email === '' || loading;

    const requestResetToken = async (reqData:any) => {
        setLoading(true);
        const res = await postRequest(`${BASE_URL}users/user/reset_password`, {
            "Content-Type": "application/json"
        }, reqData);

        console.log("ResetToken_res:", res);

        if (res?.status === 200) {
            setLoading(false);
            Alert('success', res?.data.message);
        }else{
            setLoading(false);
            // Alert('error', 'Something went wrong');
        }
    }

    const handleSubmit = e => { 
        e.preventDefault();

        requestResetToken({email: email});
    }

    return (
        <div className='bg-Background1 shadow-2xl flex mobile:flex-col-reverse desktop:max-w-[40vw] max-w-[60vw] mobile:max-w-[100vw] mobile:w-[70vw] desktop:rounded-2xl rounded-xl overflow-hidden'>
            <span className='desktop:w-1/2 w-2/5 mobile:w-full mobile:h-[50px] overflow-hidden'>
                <img src={loginImg} alt='loginImg' className='w-full h-full object-center object-cover scale-105' />
            </span>
            <form onSubmit={handleSubmit} className='desktop:w-1/2 w-3/5 mobile:w-full  flex flex-col justify-evenly gap-5 p-5'>
                <div className='flex justify-center items-center'>
                    <p className='text-2xl font-bold'>Forgot Password</p>
                </div>

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

                <Button
                    btnType='submit'
                    btnText={loading
                        ? <Spinner
                            text='Loading...'
                            textStyle='font-bold text-lg mobile:text-sm text-white'
                        />

                        : 'Request reset link'
                    }
                    btnStyle={`px-5 py-2 w-full font-bold text-lg mobile:text-sm text-white bg-Primary ${!disableBtn && 'hover:bg-Primary_Accents_3xl'}`}
                    disabled={disableBtn}
                    disabledClass={`${disableBtn && 'cursor-not-allowed !text-GrayCustom2 bg-PrimaryDisabled'}`}
                />

                <div className='flex justify-center items-center'>
                    <p className='font-normal text-sm mobile:xs text-SecondaryAccent6'>Remembered Password?
                        <span
                            className='font-semibold text-Primary hover:underline cursor-pointer ml-1'
                            onClick={() => navigate('/auth/login')}
                        >
                            Login
                        </span>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword