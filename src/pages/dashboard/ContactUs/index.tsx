import React, { useState } from 'react';
import contactUsImg from '../../../assets/images/contact.jpg';
import editIcon from '../../../assets/svg/edit-black.svg';
import FormInput from 'components/atoms/FormInput';
import { inputAlpha, inputEmail } from '../../../utils';
import FormTextArea from 'components/atoms/FormTextArea';
import Alert from 'components/atoms/Alert';
import Button from 'components/atoms/Button';
import { toggleDarkMode } from '../../../redux/app/app.action';

import instagram_g from '../../../assets/svg/social/Instagram-grey.svg';
import pintrest_g from '../../../assets/svg/social/Pinterest-grey.svg';
import facebook_g from '../../../assets/svg/social/Facebook-grey.svg';
import twitter_g from '../../../assets/svg/social/Twitter-grey.svg';
import telegram_g from '../../../assets/svg/social/Telegram-grey.svg';

import instagram_w from '../../../assets/svg/social/Instagram-white.svg';
import pintrest_w from '../../../assets/svg/social/Pinterest-white.svg';
import facebook_w from '../../../assets/svg/social/Facebook-white.svg';
import twitter_w from '../../../assets/svg/social/Twitter-white.svg';
import telegram_w from '../../../assets/svg/social/Telegram-white.svg';
import { connect } from 'react-redux';

const ContactUs = (props) => {
    const [loading, setLoading] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [messageContent, setMessageContent] = useState('');

    const formComplete = firstname !== '' || lastname !== '' || email !== '' || messageContent !== '';

    const disableBtn = !formComplete || loading;

    const sendContactMessage = (reqData: any) => {
        Alert('success', 'Message sent successfully');

        setTimeout(() => {
            Alert('success', 'You would receive a response nofification shortly');
        }, 1500);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const reqData = {
            fname: firstname,
            lname: lastname,
            email: email,
            message: messageContent
        }

        sendContactMessage(reqData);

        console.log("reqData:", reqData);
    }

    return (
        <div className='desktop:px-60 desktop:py-32 p-32 mobile:p-5 flex flex-col gap-5 min-h-fit h-fit'>
            <div className='flex mobile:flex-col gap-8 justify-between mobile:justify-start'>
                <div className='flex flex-col'>
                    <p className='font-semibold text-5xl mobile:text-2xl text-Primary'>Contact us</p>
                    <p className='text-xl mobile:text-lg text-GrayCustom7'>Follow Us</p>
                </div>

                <div className='w-fit mobile:w-full flex justify-center items-center gap-5'>
                    <span className='w-10 h-10 mobile:w-8 mobile:h-8 transition-all flex justify-center items-center p-1 border-b border-NoColor hover:border-b hover:border-PrimaryActive cursor-pointer'>
                        <img src={instagram_g} alt="social-icon-ig" className='w-[90%] h-[90%] object-cover object-fit object-center' />
                    </span>

                    <span className='w-10 h-10 mobile:w-8 mobile:h-8 transition-all flex justify-center items-center p-1 border-b border-NoColor hover:border-b hover:border-PrimaryActive cursor-pointer'>
                        <img src={pintrest_g} alt="social-icon-pt" className='w-[90%] h-[90%] object-cover object-fit object-center' />
                    </span>

                    <span className='w-10 h-10 mobile:w-8 mobile:h-8 transition-all flex justify-center items-center p-1 border-b border-NoColor hover:border-b hover:border-PrimaryActive cursor-pointer'>
                        <img src={facebook_g} alt="social-icon-fb" className='w-[90%] h-[90%] object-cover object-fit object-center' />
                    </span>

                    <span className='w-10 h-10 mobile:w-8 mobile:h-8 transition-all flex justify-center items-center p-1 border-b border-NoColor hover:border-b hover:border-PrimaryActive cursor-pointer'>
                        <img src={twitter_g} alt="social-icon-tw" className='w-[90%] h-[90%] object-cover object-fit object-center' />
                    </span>

                    <span className='w-10 h-10 mobile:w-8 mobile:h-8 transition-all flex justify-center items-center p-1 border-b border-NoColor hover:border-b hover:border-PrimaryActive cursor-pointer'>
                        <img src={telegram_g} alt="social-icon-tg" className='w-[90%] h-[90%] object-cover object-fit object-center' />
                    </span>
                </div>
            </div>

            <div className={`${props.darkMode ? 'bg-Primary_700' : 'bg-Background1 '} flex mobile:flex-col gap-5 w-full h-fit desktop:min-h-[40vh] rounded-lg overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]`}>
                <div className='w-1/2  mobile:w-full h-auto mobile:max-h-[30vh] overflow-hidden'>
                    <img src={contactUsImg} alt="contactUsImg" className='w-full h-full object-center object-cover object-full' />
                </div>
                <form onSubmit={handleSubmit} className='w-1/2 mobile:w-full h-auto flex flex-col gap-5 p-8 mobile:p-5'>
                    <div className='flex mobile:flex-col gap-2'>
                        <FormInput
                            type='text'
                            name='firstname'
                            placeholder='Enter firstname'
                            label="Firstname"
                            labelStyle="font-normal text-sm leading-6 text-Black2"
                            inputStyle="border border-transparent text-Black2"
                            style='w-full'
                            value={firstname}
                            onChange={e => inputAlpha.test(e.target.value) && setFirstname(e.target.value)}
                        />

                        <FormInput
                            type='text'
                            name='lastname'
                            placeholder='Enter lastname'
                            label="Lastname"
                            labelStyle="font-normal text-sm leading-6 text-Black2"
                            inputStyle="border border-transparent text-Black2"
                            style='w-full'
                            value={lastname}
                            onChange={e => inputAlpha.test(e.target.value) && setLastname(e.target.value)}
                        />
                    </div>

                    <FormInput
                        type='email'
                        name='email'
                        placeholder='Email address'
                        label="Email"
                        labelStyle="font-normal text-sm leading-6 text-Black2"
                        inputStyle="border border-transparent text-Black2"
                        value={email}
                        onChange={e => inputEmail.test(e.target.value) && setEmail(e.target.value)}
                    />

                    <FormTextArea
                        name='massage_content'
                        placeholder='Write us a message'
                        label="Email"
                        labelStyle="font-normal text-sm leading-6 text-Black2"
                        inputStyle="flex-row-reverse border border-transparent text-Black2 w-full"
                        inputStyle2='text-justify text-wrap !pl-2 !pr-12 h-full'
                        layoutStyle='h-full'
                        inputContainerStyle='h-full'
                        rows={4}
                        img={editIcon}
                        imgStyle='w-4 h-4'
                        value={messageContent}
                        onChange={e => setMessageContent(e.target.value)}
                    />

                    <Button
                        btnType='submit'
                        btnText='Send message'
                        btnStyle={`px-5 py-2 w-full font-bold text-lg mobile:text-sm text-white bg-Primary ${!disableBtn && 'hover:bg-Primary_Accents_3xl'}`}
                        disabled={disableBtn}
                        disabledClass={`${disableBtn && 'cursor-not-allowed bg-PrimaryDisabled'}`}
                        onClick={() => { }}
                    />
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    darkMode: state.app.darkMode
});

const mapDispatchToProps = dispatch => ({
    toggleDarkMode: () => dispatch(toggleDarkMode())
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);