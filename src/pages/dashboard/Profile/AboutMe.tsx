import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PageTitle from 'components/atoms/PageTitle';
import moment from 'moment';
import editicon from '../../../assets/svg/edit-black.svg';
import EditUserAddress from '../ModalComponents/EditUserAddress';
import EditSettlement from '../ModalComponents/EditSettlement';

const AboutMe = (props) => {
    const [addressModal, setAddressModal] = useState(false);
    const [settlementModal, setSettlementModal] = useState(false);

    useEffect(() => {
        if(addressModal){
            setSettlementModal(false);
        }
        
        if(settlementModal){
            setAddressModal(false);
        }
    }, [addressModal, settlementModal]);
    

    return (
        <div className={`${props.darkMode ? 'bg-Primary_800' : 'bg-white'} rounded-md p-5 flex flex-col gap-4`}>
            <PageTitle
                pageTitle='User Information'
                pageTitleStyle={`${props.darkMode ? '!text-Primary' : '!text-PrimaryActive'} !font-semibold !text-xl mobile:!text-lg`}
                style='!mb-0 !pb-0'
            />

            <div className='flex mobile:flex-col gap-10'>
                <div className='text-SecondaryAccent w-1/2 mobile:w-full flex flex-col gap-8'>
                    <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex justify-between items-center gap-5 font-normal border-b pb-1`}>
                        <p className={`${props.darkMode ? 'text-Primary_600' : 'text-GrayCustom1'} text-xs tablet:text-[10px]`}>Name</p>
                        <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} text-sm tablet:text-xs`}>{props.authData.data.firstname + " " + props.authData.data.lastname}</p>
                    </span>

                    <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex justify-between items-center gap-5 font-normal border-b pb-1`}>
                        <p className={`${props.darkMode ? 'text-Primary_600' : 'text-GrayCustom1'} text-xs tablet:text-[10px]`}>Email</p>
                        <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} text-sm tablet:text-xs`}>{props.authData.data.email}</p>
                    </span>

                    <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex justify-between items-center gap-5 font-normal border-b pb-1`}>
                        <p className={`${props.darkMode ? 'text-Primary_600' : 'text-GrayCustom1'} text-xs tablet:text-[10px]`}>Country</p>
                        <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} text-sm tablet:text-xs`}>{props.authData.data.country.country}</p>
                    </span>

                    <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex justify-between items-center gap-5 font-normal border-b pb-1`}>
                        <p className={`${props.darkMode ? 'text-Primary_600' : 'text-GrayCustom1'} text-xs tablet:text-[10px]`}>Currency</p>
                        <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} text-sm tablet:text-xs`}>{props.authData.data.country.currencySymbol}</p>
                    </span>

                    <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex justify-between items-center gap-5 font-normal border-b pb-1`}>
                        <p className={`${props.darkMode ? 'text-Primary_600' : 'text-GrayCustom1'} text-xs tablet:text-[10px]`}>Role</p>
                        <div className={`${props.authData.data.role === 'seller' ? 'bg-PrimaryActive text-Primary_200' : 'bg-Primary_200 text-PrimaryActive'} px-3 py-2 rounded-md`}>{props.authData.data.role}</div>
                    </span>

                    <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex justify-between items-center gap-5 font-normal border-b pb-1`}>
                        <p className={`${props.darkMode ? 'text-Primary_600' : 'text-GrayCustom1'} text-xs tablet:text-[10px]`}>Date Created</p>
                        <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} text-sm tablet:text-xs`}>{moment(props.authData.data.createdAt).format('MMM DD, YYYY - LTS')}</p>
                    </span>
                </div>

                <div className='text-SecondaryAccent w-1/2 mobile:w-full flex flex-col gap-8'>
                    <div className='w-full flex flex-col gap-5'>
                        <div className='flex justify-between items-center'>
                            <PageTitle
                                pageTitle='Address'
                                pageTitleStyle='!font-semibold !text-base mobile:!text-sm !text-PrimaryActive'
                                style='!mb-0 !pb-0'
                            />

                            <img src={editicon} alt='edit' className='w-4 h-4 cursor-pointer' onClick={() => setAddressModal(true)} />
                        </div>
                        <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex justify-between items-center gap-5 font-normal border-b pb-1`}>
                            <p className={`${props.darkMode ? 'text-Primary_600' : 'text-GrayCustom1'} text-xs tablet:text-[10px]`}>Address</p>
                            <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} ${props.authData?.data?.address.street === '' && 'text-BackDrop_d_sm'} text-sm tablet:text-xs`}>{props.authData?.data?.address.street !== '' ? props.authData?.data?.address.street : 'Enter house address'}</p>
                        </span>

                        <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex justify-between items-center gap-5 font-normal border-b pb-1`}>
                            <p className={`${props.darkMode ? 'text-Primary_600' : 'text-GrayCustom1'} text-xs tablet:text-[10px]`}>City, State</p>
                            <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} ${props.authData?.data?.address.city === '' && props.authData?.data?.address.state === '' && 'text-BackDrop_d_sm'} text-sm tablet:text-xs`}>{props.authData?.data?.address.city !== '' ||  props.authData?.data?.address.state !== '' ? props.authData?.data?.address.city+', '+props.authData?.data?.address.state : 'Enter city and state of residence'}</p>
                        </span>

                        <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex justify-between items-center gap-5 font-normal border-b pb-1`}>
                            <p className={`${props.darkMode ? 'text-Primary_600' : 'text-GrayCustom1'} text-xs tablet:text-[10px]`}>Country</p>
                            <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} text-sm tablet:text-xs`}>{props.authData?.data?.country.country}</p>
                        </span>
                    </div>

                    <div className='w-full flex flex-col gap-4'>
                        <div className='flex justify-between items-center'>
                            <PageTitle
                                pageTitle='Bank Information'
                                pageTitleStyle='!font-semibold !text-base mobile:!text-sm !text-PrimaryActive'
                                style='!mb-0 !pb-0'
                            />

                            <img src={editicon} alt='edit' className='w-4 h-4 cursor-pointer' onClick={() => setSettlementModal(true)} />
                        </div>
                        <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex justify-between items-center gap-5 font-normal border-b pb-1`}>
                            <p className={`${props.darkMode ? 'text-Primary_600' : 'text-GrayCustom1'} text-xs tablet:text-[10px]`}>Bank Name</p>
                            <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} ${props.authData?.data?.settlementInfo?.bankName !== '' ? props.darkMode ? 'text-white' : 'text-PrimaryActive' : props.darkMode ? 'text-BackDrop_l_md' : 'text-BackDrop_d_sm'} text-sm tablet:text-xs`}>{props.authData?.data?.settlementInfo?.bankName !== '' ? props.authData?.data?.settlementInfo?.bankName : 'Enter bank name'}</p>
                        </span>

                        <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex justify-between items-center gap-5 font-normal border-b pb-1`}>
                            <p className={`${props.darkMode ? 'text-Primary_600' : 'text-GrayCustom1'} text-xs tablet:text-[10px]`}>Account Number</p>
                            <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} ${props.authData?.data?.settlementInfo?.accountNumber !== '' ? props.darkMode ? 'text-white' : 'text-PrimaryActive' : props.darkMode ? 'text-BackDrop_l_md' : 'text-BackDrop_d_sm'} text-sm tablet:text-xs`}>{props.authData?.data?.settlementInfo?.accountNumber !== '' ? props.authData?.data?.settlementInfo?.accountNumber : 'Enter account number'}</p>
                        </span>

                        <span className={`${props.darkMode ? 'border-Primary_700' : ''} flex justify-between items-center gap-5 font-normal border-b pb-1`}>
                            <p className={`${props.darkMode ? 'text-Primary_600' : 'text-GrayCustom1'} text-xs tablet:text-[10px]`}>Account Name</p>
                            <p className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-PrimaryActive'} ${props.authData?.data?.settlementInfo?.accountName !== '' ? props.darkMode ? 'text-white' : 'text-PrimaryActive' : props.darkMode ? 'text-BackDrop_l_md' : 'text-BackDrop_d_sm'} text-sm tablet:text-xs`}>{props.authData?.data?.settlementInfo?.accountName !== '' ? props.authData?.data?.settlementInfo?.accountName : 'Enter account ame'}</p>
                        </span>
                    </div>
                </div>
            </div>
            {addressModal && <EditUserAddress setAddressModal={setAddressModal}/>}
            {settlementModal && <EditSettlement setSettlementModal={setSettlementModal}/>}
        </div>
    )
}

const mapStateToProps = state => ({
    authData: state.auth.user_authData,
    darkMode: state.app.darkMode
})

export default connect(mapStateToProps, null)(AboutMe);