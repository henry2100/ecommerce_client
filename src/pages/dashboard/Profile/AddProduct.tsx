import React, { useEffect, useState } from 'react'
import { inputAlpha, inputFloat, inputNum } from 'utils';
import FormInput from 'components/atoms/FormInput';
import FormTextArea from 'components/atoms/FormTextArea';
import editIcon from '../../../assets/svg/edit-black.svg';
import Dropzone from 'components/atoms/Dropzone';
import DropzoneIcon from '../../../assets/svg/folder.svg';
import arrowUp from '../../../assets/svg/arrows/arrow_du.svg';
import arrowDown from '../../../assets/svg/arrows/arrow_dd.svg';
import cancelIcon from '../../../assets/svg/close_x_red.svg';
import { BASE_URL, getRequest, postRequest } from 'services/http';
import Alert from 'components/atoms/Alert';
import Button from 'components/atoms/Button';
import Spinner from 'components/atoms/Spinner';
import { connect } from 'react-redux';
import UploadFile from 'components/molecules/Uploader';
import axios from 'axios';
import { ToTitleCase } from 'components/atoms/CaseManager';
import DropdownCard from 'components/atoms/DropdownCard';

const acceptedFileExt = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpeg'],
    'image/jpg': ['.jpg'],
    'image/webp': ['.webp'],
    'image/avif': ['.avif']
}

const AddProduct = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [prodName, setProdName] = useState('');
    const [prodPrice, setProdPrice] = useState('');
    const [prodQuantity, setProdQuantity] = useState('');
    const [inputCategory, setInputCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryDropdown, setCategoryDropdown] = useState(false);
    const [categoryList, setCategoryLIst] = useState<any>([]);
    const [selectedProdTags, setSelectedProdTags] = useState<any>([]);
    const [prodTagsDropdown, setProdTagsDropdown] = useState(false);
    const [availableTags, setAvailableTags] = useState<any>([]);
    // const [selectedTags, setSelectedTags] = useState<any>([]);
    const [prodDesc, setProdDesc] = useState('');

    const [prodImages, setProdImages] = useState<any>([]);
    const [imgUploadRes, setImgUploadRes] = useState<any>([]);

    const formComplete = prodName !== '' || prodPrice !== '' || prodQuantity !== '' || selectedCategory !== '' || selectedProdTags.length >= 1 || prodImages.length >= 2;

    const disableBtn = !formComplete || loading;

    const getCategoryList = async () => {
        const res = await getRequest(`${BASE_URL}categories`, {
            "Content-Type": "application/json"
        });

        if (res?.status === 200) {
            setCategoryLIst(res?.data.data);
        }
    }

    useEffect(() => {
        getCategoryList();
    }, []);

    const filteredData = categoryList?.filter(item => {
        if (item.categoryName.toLowerCase().includes(inputCategory.toLowerCase())) {
            return item;
        }
        else {
            return;
        }
    })

    const handleTagSelection = (tag: any) => {
        if (selectedProdTags.includes(tag)) {
            setSelectedProdTags(selectedProdTags.filter(t => t !== tag));
        } else {
            setSelectedProdTags([...selectedProdTags, tag]);
        }
    };

    const addProduct = async (reqData: any) => {
        const res = await postRequest(`${BASE_URL}products/add`, {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${props.accessToken}`
        }, reqData);

        // console.log("Add_product_res:", res);

        if (res?.status === 200) {
            Alert('success', res?.data.message, props.darkMode);
            handleCancelled();
        } else {
            res?.data.message !== undefined && Alert('error', res?.data.message);
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (prodImages.length > 0) {
            setLoading(true); // Optional: set loading state if you have a spinner

            try {
                // Wait for all upload promises to resolve
                const uploadPromises = prodImages.map(file => UploadFile(file, '', props.darkMode));
                const uploadResults = await Promise.all(uploadPromises);

                // Aggregate the URLs from the results
                // const imageUrls = uploadResults.map(res => ({ imageUrl: res.url }));
                const imageUrls = uploadResults.map(res => res.url);

                // Update the state with the aggregated URLs
                setImgUploadRes(imageUrls);

                // Now, you can include imageUrls in your reqData
                const reqData = {
                    sellerId: props.userId,
                    name: prodName,
                    description: prodDesc,
                    price: prodPrice,
                    quantity: prodQuantity,
                    category: selectedCategory,
                    currency: props.currency,
                    tags: selectedProdTags,
                    imageUrl: imageUrls, // Updated to include all uploaded image URLs
                };

                // Make the API request to add the product
                await addProduct(reqData);
                setLoading(false);
            } catch (error) {
                // console.error("Error uploading images:", error);
                setLoading(false);
            } finally {
                setLoading(false); // Optional: reset loading state
            }
        }
    };

    const handleCancelled = () => {
        setProdName('');
        setProdDesc('');
        setProdPrice('');
        setProdQuantity('');
        setSelectedCategory('');
        setInputCategory('');
        setSelectedProdTags([]);
        setProdImages([]);
        setImgUploadRes([]);
        setCategoryDropdown(false);
        setProdTagsDropdown(false);
    }

    return (
        <div className={`${props.darkMode ? 'bg-Primary_800' : 'bg-Primary_200'} p-2 mobile:p-0 rounded-md flex mobile:flex-col justify-between gap-5 w-full overflow-hidden`}>
            <form onSubmit={handleSubmit} className={`${props.darkMode ? 'bg-Primary_700' : 'bg-white'} desktop:w-3/5 w-3/4 mobile:w-full flex flex-col flex-shrink gap-4 p-5 rounded-md`}>
                <div className='flex tablet:flex-col gap-5'>
                    <FormInput
                        type='text'
                        name='product_name'
                        placeholder='Enter Product name'
                        label="Product Name"
                        labelStyle="font-normal text-sm leading-6 text-Black2"
                        inputStyle="border border-transparent text-PrimaryActive"
                        style='w-2/3 tablet:w-full'
                        value={prodName}
                        onChange={e => setProdName(e.target.value)}
                    />

                    <div className={`w-1/3 tablet:w-full relative z-[15] cursor-pointer`}>
                        <FormInput
                            type="text"
                            placeholder='Category'
                            style={` w-full relative z-[12]`}
                            inputStyle={`border border-transparent text-PrimaryActive w-full ${props.darkMode ? 'bg-Primary_600 !border-none text-Primary_200' : 'bg-white'}`}
                            label="Select Category"
                            labelStyle="font-normal text-sm leading-6 text-Black2"
                            inputStyle2='disabled cursor-pointer'
                            value={ToTitleCase(inputCategory)}
                            onChange={e => {
                                setInputCategory(e.target.value)

                                if (e.target.value.length > 0) {
                                    setCategoryDropdown(true)
                                }

                                setTimeout(() => setCategoryDropdown(false), 10000);
                            }}
                            img={
                                categoryDropdown
                                    ? arrowUp
                                    : arrowDown
                            }
                            imgStyle={`w-4 h-4 cursor-pointer`}
                            imgOnClick={() => setCategoryDropdown(prevState => !prevState)}
                        />
                        {categoryDropdown &&
                            <DropdownCard
                                handleClickOut={setCategoryDropdown}
                                cardLayout={`${props.darkMode ? 'bg-Primary_800' : 'bg-white'} min-w-[150px] max-w-3/5 w-fit max-h-[200px] overflow-scroll flex flex-col gap-0 absolute z-10 right-0 rounded-md custom_container shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-fit animate-slide_down2`}
                            >
                                {filteredData?.length === 0
                                    ? <span className={`${props.darkMode ? 'bg-Primary_800' : 'bg-white'} cursor-default font-normal text-sm leading-6 text-Danger p-2 hover:bg-BackDrop_d_xs`}>
                                        Not found
                                    </span>

                                    : filteredData?.map((item, i) => (
                                        <span key={i} onClick={() => {
                                            setInputCategory(item.categoryName);
                                            setSelectedCategory(item.categoryName);
                                            setAvailableTags(item.subTag);
                                            setCategoryDropdown(false);
                                        }} className={`${props.darkMode ? 'text-slate-500 hover:text-white' : 'text-Primary hover:text-PrimaryActive'} hover:bg-Primary_Accents_xs cursor-pointer font-normal text-sm leading-6 p-2`}>
                                            {item.categoryName}
                                        </span>
                                    ))
                                }
                            </DropdownCard>
                        }
                    </div>
                </div>

                <div className='flex tablet:flex-col gap-5'>
                    <FormInput
                        type='text'
                        name='product_price'
                        placeholder='Enter Price'
                        label="Product Price"
                        labelStyle="font-normal text-sm leading-6 text-Black2"
                        inputStyle="border border-transparent text-PrimaryActive"
                        style='w-full'
                        value={prodPrice}
                        onChange={e => inputFloat.test(e.target.value) && setProdPrice(e.target.value)}
                    />

                    <FormInput
                        type='text'
                        name='quantity'
                        placeholder='Enter Quantity'
                        label="Quantity"
                        labelStyle="font-normal text-sm leading-6 text-Black2"
                        inputStyle="border border-transparent text-PrimaryActive"
                        style='w-full'
                        value={prodQuantity}
                        onChange={e => inputNum.test(e.target.value) && setProdQuantity(e.target.value)}
                    />
                </div>

                <div className='flex tablet:flex-col gap-5'>

                    <div className={`relative w-2/5 tablet:w-full flex flex-col ${selectedProdTags.length > 0 ? 'text-PrimaryActive' : 'text-Primary'}`}>
                        <label className={`font-normal text-sm leading-6 ${props.darkMode ? 'text-Primary' : 'text-PrimaryActive'} mb-2`}>
                            Select Product Tags
                        </label>
                        <div className={`${selectedProdTags.length > 0 ? 'px-2 py-1' : 'p-2'} relative w-full ${props.darkMode ? 'bg-Primary_600 !border-none text-Primary_200' : 'bg-white'} cursor-pointer border rounded-md flex gap-3 items-center`}
                            onClick={availableTags.length > 0 ? () => setProdTagsDropdown(prevState => !prevState) : () => Alert('error', 'Select Product category first')}
                        >
                            <div className={`${selectedProdTags.length > 0  && props.darkMode ? 'text-Primary_200 border-Primary_600' : 'text-Primary' ? 'text-PrimaryActive' : 'text-Primary'} flex gap-3 items-center overflow-x-scroll custom_container w-[85%]`}>
                                {selectedProdTags.length > 0
                                    ? selectedProdTags.map((item, i) => (
                                        <span key={i} className={`${props.darkMode ? 'border-PrimaryActive' : ''} group border px-3 py-1 whitespace-nowrap text-ellipsis rounded-md flex flex-shrink-0 gap-2 justify-between items-center transition ease-in-out duration-500`}>
                                            {item}
                                            <img
                                                src={cancelIcon}
                                                alt='remove'
                                                className='hidden group-hover:block w-3 h-3 transition ease-in-out duration-500'
                                                onClick={() => setSelectedProdTags(selectedProdTags.filter(t => t !== item))}
                                            />
                                        </span>
                                    )).reverse()
                                    : 'Product Tags'}
                            </div>
                            <img
                                src={prodTagsDropdown ? arrowUp : arrowDown}
                                alt='arrow-icon'
                                className='absolute right-3 w-4 h-4'
                            />
                        </div>
                        {prodTagsDropdown &&
                            <DropdownCard
                                handleClickOut={setProdTagsDropdown}
                                cardLayout={`${props.darkMode ? 'bg-Primary_800' : 'bg-white'} min-w-[150px] max-w-3/5 w-fit max-h-[200px] overflow-scroll flex flex-col gap-0 absolute z-10 right-0 top-20 rounded-md custom_container shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-fit animate-slide_down2`}
                            >
                                {availableTags?.map((item, i) => (
                                    <span key={i} 
                                        onClick={() => handleTagSelection(item)} 
                                        className={`${props.darkMode ? 'text-slate-500 hover:text-white' : 'text-Primary hover:text-PrimaryActive'} hover:bg-Primary_Accents_xs cursor-pointer font-normal text-sm leading-6 p-2`}>
                                        {item}
                                    </span>
                                ))
                                }
                            </DropdownCard>
                        }
                    </div>

                    <Dropzone
                        className={`p-2 border border-PrimaryActive rounded-md border-dashed ${props.darkMode ? 'bg-Primary_600' : 'bg-Primary_200'}`}
                        text='Drop your file here or choose file'
                        textStyle={`${props.darkMode ? 'text-Primary_300' : 'text-PrimaryActive'} font-normal text-sm text-PrimaryActive`}
                        label="Profile Image"
                        labelStyle={`font-normal text-sm leading-6 ${props.darkMode ? 'text-Primary' : 'text-PrimaryActive'}`}
                        style='w-3/5 tablet:w-full'
                        icon={DropzoneIcon}
                        acceptedExt={acceptedFileExt}
                        file={prodImages}
                        setFile={setProdImages}
                    />
                </div>

                <FormTextArea
                    name='description'
                    placeholder='Product Description'
                    label='Product Description'
                    labelStyle='font-normal text-sm leading-6 text-Black2'
                    inputStyle="border border-transparent text-PrimaryActive w-full"
                    layoutStyle='w-full'
                    value={prodDesc}
                    onChange={e => setProdDesc(e.target.value)}
                    rows={4}
                    img={editIcon}
                    imgStyle=''
                    imgOnClick={() => { }}
                />

                <div className='flex gap-5 justify-end'>
                    <Button
                        btnType='submit'
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

            {prodImages.length > 0 &&
                <div className='shadow-custom_border border-[.5px] bg-Background1 p-1 rounded-md desktop:w-2/5 w-1/4 mobile:w-full h-fit flex flex-wrap justify-start items-center gap-1'>
                    {prodImages && prodImages.map((item, i) => (
                        <span className='group relative transition ease-in-out duration-250 border-[.5px] border-NoColor hover:border-PrimaryActive rounded-md'>
                            <img src={cancelIcon}
                                alt='remove'
                                className='w-4 h-4 absolute top-1 right-1 hidden group-hover:block transition ease-in-out duration-250 animate-fade_in cursor-pointer'
                                onClick={() => setProdImages(prodImages.filter(itemData => itemData !== item))}
                            />
                            <img key={i} src={item.preview} alt='previewImg' className="max-w-[100px] max-h-[100px] desktop:w-[100px] desktop:h-[100px] tablet:w-full tablet:h-full h-auto object-cover object-center rounded-md" />
                        </span>
                    ))}
                    { }
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    userData: state.auth.user_authData,
    userId: state.auth.user_authData.data._id,
    accessToken: state.auth.user_authData.token.accessToken,
    currency: state.auth.user_authData.data.country.currencySymbol,
    darkMode: state.app.darkMode
})

export default connect(mapStateToProps, null)(AddProduct);