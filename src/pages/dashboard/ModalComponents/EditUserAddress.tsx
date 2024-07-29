import React, { useState } from 'react';
import AppModal from '../../../components/organisms/CustomModal';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../../redux/app/app.action';
import CartItem from 'components/atoms/CartItem';
import FormInput from 'components/atoms/FormInput';
import Button from 'components/atoms/Button';
import Spinner from 'components/atoms/Spinner';
import Alert from 'components/atoms/Alert';
import { BASE_URL, putRequest } from 'services/http';
import { storeUserData } from '../../../redux/auth/auth.action';

const EditUserAddress = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const formComplete = street !== '' || city !== '' || state !== '';
    const disableBtn = loading || !formComplete;

    const handleCancelled = () => {
        setStreet('');
        setCity('');
        setState('');
        props.setAddressModal(false);
    }

    const updateAddressFunc = async (reqData: any) => {
        setLoading(true);
        const res = await putRequest(`${BASE_URL}users/update/${props.userID}`, {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${props.accessToken}`
        }, reqData);

        if (res?.status === 200) {
            Alert('success', res?.data.message, props.darkMode);
            props.storeUserData({ ...props.authData, ...res?.data });
            handleCancelled();
            setLoading(false);
            props.setAddressModal(false);
        } else {
            res?.data.message !== undefined && Alert('error', res?.data.message);
            setLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const reqData = {
            address: {
                street: street,
                city: city,
                state: state
            }
        }

        if (formComplete) {
            updateAddressFunc(reqData);
        } else {
            Alert('error', 'Please fill all feilds', props.darkMode);
        }
    }

    return (
        <AppModal
            handleClose={() => props.setAddressModal(false)}
            modalStyle={`${props.darkMode ? 'bg-Primary_800' : 'bg-Background1'} overflow-y-scroll desktop:w-[25%] w-2/5 mobile:w-4/5 max-w-[320px] min-h-fit max-h-[600px] mobile:max-h-[80vh] h-fit z-30 right-0 left-0 top-24 mobile:top-16 mobile:right-0 mobile:left-0 mx-auto animate-slide_down2 mobile:animate-fade_in rounded-xl mobile:rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition ease-in-out duration-500`}
            backDropStyle='!bg-BackDrop_d_xl'
            contentStyle="h-fit p-5 flex flex-col gap-2"
            closeBtnStyle='hidden'
        >
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <span className={`${props.darkMode ? 'text-Primary_300' : 'text-PrimaryActive'}`}>
                    <p className={`font-semibold text-xl`}>Update Address</p>
                    <p className={`font-normal text-xs text-SecondaryAccent`}>Fill this form to complete your user profile</p>
                </span>
                <div className='flex flex-col gap-4'>
                    <FormInput
                        type='text'
                        name='street'
                        placeholder={props.authData.data.address.street !== '' ? props.authData.data.address.street : 'Enter house address'}
                        label="Street"
                        labelStyle="font-normal text-sm leading-6 text-Black2"
                        inputStyle="border border-transparent text-PrimaryActive"
                        style='w-full'
                        value={street}
                        onChange={e => setStreet(e.target.value)}
                    />

                    <FormInput
                        type='text'
                        name='city'
                        placeholder={props.authData.data.address.city !== '' ? props.authData.data.address.city : 'Enter city'}
                        label="City"
                        labelStyle="font-normal text-sm leading-6 text-Black2"
                        inputStyle="border border-transparent text-PrimaryActive"
                        style='w-full'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />

                    <FormInput
                        type='text'
                        name='state'
                        placeholder={props.authData.data.address.state !== '' ? props.authData.data.address.state : 'Enter state'}
                        label="State"
                        labelStyle="font-normal text-sm leading-6 text-Black2"
                        inputStyle="border border-transparent text-PrimaryActive"
                        style='w-full'
                        value={state}
                        onChange={e => setState(e.target.value)}
                    />
                </div>

                <div className='flex gap-5 justify-between'>
                    <Button
                        btnType='button'
                        btnText='Cancel'
                        btnStyle={`px-5 py-2 w-fit mobile:w-full font-bold text-base mobile:text-sm text-Primary bg-NoColor hover:border-none hover:shadow-none ${!disableBtn && 'hover:text-Primary_Accents_3xl'}`}
                        disabled={false}
                        onClick={handleCancelled}
                    />
                    <Button
                        btnType='submit'
                        btnText={loading
                            ? <Spinner
                                text='Loading...'
                                textStyle='font-bold text-lg mobile:text-sm text-white'
                            />

                            : 'Submit'
                        }
                        btnStyle={`${props.darkMode ? 'bg-Primary_600 hover:bg-PrimaryActive' : 'bg-Primary hover:bg-Primary_300'} px-5 py-2 w-fit mobile:w-full font-bold text-base mobile:text-sm text-white ${!disableBtn && 'hover:bg-Primary_Accents_3xl'}`}
                        disabled={disableBtn}
                        disabledClass={`${disableBtn && 'cursor-not-allowed !text-Primary bg-PrimaryDisabled'}`}
                        onClick={() => { }}
                    />
                </div>
            </form>
        </AppModal>
    )
}

const mapStateToProps = (state: any) => ({
    darkMode: state.app.darkMode,
    authData: state.auth?.user_authData,
    userID: state.auth?.user_authData.data._id,
    accessToken: state.auth?.user_authData?.token?.accessToken
});

const mapDispatchToProps = (dispatch: any) => ({
    storeUserData: (data:any) => dispatch(storeUserData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserAddress);