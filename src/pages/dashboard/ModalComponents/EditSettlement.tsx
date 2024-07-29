import React, { useEffect, useState } from 'react';
import AppModal from '../../../components/organisms/CustomModal';
import { connect } from 'react-redux';
import { storeUserData } from '../../../redux/auth/auth.action';
import FormInput from 'components/atoms/FormInput';
import Button from 'components/atoms/Button';
import Spinner from 'components/atoms/Spinner';
import { BASE_URL, postRequest, putRequest } from 'services/http';
import Alert from 'components/atoms/Alert';
import arrowUp from '../../../assets/svg/arrows/arrow_du.svg';
import arrowDown from '../../../assets/svg/arrows/arrow_dd.svg';
import { bankList } from '../../../data/bankList';
import DropdownCard from 'components/atoms/DropdownCard';

const EditSettlement = (props) => {
    const [loading, setLoading] = useState(false);
    const [loadingAcctData, setLoadingAcctData] = useState(false);
    const [bankDropdown, setBankDropdown] = useState(false);
    const [bankInput, setBankInput] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [accountNum, setAccountNum] = useState('');
    const [accountName, setAccountName] = useState('');

    const formComplete = selectedBank !== '' || accountNum !== '' || accountName !== '';
    const disableBtn = !formComplete || loading || loadingAcctData;

    const handleCancelled = () => {
        setSelectedBank('');
        setAccountNum('');
        setAccountName('');
        props.setSettlementModal(false);
    }

    const runNameEnquiryFunc = async () => {
        setLoadingAcctData(true);
        const headers = {
            "Content-Type": "application/json",
        }
        const body = {
            bankcode: selectedBank,
            accountnumber: accountNum
        }
        const res = await postRequest('https://pocket.seerbitapi.com/pocket/authenticate/name-enquiry', headers, body);

        if (res?.data?.data?.code === "00") {
            setLoadingAcctData(false);
            setAccountName(res?.data.data.cutomername);

        } else {
            setLoadingAcctData(false);
        }

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
            props.setSettlementModal(false);
        } else {
            res?.data.message !== undefined && Alert('error', res?.data.message);
            setLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const reqData = {
            settlementInfo: {
                bankName: bankInput,
                bankCode: selectedBank,
                accountNumber: accountNum,
                accountName: accountName
            }
        }

        if (formComplete) {
            updateAddressFunc(reqData);
        } else {
            Alert('error', 'Please fill all feilds', props.darkMode);
        }
    }

    useEffect(() => {
        if (selectedBank !== '' && accountNum.length === 10) runNameEnquiryFunc();
    }, [accountNum, selectedBank]);

    const filteredCountries = bankList.filter(bank => {
        if (bank.bank_name.toLowerCase().includes(bankInput.toLowerCase())) {
            return bank;
        } else {
            return;
        }
    })

    return (
        <AppModal
            handleClose={() => props.setSettlementModal(false)}
            modalStyle={`${props.darkMode ? 'bg-Primary_800' : 'bg-Background1'} overflow-y-scroll desktop:w-[25%] w-2/5 mobile:w-4/5 max-w-[320px] min-h-fit max-h-[600px] mobile:max-h-[80vh] h-fit z-30 right-0 left-0 top-24 mobile:top-16 mobile:right-0 mobile:left-0 mx-auto animate-slide_down2 mobile:animate-fade_in rounded-xl mobile:rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition ease-in-out duration-500`}
            backDropStyle='!bg-BackDrop_d_xl'
            contentStyle="h-fit p-5 flex flex-col gap-2"
            closeBtnStyle='hidden'
        >
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <span className={`${props.darkMode ? 'text-Primary_300' : 'text-PrimaryActive'}`}>
                    <p className={`font-semibold text-xl`}>Settlement Information</p>
                    <p className={`font-normal text-xs text-SecondaryAccent`}>Fill this form to update your Settlement Information</p>
                </span>
                <div className='flex flex-col gap-4'>
                    <div className={`w-full relative z-[15] cursor-pointer`}>
                        <FormInput
                            type='text'
                            placeholder={props.authData?.data?.settlementInfo?.bankName !== '' ? props.authData?.data?.settlementInfo?.bankName : 'Enter selectedBank name'}
                            label="Bank"
                            labelStyle="font-normal text-sm leading-6 text-Black2"
                            inputStyle="border border-transparent text-PrimaryActive"
                            style='w-full'
                            value={bankInput}
                            onChange={e => {
                                setBankInput(e.target.value);

                                if (e.target.value.length > 0) {
                                    setBankDropdown(true);
                                }
                            }}
                            img={
                                bankDropdown
                                    ? arrowUp
                                    : arrowDown
                            }
                            imgStyle={`w-4 h-4 cursor-pointer`}
                            imgOnClick={() => setBankDropdown(true)}
                        />
                        {bankDropdown &&
                            <DropdownCard
                                handleClickOut={setBankDropdown}
                                cardLayout={`${props.darkMode ? 'bg-Primary_700' : 'bg-white'} min-w-[150px] w-3/4 max-h-[200px] overflow-scroll flex flex-col gap-0 absolute z-10 right-0 p-1 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-fit animate-slide_down2`}
                            >
                                {filteredCountries?.length === 0
                                    ? <span className='cursor-default font-normal text-sm leading-6 text-Danger rounded-md p-2 hover:bg-BackDrop_d_xs'>
                                        Not found
                                    </span>

                                    : filteredCountries?.map((item, i) => (
                                        <span
                                            key={i}
                                            onClick={() => {
                                                setSelectedBank(item.bank_nip_code);
                                                setBankInput(item.bank_name)
                                                setBankDropdown(false);
                                            }}
                                            className={`${props.darkMode ? 'text-Primary_300 hover:text-white hover:bg-Primary_Accents_xs' : 'text-PrimaryActive hover:bg-Primary_Accents_xl hover:text-white'} flex items-center gap-3 group font-normal text-xs px-3 py-2 mobile:py-3 transition-all cursor-pointer ${item.style}`}
                                        >
                                            {item.bank_name}
                                        </span>
                                    ))
                                }
                            </DropdownCard>
                        }
                    </div>

                    <FormInput
                        type='text'
                        placeholder={props.authData?.data?.settlementInfo?.accountNumber !== '' ? props.authData?.data?.settlementInfo?.accountNumber : 'Enter Account Number'}
                        label="Acccount Number"
                        labelStyle="font-normal text-sm leading-6 text-Black2"
                        inputStyle="border border-transparent text-PrimaryActive"
                        style='w-full'
                        value={accountNum}
                        onChange={e => setAccountNum(e.target.value)}
                    />

                    <div className=''>
                        <p className="mb-2 font-semibold text-sm leading-6 text-Black2">Account name</p>
                        <div className={`${props.darkMode ? 'bg-Primary_Accents_sm !border-none text-Primary_200' : 'bg-white border'} rounded-md p-2 text-sm `}>
                            {loadingAcctData ? (
                                <div className="flex animate-pulse w-full gap-3">
                                    <div className={`rounded h-5 w-3/6 bg-gray-300`}></div>
                                    <div className={`rounded h-5 w-2/6 bg-gray-300`}></div>
                                </div>
                            ) : (
                                <span className={`${accountName === '' && 'text-gray-400'}`}>
                                    {accountName !== ''
                                        ? <strong>
                                            {accountName}
                                        </strong>
                                        : props.authData?.data?.settlementInfo?.accountName === ''
                                            ? 'This field is auto generated'
                                            : props.authData?.data?.settlementInfo?.accountName
                                    }</span>
                            )}
                        </div>
                    </div>
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
    storeUserData: (data: any) => dispatch(storeUserData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSettlement);