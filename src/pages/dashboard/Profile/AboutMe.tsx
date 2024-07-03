import React from 'react';
import { connect } from 'react-redux';
import PageTitle from 'components/atoms/PageTitle';
import moment from 'moment';
import editicon from '../../../assets/svg/edit-black.svg';

const AboutMe = (props) => {

    console.log("authData:", props.authData);
    console.log('County:', props.authData.data.country);


    return (
        <div className='flex flex-col gap-4 mobile:p-5'>
            <PageTitle
                pageTitle='User Information'
                pageTitleStyle='!font-semibold !text-xl mobile:!text-lg !text-PrimaryActive'
                style='!mb-0 !pb-0'
            />

            <div className='flex mobile:flex-col gap-10'>
                <div className='text-SecondaryAccent w-1/2 mobile:w-full flex flex-col gap-8'>
                    <span className='flex justify-between items-center gap-5 font-normal border-b pb-1'>
                        <p className='text-xs tablet:text-[10px] text-GrayCustom1'>Name</p>
                        <p className='text-sm tablet:text-xs'>{props.authData.data.firstname + " " + props.authData.data.lastname}</p>
                    </span>

                    <span className='flex justify-between items-center gap-5 font-normal border-b pb-1'>
                        <p className='text-xs tablet:text-[10px] text-GrayCustom1'>Email</p>
                        <p className='text-sm tablet:text-xs'>{props.authData.data.email}</p>
                    </span>

                    <span className='flex justify-between items-center gap-5 font-normal border-b pb-1'>
                        <p className='text-xs tablet:text-[10px] text-GrayCustom1'>Country</p>
                        <p className='text-sm tablet:text-xs'>{props.authData.data.country.country}</p>
                    </span>

                    <span className='flex justify-between items-center gap-5 font-normal border-b pb-1'>
                        <p className='text-xs mobile:text-[10px] text-GrayCustom1'>Role</p>
                        <div className={`${props.authData.data.role === 'seller' ? 'bg-PrimaryActive text-Primary_200' : 'bg-Primary_200 text-PrimaryActive'} px-3 py-2 rounded-md`}>{props.authData.data.role}</div>
                    </span>

                    <span className='flex justify-between items-center gap-5 font-normal border-b pb-1'>
                        <p className='text-xs tablet:text-[10px] text-GrayCustom1'>Date Created</p>
                        <p className='text-sm tablet:text-xs'>{moment(props.authData.data.createdAt).format('MMM DD, YYYY - LTS')}</p>
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

                            <img src={editicon} alt='edit' className='w-4 h-4' onClick={() => { }} />
                        </div>
                        <span className='flex justify-between items-center gap-5 font-normal border-b pb-1'>
                            <p className='text-xs tablet:text-[10px] text-GrayCustom1'>Address</p>
                            <p className='text-sm tablet:text-xs'>12, Akinwunmi str</p>
                        </span>

                        <span className='flex justify-between items-center gap-5 font-normal border-b pb-1'>
                            <p className='text-xs tablet:text-[10px] text-GrayCustom1'>City, State</p>
                            <p className='text-sm tablet:text-xs'>Yaba, Lagos</p>
                        </span>

                        <span className='flex justify-between items-center gap-5 font-normal border-b pb-1'>
                            <p className='text-xs tablet:text-[10px] text-GrayCustom1'>Country</p>
                            <p className='text-sm tablet:text-xs'>{props.authData.data.country.country}</p>
                        </span>
                    </div>

                    <div className='w-full flex flex-col gap-4'>
                        <div className='flex justify-between items-center'>
                            <PageTitle
                                pageTitle='Bank Information'
                                pageTitleStyle='!font-semibold !text-base mobile:!text-sm !text-PrimaryActive'
                                style='!mb-0 !pb-0'
                            />

                            <img src={editicon} alt='edit' className='w-4 h-4' onClick={() => { }} />
                        </div>
                        <span className='flex justify-between items-center gap-5 font-normal border-b pb-1'>
                            <p className='text-xs tablet:text-[10px] text-GrayCustom1'>Bank Name</p>
                            <p className='text-sm tablet:text-xs'>Access Bank</p>
                        </span>

                        <span className='flex justify-between items-center gap-5 font-normal border-b pb-1'>
                            <p className='text-xs tablet:text-[10px] text-GrayCustom1'>Account Number</p>
                            <p className='text-sm tablet:text-xs'>1494204475</p>
                        </span>

                        <span className='flex justify-between items-center gap-5 font-normal border-b pb-1'>
                            <p className='text-xs tablet:text-[10px] text-GrayCustom1'>Account Name</p>
                            <p className='text-sm tablet:text-xs'>HENRY EBOSE ADEDUGBA</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    authData: state.auth.user_authData
})

export default connect(mapStateToProps, null)(AboutMe);