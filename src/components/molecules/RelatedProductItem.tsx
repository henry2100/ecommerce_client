import React from 'react';
import Button from 'components/atoms/Button';
import { connect } from 'react-redux';
import { ToTitleCase } from 'components/atoms/CaseManager';
import { useNavigate } from 'react-router';

const RelatedProductItem = (props) => {
    const navigate = useNavigate();

    return (
        <div className={`${props.darkMode ? 'bg-BackDrop_d_md' : 'bg-Primary_200'} p-5 mx-5 rounded-md min-h-[20vh] min-w-1/3 max-w-sm flex mobile:flex-col gap-5 flex-shrink-0`}>
            <div className='desktop:max-w-[200px] desktop:max-h-[200px] min-w-[185px] min-h-[185px] w-[200px] h-[200px] mobile:w-full mobile:h-full rounded-md overflow-hidden'>
                <img src={props.imageUrl[0]} alt='product thumbnail' className='w-full h-full object-center object-cover object-fit' />
            </div>
            <div className='flex flex-col justify-between gap-1'>
                <span className='flex flex-col gap-1'>
                    <p className={`${props.darkMode ? 'text-Primary' : 'text-SecondaryAccent'} font-bold text-base mobile:text-sm`}>{props.name}</p>
                    <p className='text-Primary text-xs font-normal'>{ ToTitleCase(props?.category)}</p>
                </span>
                <span className={`font-semibold text-base ${props.darkMode ? 'text-Primary_200' : 'text-Primary_700'} w-full text-right`}>
                    {props?.currency+' '+props?.price}
                </span>
                <Button
                    btnType='button'
                    btnText='View'
                    btnStyle={`${props.darkMode ? 'bg-BackDrop_d_xl text-white' : 'bg-Primary_Accents_md text-Primary'} w-full relative right-0 top-0 z-[22] mb-0 text-sm !rounded-lg truncate flex gap-4 justify-center items-center px-5 py-2 font-normal text-base leading-7 rounded-lg truncate transition ease-in-out duration-250`}
                    onClick={() => navigate(`/dashboard/product/${props._id}`)}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    darkMode: state.app.darkMode
});
export default connect(mapStateToProps, null)(RelatedProductItem);