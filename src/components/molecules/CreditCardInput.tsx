import React, { useState } from 'react';
import Button from 'components/atoms/Button';
import FormInput from 'components/atoms/FormInput';
import PageTitle from 'components/atoms/PageTitle';
import showIcon from '../../assets/svg/show.svg';
import hideIcon from '../../assets/svg/hide.svg';
import showIcon_w from '../../assets/svg/show_white.svg';
import hideIcon_w from '../../assets/svg/hide_white.svg';
import Spinner from 'components/atoms/Spinner';

const CreditCardForm = (props) => {
    const [loading, setLoading] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardType, setCardType] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [showCVV, setShowCVV] = useState(false);

    const formComplete = cardNumber !== '' || cardName !== '' || expiryDate !== '' || cvv !== '';
    const disableBtn = !formComplete || loading;

    const cardTypePatterns = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/
    };

    const formatCardNumber = (value) => {
        return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    };

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\s/g, ''); // Remove all spaces
        value = formatCardNumber(value); // Format the value

        setCardNumber(value);

        for (const [type, pattern] of Object.entries(cardTypePatterns)) {
            if (pattern.test(value.replace(/\s/g, ''))) {
                setCardType(type);
                return;
            }
        }
        setCardType('');
    };

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        // Process the form data
        console.log({
            cardNumber: cardNumber.replace(/\s/g, ''), // Remove spaces for the final submission
            cardType,
            cardName,
            expiryDate,
            cvv
        });

        setTimeout(() => {
            props.creditCardHandler(formComplete);
            setLoading(false);
        }, 5000);
    };

    return (
        <form onSubmit={handleSubmit} className={`${props.darkMode ? 'bg-Primary_700' : 'bg-Primary_Accents_md'} w-full p-5 rounded-md flex flex-col gap-5`}>
            <div className='flex justify-between gap-5'>
                <PageTitle
                    pageTitle='Enter Card Details'
                    pageTitleStyle={`${props.darkMode ? '!text-Primary_300' : '!text-PrimaryActive'} !font-semibold !text-xl mobile:!text-lg`}
                    subTitle={`Card Type: ${cardType}`}
                    subTitleStyle={`${cardType !== '' ? 'block' : 'hidden'} text-Primary text-sm mobile:text-xs`}
                    style='!mb-5 !pb-0 !gap-0'
                />
            </div>
            <FormInput
                type='text'
                name='card_number'
                placeholder='Enter Card Number'
                label="Card Number"
                labelStyle="font-normal text-sm leading-6 text-Black2"
                inputStyle="border border-transparent text-PrimaryActive"
                style='w-full'
                value={cardNumber}
                onChange={handleCardNumberChange}
            />

            <FormInput
                type='text'
                name='card_name'
                placeholder="Enter Card holder's Name"
                label="Card Holder's Name"
                labelStyle="font-normal text-sm leading-6 text-Black2"
                inputStyle="border border-transparent text-PrimaryActive"
                style='w-full'
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
            />

            <div className='flex gap-5'>
                <FormInput
                    type='text'
                    name='card_exp'
                    placeholder="MM/YY"
                    label="Expiry Date"
                    labelStyle="font-normal text-sm leading-6 text-Black2"
                    inputStyle="border border-transparent text-PrimaryActive"
                    style='w-full'
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                />

                <FormInput
                    type={showCVV ? 'text' : 'password'}
                    name='card_cvv'
                    placeholder="xxxxx"
                    label="CVV"
                    labelStyle="font-normal text-sm leading-6 text-Black2"
                    inputStyle="border border-transparent text-PrimaryActive"
                    style='w-full'
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    img={props.darkMode
                        ? showCVV
                            ? showIcon_w
                            : hideIcon_w
                        : showCVV
                            ? showIcon
                            : hideIcon
                    }
                    imgOnClick={() => setShowCVV(prevState => !prevState)}
                    imgStyle='w-4 h-4'
                />
            </div>

            <div className="flex items-center justify-end">
                <Button
                    btnType='button'
                    btnText='Cancel'
                    btnStyle={`px-5 py-2 w-fit mobile:w-full font-bold text-base mobile:text-sm text-Primary bg-NoColor hover:border-none hover:shadow-none ${!disableBtn && 'hover:text-Primary_Accents_3xl'}`}
                    disabled={false}
                    onClick={props.cancelOrder}
                />

                <Button
                    btnType='submit'
                    btnText={loading
                        ? <Spinner
                            text='Processing...'
                            textStyle='font-bold text-lg mobile:text-sm text-white'
                        />

                        : 'Submit'
                    }
                    btnStyle={`${props.darkMode ? 'bg-Primary_600 text-Primary' : 'bg-SecondaryAccent5 text-Primary'} hover:bg-BackDrop_d_xs w-fit mobile:w-full relative right-0 top-0 z-[22] mb-0 text-sm !rounded-lg truncate flex gap-4 justify-center items-center px-5 py-2 font-normal text-base leading-7 rounded-lg truncate transition ease-in-out duration-250 ${disableBtn && 'cursor-not-allowed'}`}
                    disabled={disableBtn}
                    onClick={() => { }}
                />
            </div>
        </form>
    );
};

export default CreditCardForm;
