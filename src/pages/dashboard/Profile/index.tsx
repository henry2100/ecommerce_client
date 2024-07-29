import React, { useEffect, useState } from 'react';
import PageTitle from 'components/atoms/PageTitle';
import profileImg from '../../../assets/images/img-2.jpg';
import cancelIcon from '../../../assets/svg/close_x_red.svg';
import editIcon from '../../../assets/svg/edit-black.svg';
import editIcon2 from '../../../assets/svg/edit-success.svg';
import user_placeholder from '../../../assets/svg/User_2.svg';
import trashIcon from '../../../assets/svg/trash.svg';
import Button from 'components/atoms/Button';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { ToCamelCase, ToSnakeCase } from 'components/atoms/CaseManager';

import userIcon from '../../../assets/svg/navIcons/navMenuIcons/user_bold_pry.svg';
import userIconSolid from '../../../assets/svg/navIcons/navMenuIcons/user_bold_w.svg';

import addProduct_w from '../../../assets/svg/navIcons/profilePageIcons/white/add_product.svg';
import addProduct_d from '../../../assets/svg/navIcons/profilePageIcons/primary/add_product.svg';

import productIcon_w from '../../../assets/svg/navIcons/profilePageIcons/white/products.svg';
import productIcon_d from '../../../assets/svg/navIcons/profilePageIcons/primary/products.svg';

import tagUser_w from '../../../assets/svg/navIcons/profilePageIcons/white/tag-user_bold.svg';
import tagUser_d from '../../../assets/svg/navIcons/profilePageIcons/primary/tag-user_bold.svg';

import taskSquare_w from '../../../assets/svg/navIcons/profilePageIcons/white/task-square_bold.svg';
import taskSquare_d from '../../../assets/svg/navIcons/profilePageIcons/primary/task-square_bold.svg';

import archiveBook_w from '../../../assets/svg/navIcons/profilePageIcons/white/archive-book_bold.svg';
import archiveBook_d from '../../../assets/svg/navIcons/profilePageIcons/primary/archive-book_bold.svg';

import userSettings_w from '../../../assets/svg/navIcons/profilePageIcons/white/user-settings_bold.svg';
import userSettings_d from '../../../assets/svg/navIcons/profilePageIcons/primary/user-settings_bold.svg';
import { connect } from 'react-redux';
import Dropzone from 'components/atoms/Dropzone';
import UploadFile from 'components/molecules/Uploader';
import Alert from 'components/atoms/Alert';
import { BASE_URL, getRequest, putRequest } from 'services/http';
import { storeUserData } from '../../../redux/auth/auth.action';
import Spinner from 'components/atoms/Spinner';

const acceptedFileExt = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpeg'],
    'image/jpg': ['.jpg']
}

const Profile = (props) => {
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [userProfileImg, setUserProfileImg] = useState<any>([]);
    const [uploadedImgRes, setUploadedImgRes] = useState<any>([]);

    const navigate = useNavigate();
    const location = useLocation();

    const currentPath = location.pathname.split('/').slice(-1).toString();

    const headers = {
        "Content-Type": "application/json"
    }

    const sideNavData = [
        { title: 'Profile', style: ``, icon: userIcon, iconActive: userIconSolid },
        { title: 'Order History', style: ``, icon: taskSquare_d, iconActive: taskSquare_w },
        { title: 'Transaction History', style: ``, icon: archiveBook_d, iconActive: archiveBook_w },
        { title: 'My Products', style: `${props.role === 'seller' ? 'block' : 'hidden'}`, icon: productIcon_d, iconActive: productIcon_w },
        { title: 'Add Product', style: `${props.role === 'seller' ? 'block' : 'hidden'}`, icon: addProduct_d, iconActive: addProduct_w },
        // { title: 'Profile Settings', style: ``, icon: userSettings_d, iconActive: userSettings_w },
    ]

    const matchedNavItem = sideNavData.filter(item => ToSnakeCase(item.title) === currentPath);

    useEffect(() => {
        if (matchedNavItem) {
            const matched = ToSnakeCase(matchedNavItem[0]?.title);
            setSelected(matched);
        } else {
            setSelected('about_me');
        }

    }, [currentPath]);

    const updateProfile = async (reqData: any, type: string) => {
        if (type === 'remove_profile_img') setLoading(true);
        const res = await putRequest(`${BASE_URL}users/update/${props.authData?.data._id}`, headers, reqData);

        if (res?.status === 200) {
            setLoading(false);
            setProfileImg(res?.data.imageUrl);
            props.storeUserData({ ...props.authData, ...res?.data });
            setUserProfileImg([]);
            Alert('success', 'Profile picture uploaded successfully');

            setLoading(false);
        } else {
            setLoading(false);
        }
    }

    const handleProfileUpdate = () => {
        setLoading(true)
        userProfileImg.forEach(async file => {
            const resUrl = await UploadFile(file, '', props.darkMode);

            if (resUrl !== undefined) updateProfile({ imageUrl: resUrl.url }, 'update_profile_img');

            else setLoading(false);
        });
    }

    const handleClick = (e, item) => {
        navigate(`/dashboard/profile/${ToSnakeCase(item.title)}`);

        setSelected(ToSnakeCase(item.title));
    }

    const imgNote = (
        <small className='text-Primary font-normal leading-4' >Click on the Profile Image to Add a new Picture</small>
    )

    const default_setNewProfileImg = (
        <>
            <Dropzone
                acceptedExt={acceptedFileExt}
                file={userProfileImg}
                setFile={setUserProfileImg}
                disappear={true}
                addedStyle='!left-0'
            >
                <div className='relative w-48 h-48 min-w-48 min-h-48 rounded-full overflow-hidden bg-white border-4 border-Primary'>
                    <img src={user_placeholder} alt='prifile-img' className='w-full h-full object-cover object-center' />
                </div>
            </Dropzone>
            {imgNote}
        </>
    )

    const currentProfileImg = (
        <>
            <Dropzone
                acceptedExt={acceptedFileExt}
                file={userProfileImg}
                setFile={setUserProfileImg}
                disappear={true}
                addedStyle='!left-0'
            >
                <div className='relative w-48 h-48 min-w-48 min-h-48 rounded-full overflow-hidden bg-white'>
                    <img src={props.authData.data.imageUrl} alt='previewImg' className="w-full h-full object-cover object-center" />
                </div>
            </Dropzone>
            {imgNote}
        </>
    )

    const previewProfileImg = (
        <Dropzone
            acceptedExt={acceptedFileExt}
            file={userProfileImg}
            setFile={setUserProfileImg}
            disappear={true}
            addedStyle='!left-0'
        >
            <div className='relative w-48 h-48 min-w-48 min-h-48 rounded-full overflow-hidden bg-white'>
                {userProfileImg.map((item, i) => (
                    <img key={i} src={item.preview} alt='previewImg' className="w-full h-full object-cover object-center" />
                ))}
            </div>
        </Dropzone>
    )

    const profileUpdateBtn = (
        <div className='absolute right-0 top-0 w-fit flex flex-col justify-end items-end gap-1'>
            <button
                className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-Primary'} group flex justify-center items-center text-xs gap-1 hover:text-Success transition ease-in duration-250`}
                onClick={handleProfileUpdate}
            >
                <p className='tablet:hidden'>Add</p>
                <img src={editIcon} alt='button_icon' className='w-4 h-4 block group-hover:hidden transition ease-in duration-250' />
                <img src={editIcon2} alt='button_icon' className='w-4 h-4 hidden group-hover:block transition ease-in duration-250' />
            </button>

            <button
                className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-Primary'} flex justify-center items-center text-xs gap-1 text-Danger`}
                onClick={() => setUserProfileImg([])}
            >
                <p className='tablet:hidden'>Cancel</p>
                <img src={cancelIcon} alt='button_icon' className='w-4 h-4' />
            </button>
        </div>
    )

    const removeProfileImagBtn = (
        <div className={`${props.darkMode ? 'text-PrimaryDisabled' : 'text-Primary'} absolute right-0 top-0 w-fit flex justify-end items-center hover:text-Danger transition ease-in duration-250`}>
            <button
                className='flex justify-center items-center text-xs gap-2'
                onClick={() => updateProfile({ imageUrl: '' }, 'remove_profile_img')}
            >
                <p className='tablet:hidden'>Delete</p>
                <img src={trashIcon} alt='button_icon' className='w-4 h-4' />
            </button>
        </div>
    );

    const profileImgComp = (
        props.authData.data.imageUrl === "" && userProfileImg.length === 0

            ? default_setNewProfileImg

            : props.authData.data.imageUrl === "" && userProfileImg.length > 0

                ? <>
                    {previewProfileImg}
                    {profileUpdateBtn}
                </>

                : props.authData.data.imageUrl !== "" && userProfileImg.length > 0

                    ? <>
                        {previewProfileImg}
                        {profileUpdateBtn}
                    </>

                    : props.authData.data.imageUrl !== ""

                        ? <>
                            {currentProfileImg}
                            {removeProfileImagBtn}
                        </>

                        : ''
    )

    return (
        <div className='flex flex-col gap-10 desktop:px-32 desktop:py-8 p-20 mobile:p-5'>
            <PageTitle
                pageTitle='Profile'
                pageTitleStyle='!font-semibold !text-4xl mobile:!text-2xl !text-Primary'
            />
            <div className={`${props.darkMode ? 'bg-Primary_800' : 'shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white'} relative rounded-2xl p-5`}>
                <div className='relative rounded-lg w-full min-h-[20vh] flex mobile:flex-col gap-5 mb-12'>

                    <div className={`${loading ? 'justify-center items-center' : 'flex-col justify-between gap-12'} relative desktop:w-1/5 w-1/3 mobile:w-full flex flex-col gap-5 justify-center items-center`} style={{ height: 'auto' }}>
                        {loading
                            ? <Spinner
                                textStyle='text-lg font-semibold text-Primary'
                                borderStyle='border-4 border-Primary border-r-transparent w-8 h-8'
                            />

                            : <>
                                {profileImgComp}
                            </>
                        }

                    </div>

                    <div className='mobile:hidden mobile:w-full p-5 mobile:py-0 flex flex-col justify-center gap-5'>
                        <PageTitle
                            pageTitle={`About ${props.authData.data.firstname}`}
                            pageTitleStyle='!font-semibold !text-lg mobile:!text-base !text-PrimaryActive'
                            style='!mb-0 !pb-0'
                        />

                        <div className='flex flex-col gap-5 text-SecondaryAccent max-w-lg'>
                            {/* <p className='text-justify word-wrap'>
                                Id irure consectetur anim laborum. Non excepteur officia culpa nostrud aute sint anim eu.
                            </p> */}
                            <p className='text-justify word-wrap'>
                                Nisi sunt enim do et duis magna commodo. Ex minim quis aliqua esse quis quis commodo tempor id. Sit sit occaecat incididunt pariatur.
                            </p>
                        </div>
                    </div>

                </div>

                <div className={`min-h-fit flex mobile:flex-col gap-5`}>
                    <div className={`${props.darkMode ? 'bg-Primary_700' : 'custom_border bg-Primary_200'} relative rounded-lg p-3 mobile:p-3 desktop:min-w-1/5 desktop:w-1/5 w-fit mobile:w-full flex flex-col flex-shrink-0`}>
                        <div className='flex flex-col mobile:flex-row mobile:justify-evenly flex-shrink-0 gap-2 sticky mobile:relative top-10 mobile:top-0'>
                            {sideNavData.map((item, i) => (
                                <div key={i} className={`${item.style} ${ToSnakeCase(item.title) === selected
                                        ? `${props.darkMode
                                            ? 'bg-Primary_800 text-Primary_200'
                                            : 'bg-Primary text-white'}`
                                        : `${props.darkMode
                                            ? 'text-Primary_300'
                                            : 'text-Primary'
                                        }`} 
                                        hover:bg-Primary_Accents_md desktop:w-full tablet:w-fit flex items-center justify-start gap-2 transaition-all rounded-md p-3 mobile:p-[6px] cursor-pointer`}
                                    onClick={e => handleClick(e, item)}
                                >
                                    <img src={ToSnakeCase(item.title) === selected ? item.iconActive : item.icon} alt='navItem_icon' className='w-5 h-5 mobile:w-7 mobile:h-7' />
                                    <span className='tablet:hidden text-base mobile:text-sm truncate'>{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`${props.darkMode ? 'bg-Primary_900' : 'bg-PrimaryDisabled'} p-2 mobile:p-1 w-full rounded-lg shadow-custom_border overflow-scroll`}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    darkMode: state.app.darkMode,
    loggedIn: state.auth?.user_loggedIn,
    authData: state.auth?.user_authData,
    role: state.auth?.user_authData.data.role,
    accessToken: state.auth?.user_authData?.token.accessToken
});

const mapDispatchToProps = (dispatch: any) => ({
    storeUserData: (data) => dispatch(storeUserData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);