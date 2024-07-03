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

const acceptedFileExt = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpeg'],
    'image/jpg': ['.jpg']
}

const AddProduct = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [prodName, setProdName] = useState('');
    const [prodPrice, setProdPrice] = useState('');
    const [prodQuantity, setProdQuantity] = useState('');
    const [InputCategory, setInputCategory] = useState('');
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

    console.log('UserId:', props.userId);

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
        if (item.categoryName.toLowerCase().includes(InputCategory.toLowerCase())) {
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

        console.log("Add_product_res:", res);
    }

    // const uploadToCloudinary = async (file: any) => {
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset

    //     try {
    //         const res = await axios.post('https://api.cloudinary.com/v1_1/dtegg4r9t/image/upload', formData); // Replace with your Cloudinary URL
    //         console.log("res:", res.data);
    //         return res.data.secure_url;
    //     } catch (err) {
    //         console.error('Error uploading to Cloudinary:', err);
    //         return null;
    //     }
    // };

    // const handleSubmit = async (e: any) => {
    //     e.preventDefault();

    //     setLoading(true);

    //     const imageUrls = await Promise.all(prodImages.map(async (file: any) => {
    //         const uploadUrl = await uploadToCloudinary(file);
    //         return uploadUrl;
    //     }));

    //     const reqData = {
    //         sellerId: props.userId,
    //         name: prodName,
    //         description: prodDesc,
    //         price: prodPrice,
    //         quantity: prodQuantity,
    //         category: selectedCategory,
    //         tags: selectedProdTags,
    //         imageUrl: imageUrls
    //     };

    //     await addProduct(reqData);

    //     setLoading(false);
    //     handleCancelled();
    // };

    // const handleImageUpload = () => {
    //     setLoading(true)
    //     prodImages.forEach(async file => {
    //         const resUrl = await UploadFile(file);

    //         if (resUrl !== undefined) updateProfile({ imageUrl: resUrl.url }, 'update_profile_img');

    //         else setLoading(false);
    //     });
    // }

    console.log("fileUploadRes:", imgUploadRes);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (prodImages.length > 0) {
            setLoading(true); // Optional: set loading state if you have a spinner
    
            try {
                // Wait for all upload promises to resolve
                const uploadPromises = prodImages.map(file => UploadFile(file));
                const uploadResults = await Promise.all(uploadPromises);
    
                // Aggregate the URLs from the results
                // const imageUrls = uploadResults.map(res => ({ imageUrl: res.url }));
                const imageUrls = uploadResults.map(res => res.url);
                
                // Update the state with the aggregated URLs
                setImgUploadRes(imageUrls);
    
                console.log("fileUploadRes:", imageUrls);
    
                // Now, you can include imageUrls in your reqData
                const reqData = {
                    sellerId: props.userId,
                    name: prodName,
                    description: prodDesc,
                    price: prodPrice,
                    quantity: prodQuantity,
                    category: selectedCategory,
                    tags: selectedProdTags,
                    imageUrl: imageUrls, // Updated to include all uploaded image URLs
                };
    
                // Make the API request to add the product
                await addProduct(reqData);
            } catch (error) {
                console.error("Error uploading images:", error);
            } finally {
                setLoading(false); // Optional: reset loading state
            }
        }
    };
    

    // const handleSubmit = e => {
    //     e.preventDefault();

    //     // if(formComplete){
    //         if(prodImages.length > 0){
    //             prodImages.map(async file => {
    //                 const uploadRes = await UploadFile(file);

    //                 // if (uploadRes !== undefined) updateProfile({ imageUrl: uploadRes.url }, 'update_profile_img');
    //                 // if (uploadRes !== undefined) console.log("fileUploadRes:", uploadRes);
    //                 // setImgUploadRes({...imgUploadRes, uploadRes});

    //                 setImgUploadRes([...imgUploadRes, {imageUrl: uploadRes.url}]);
    //             });

    //             console.log("fileUploadRes:", imgUploadRes)
    //         }


    //         // const reqData = {
    //         //     sellerId: props.userId,
    //         //     name: prodName,
    //         //     description: prodDesc,
    //         //     price: prodPrice,
    //         //     quantity: prodQuantity,
    //         //     category: selectedCategory,
    //         //     tags: selectedProdTags,
    //         //     imageUrl: ''
    //         // }

    //         // appProduct(reqData);
    //     // }
    // }

    const handleCancelled = () => {
        setProdName('');
        setProdPrice('');
        setProdQuantity('');
        setSelectedCategory('');
        setSelectedProdTags([]);
        setProdImages([]);
        setImgUploadRes([]);
    }

    return (
        <div className='flex mobile:flex-col justify-between gap-5 w-full p-[2px] overflow-hidden'>
            <form onSubmit={handleSubmit} className='desktop:w-3/5 w-3/4 mobile:w-full flex flex-col flex-shrink gap-4 shadow-custom_border border-[.5px] bg-Background1 p-5 rounded-md'>
                <div className='flex tablet:flex-col gap-5'>
                    <FormInput
                        type='text'
                        name='product_name'
                        placeholder='Enter Product name'
                        label="Product Name"
                        labelStyle="font-normal text-sm leading-6 text-Black2"
                        inputStyle="border border-transparent text-PrimaryActive"
                        style='w-full'
                        value={prodName}
                        onChange={e => setProdName(e.target.value)}
                    />

                    <div className={`w-2/5 tablet:w-full relative z-[15] cursor-pointer`}>
                        <FormInput
                            type="text"
                            placeholder='Category'
                            style={` w-full relative z-[12]`}
                            inputStyle="border border-transparent text-PrimaryActive w-full bg-white"
                            label="Select Category"
                            labelStyle="font-normal text-sm leading-6 text-Black2"
                            inputStyle2='disabled cursor-pointer'
                            value={InputCategory}
                            onChange={e => {
                                setInputCategory(e.target.value)

                                if (e.target.value.length > 1) {
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
                            <div className={`min-w-[150px] max-w-3/5 w-fit max-h-[200px] overflow-scroll flex flex-col gap-0 absolute z-10 right-0 p-1 bg-white rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-fit animate-slide_down2`}>
                                {filteredData?.length === 0
                                    ? <span className='cursor-default font-normal text-sm leading-6 text-Danger rounded-md p-2 hover:bg-BackDrop_d_xs'>
                                        Not found
                                    </span>

                                    : filteredData?.map((item, i) => (
                                        <span key={i} onClick={() => {
                                            setInputCategory(item.categoryName)
                                            setSelectedCategory(item._id)
                                            setAvailableTags(item.subTag);
                                            setCategoryDropdown(false);
                                        }} className='cursor-pointer font-normal text-sm leading-6 text-Primary rounded-md p-2 hover:bg-BackDrop_d_xs'>
                                            {item.categoryName}
                                        </span>
                                    ))
                                }
                            </div>
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
                        <label className='font-normal text-sm leading-6 text-Black2 mb-2'>
                            Select Product Tags
                        </label>
                        <div className={`${selectedProdTags.length > 0 ? 'px-2 py-1' : 'p-2'} relative w-full bg-white cursor-pointer border rounded-md flex items-center`}
                            onClick={availableTags.length > 0 ? () => setProdTagsDropdown(prevState => !prevState) : () => Alert('error', 'Select Product category first')}
                        >
                            <div className='flex gap-3 items-center text-PrimaryActive overflow-x-scroll custom_container'>
                                {selectedProdTags.length > 0
                                    ? selectedProdTags.map(item => (
                                        <span className='group border px-3 py-1 whitespace-nowrap text-ellipsis rounded-md flex flex-shrink-0 gap-2 justify-between items-center transition ease-in-out duration-500'>
                                            {item}
                                            <img
                                                src={cancelIcon}
                                                alt='remove'
                                                className='hidden group-hover:block w-3 h-3 transition ease-in-out duration-500'
                                                onClick={() => setSelectedProdTags(selectedProdTags.filter(t => t !== item))}
                                            />
                                        </span>
                                    ))
                                    : 'Product Tags'}
                            </div>
                            <img src={prodTagsDropdown ? arrowUp : arrowDown} alt='arrow-icon' className='absolute right-3 w-4 h-4' />
                        </div>
                        {prodTagsDropdown &&
                            <div className={`min-w-[150px] max-w-3/5 w-fit max-h-[200px] overflow-scroll flex flex-col gap-0 absolute z-10 right-0 top-20 p-1 bg-white rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-fit animate-slide_down2`}>
                                {availableTags?.map((item, i) => (
                                    <span key={i} onClick={() => handleTagSelection(item)} className='cursor-pointer font-normal text-sm leading-6 text-Primary rounded-md p-2 hover:bg-BackDrop_d_xs'>
                                        {item}
                                    </span>
                                ))
                                }
                            </div>
                        }
                    </div>

                    <Dropzone
                        className='p-2 border border-PrimaryActive rounded-md border-dashed bg-Primary_200'
                        text='Drop your file here or choose file'
                        textStyle='font-normal text-sm text-PrimaryActive'
                        label="Profile Image"
                        labelStyle="font-normal text-sm leading-6 text-Black2"
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
                        btnStyle={`px-5 py-2 w-fit mobile:w-full font-bold text-base mobile:text-sm text-white bg-Primary ${!disableBtn && 'hover:bg-Primary_Accents_3xl'}`}
                        // disabled={disableBtn}
                        // disabledClass={`${disableBtn && 'cursor-not-allowed !text-Primary bg-PrimaryDisabled'}`}
                        onClick={() => { }}
                    />
                </div>
            </form>

            {prodImages.length > 0 &&
                <div className='shadow-custom_border border-[.5px] bg-Background1 p-1 rounded-md desktop:w-2/5 w-1/4 mobile:w-full h-fit flex flex-wrap justify-between items-center gap-1'>
                    {prodImages && prodImages.map((item, i) => (
                        <img key={i} src={item.preview} alt='previewImg' className="max-w-[100px] max-h-[100px] desktop:w-[100px] desktop:h-[100px] tablet:w-full tablet:h-full h-auto object-cover object-center rounded-md" />
                    ))}
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    userData: state.auth.user_authData,
    userId: state.auth.user_authData.data._id,
    accessToken: state.auth.user_authData.token.accessToken
})

export default connect(mapStateToProps, null)(AddProduct);