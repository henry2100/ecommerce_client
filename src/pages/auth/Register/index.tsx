import React, { useEffect, useState } from 'react';
import loginImg from '../../../assets/images/img-6.png';
import FormInput from 'components/atoms/FormInput';
import showIcon from '../../../assets/svg/show.svg';
import hideIcon from '../../../assets/svg/hide.svg';
import Button from 'components/atoms/Button';
import { BASE_URL, postRequest } from 'services/http';
import Alert from 'components/atoms/Alert';
import Spinner from 'components/atoms/Spinner';
import { useNavigate } from 'react-router';
import Dropzone from 'components/atoms/Dropzone';
import DropzoneIcon from '../../../assets/svg/folder.svg'
import CloudinaryUpload from 'components/atoms/CloudinaryUpload';
import UploadFile from 'components/molecules/Uploader';
import arrowUp from '../../../assets/svg/arrows/arrow_du.svg';
import arrowDown from '../../../assets/svg/arrows/arrow_dd.svg';
import countryList from '../../../data/countryList';
import { inputNum, passwordRegex, specialChar } from 'utils';
import { connect } from 'react-redux';
import DropdownCard from 'components/atoms/DropdownCard';

const acceptedFileExt = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpeg'],
    'image/jpg': ['.jpg'],
    'text/pdf': ['.pdf']
}

const userRoleType = [
    { label: 'buyer' },
    { label: 'seller' }
]

const Register = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [userProfileImg, setUserProfileImg] = useState<any>([]);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const [userType, setUserType] = useState('');
    const [selectRoleDropdown, setSelectRoleDropdown] = useState(false);

    const [email, setEmail] = useState('');
    const [countryInput, setCountryInput] = useState('');
    const [country, setCountry] = useState<any>([]);
    const [countryDropdown, setCountryDropdown] = useState(false);
    const [uploadedImgRes, setUploadedImgRes] = useState<any>({});

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [passwdStatus, setPasswdStatus] = useState(false);
    const [passwdValid, setPasswdValid] = useState(false);

    const [confirmPasswdStatus, setConfirmPasswdStatus] = useState(false);
    const [passwdConfirmed, setPasswdConfirmed] = useState(false);

    const userId = email.split('@')[0];

    const navigate = useNavigate();

    const formComplete = firstname !== '' || lastname !== '' || userType !== '' || email !== '' || country !== '' || password !== '' || confirmPassword !== '';

    const disableBtn = !formComplete || loading;

    const headers = {
        "Content-Type": "application/json"
    }

    const addressReqData = {
        street: '',
        city: '',
        state: ''
    }

    const settlementReqData = {
        bankName: '',
        bankCode: '',
        accountNumber: '',
        accountName: ''
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setPasswdStatus(true);

        if (inputNum.test(e.target.value) || specialChar.test(e.target.value)) {
            setPasswdValid(true);
        } else {
            setPasswdValid(false);
        }

        if (passwdValid) {
            setTimeout(() => setPasswdStatus(false), 5000);
        } else {
            setTimeout(() => setPasswdStatus(false), 3000);
        }
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);

        if (e.target.value === password) {
            setPasswdConfirmed(true);
        } else {
            setPasswdConfirmed(false);
            setConfirmPasswdStatus(true);
        }

        if (passwdConfirmed) {
            setTimeout(() => setConfirmPasswdStatus(false), 5000);
        } else {
            setTimeout(() => setConfirmPasswdStatus(false), 3000);
        }
    }

    const verifyUser = async (reqData: any) => {
        const res = await postRequest(`${BASE_URL}users/user/add`, headers, reqData);

        if (res?.status === 200) {
            setLoading(false);
            Alert('success', res?.data.message, props.darkMode);

            setTimeout(() => {
                Alert('info', 'You should update you profile picture after Successful Login');
                navigate('/auth/login');
            }, 2000);
        } else {
            res?.data.message !== undefined && Alert('error', res?.data.message, props.darkMode);
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        const reqData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: email,
            password: confirmPassword,
            country: country,
            role: userType,
            imageUrl: '',
            address: addressReqData,
            settlementInfo: settlementReqData,
        }

        if (formComplete) {
            if (passwdValid) {
                if (passwdConfirmed) {

                    if (userProfileImg.length > 0) {
                        try {
                            const uploadPromises = userProfileImg.map(file => UploadFile(file, userId, props.darkMode));
                            const uploadResult = await Promise.all(uploadPromises);

                            console.log("uploadResult:", uploadResult);

                            const imageUrl = uploadResult[0].url

                            verifyUser({ ...reqData, imageUrl: imageUrl });
                        } catch (error) {
                            Alert('error', 'Error uploading your profile image', props.darkMode);
                        }
                    } else {
                        verifyUser(reqData);
                    }
                } else {
                    setLoading(false);
                    Alert('error', 'Password does not match', props.darkMode);

                    setTimeout(() => {
                        setPassword('');
                        setConfirmPassword('');
                    }, 1000);
                }
            } else {
                setLoading(false);
                Alert('error', 'Password must have at least one digit or special character to be more secure', props.darkMode);
            }
        } else {
            setLoading(false);
            Alert('error', 'All fields are required');
        }
    }

    const filteredCountries = countryList.filter(country => {
        if (country.country.toLowerCase().includes(countryInput.toLowerCase())) {
            return country;
        } else {
            return;
        }
    })

    return (
        <div className={`relative ${props.darkMode ? 'bg-Primary_700' : 'bg-Background1'} shadow-2xl flex mobile:flex-col-reverse desktop:max-w-[40vw] max-w-[60vw] mobile:max-w-[100vw] mobile:w-[80vw] desktop:rounded-2xl rounded-xl`}>
            <span className='desktop:w-1/4 w-2/5 mobile:w-full mobile:h-[50px] overflow-hidden desktop:rounded-l-2xl rounded-b-xl'>
                <img src={loginImg} alt='loginImg' className='w-full h-full object-center object-cover scale-105' />
            </span>

            <form onSubmit={handleSubmit} className='desktop:w-3/4 w-3/5 mobile:w-full  flex flex-col justify-evenly gap-5 p-5'>
                <div className='flex justify-center items-center'>
                    <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-Primary'} text-2xl font-bold`}>Create Account</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='flex mobile:flex-col items-center gap-3'>
                        <FormInput
                            type='text'
                            name='firstname'
                            placeholder="Firstname"
                            style='w-1/2 mobile:w-full'
                            inputStyle="border border-transparent text-Black2 w-full"
                            label="Firstname"
                            labelStyle="font-normal text-sm leading-6 text-Black2"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />

                        <FormInput
                            type='text'
                            name='lastname'
                            placeholder="Lastname"
                            style='w-1/2 mobile:w-full'
                            inputStyle="border border-transparent text-Black2 w-full"
                            label="Lastname"
                            labelStyle="font-normal text-sm leading-6 text-Black2"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>

                    <div className='flex mobile:flex-col items-center gap-3'>
                        <Dropzone
                            className='p-2 border border-PrimaryActive rounded-md border-dashed bg-Primary_200'
                            text='Drop your file here or choose file'
                            textStyle='font-normal text-sm text-PrimaryActive'
                            label="Profile Image"
                            labelStyle="font-normal text-sm leading-6 text-Black2"
                            style='w-3/5 tablet:w-full'
                            acceptedExt={acceptedFileExt}
                            file={userProfileImg}
                            setFile={setUserProfileImg}
                        />

                        <div className={`relative z-[22] w-2/5 tablet:w-full flex flex-col ${userType !== '' ? 'text-PrimaryActive' : 'text-Primary'}`}>
                            <label className={`font-normal text-sm leading-6 ${props.darkMode ? 'text-Primary' : 'text-PrimaryActive'} mb-2`}>
                                Select Role
                            </label>
                            <div className={`relative z-20 w-full ${props.darkMode ? 'bg-Primary_600 !border-none text-Primary_200' : 'bg-white'} cursor-pointer border rounded-md flex items-center p-2`}
                                onClick={() => setSelectRoleDropdown(prevState => !prevState)}
                            >
                                <div className={`${userType !== ''
                                    ? props.darkMode 
                                        ? 'text-Primary_200' : 'text-PrimaryActive'
                                    : 'text-Primary'
                                    } flex gap-3 items-center overflow-x-scroll custom_container w-[90%]`}
                                >
                                    {userType !== '' ? userType : 'Select Role'}
                                </div>
                                <img
                                    src={selectRoleDropdown ? arrowUp : arrowDown}
                                    alt='arrow-icon'
                                    className='absolute right-3 w-4 h-4'
                                />
                            </div>
                            {selectRoleDropdown &&
                                <DropdownCard
                                    handleClickOut={setSelectRoleDropdown}
                                    cardLayout={`${props.darkMode ? 'bg-Primary_800' : 'bg-white'} min-w-[150px] max-w-3/5 w-fit max-h-[200px] overflow-scroll flex flex-col gap-0 absolute z-10 right-0 top-20 rounded-md custom_container shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-fit animate-slide_down2`}
                                >
                                    {userRoleType?.map((item, i) => (
                                        <span key={i}
                                            onClick={() => {
                                                setUserType(item.label);
                                                setSelectRoleDropdown(false);
                                            }}
                                            className={`${props.darkMode ? 'text-slate-500 hover:text-white' : 'text-Primary hover:text-PrimaryActive'} hover:bg-Primary_Accents_xs cursor-pointer font-normal text-sm leading-6 p-2`}
                                        >
                                            {item.label}
                                        </span>
                                    ))}
                                </DropdownCard>
                            }
                        </div>
                    </div>

                    <div className='flex mobile:flex-col items-center gap-3'>
                        <FormInput
                            type='text'
                            placeholder="example@gmail.com"
                            style='w-3/5 mobile:w-full'
                            inputStyle="border border-transparent text-Black2"
                            label="Email Address"
                            labelStyle="font-normal text-sm leading-6 text-Black2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className={`w-2/5 mobile:w-full relative z-[15] cursor-pointer`}>
                            <FormInput
                                type="text"
                                placeholder='Select Country'
                                style={`w-full relative z-[12]`}
                                inputStyle="border border-transparent text-Black2 w-full bg-white"
                                label="Select Country"
                                labelStyle="font-normal text-sm leading-6 text-Black2"
                                inputStyle2='disabled cursor-pointer'
                                value={countryInput}
                                onChange={e => {
                                    setCountryInput(e.target.value);

                                    if (e.target.value.length > 0) {
                                        setCountryDropdown(true);
                                    }
                                }}
                                img={
                                    countryDropdown
                                        ? arrowUp
                                        : arrowDown
                                }
                                imgStyle={`w-4 h-4 cursor-pointer`}
                                imgOnClick={() => setCountryDropdown(prevState => !prevState)}
                            />
                            {countryDropdown &&
                                <div className={`min-w-[150px] w-3/4 max-h-[200px] overflow-scroll flex flex-col gap-0 absolute z-10 right-0 p-1 bg-white rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-fit animate-slide_down2`}>
                                    {filteredCountries?.length === 0
                                        ? <span className='cursor-default font-normal text-sm leading-6 text-Danger rounded-md p-2 hover:bg-BackDrop_d_xs'>
                                            Not found
                                        </span>

                                        : filteredCountries?.map((item, i) => (
                                            <span
                                                key={i}
                                                onClick={() => {
                                                    setCountry(item);
                                                    setCountryInput(item.country)
                                                    setCountryDropdown(false);
                                                }} className='cursor-pointer font-normal text-sm leading-6 text-Black2 rounded-md p-2 hover:bg-BackDrop_d_xs'>
                                                {item.country}
                                            </span>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    </div>

                    <div className='flex mobile:flex-col items-center gap-3'>
                        <FormInput
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            placeholder="xxxxxx"
                            style='w-1/2 mobile:w-full'
                            inputStyle="border border-transparent text-Black2 w-full"
                            label="Password"
                            labelStyle="font-normal text-sm leading-6 text-Black2"
                            img={showPassword ? showIcon : hideIcon}
                            imgOnClick={() => setShowPassword(prevState => !prevState)}
                            imgStyle='w-4 h-4'
                            value={password}
                            onChange={handlePassword}
                            indicatorStyle={`${passwdStatus && passwdValid ? '!border-Success bg-Success' : passwdStatus && !passwdValid ? '!border-Danger bg-Danger' : ''}`}
                        />

                        <FormInput
                            type={showConfirmPassword ? 'text' : 'password'}
                            name='confirm_password'
                            placeholder="xxxxxx"
                            style='w-1/2 mobile:w-full'
                            inputStyle="border border-transparent text-Black2 w-full"
                            label="Confirm Password"
                            labelStyle="font-normal text-sm leading-6 text-Black2"
                            img={showConfirmPassword ? showIcon : hideIcon}
                            imgOnClick={() => setShowConfirmPassword(prevState => !prevState)}
                            imgStyle='w-4 h-4'
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            indicatorStyle={`${confirmPasswdStatus && passwdConfirmed ? '!border-Success bg-Success' : confirmPasswdStatus && !passwdConfirmed ? '!border-Danger bg-Danger' : ''}`}
                        />
                    </div>
                </div>

                <Button
                    btnType='submit'
                    btnText={loading
                        ? <Spinner
                            text='Loading...'
                            textStyle='font-bold text-lg mobile:text-sm text-white'
                        />

                        : 'Create Account'
                    }
                    btnStyle={`px-5 py-2 w-full font-bold text-lg mobile:text-sm text-white bg-Primary ${!disableBtn && 'hover:bg-Primary_Accents_3xl'}`}
                    disabled={disableBtn}
                    disabledClass={`${disableBtn && 'cursor-not-allowed !text-Primary bg-PrimaryDisabled'}`}
                />

                <div className='flex flex-col gap-1 justify-center items-center'>
                    <p className='font-normal text-sm mobile:xs text-SecondaryAccent6'>Already have an Account?
                        <span
                            className='font-semibold text-Primary hover:underline cursor-pointer ml-1'
                            onClick={() => navigate('/auth/login')}
                        >
                            Login
                        </span>
                    </p>
                </div>
            </form>
            {userProfileImg.length > 0 &&
                <span className="w-[150px] h-[150px] mobile:w-[75px] mobile:h-[75px] rounded-lg mobile:rounded-full border-2 border-PrimaryActive overflow-hidden absolute -right-40 top-0 mobile:-top-20 mobile:right-0 mobile:left-0 mobile:mx-auto">
                    {userProfileImg.map((item, i) => (
                        <img key={i} src={item.preview} alt='previewImg' className="w-full h-full object-cover object-center object-fit" />
                    ))}
                </span>
            }
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    darkMode: state.app.darkMode
})

export default connect(mapStateToProps, null)(Register);