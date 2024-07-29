import React, { useEffect, useState } from 'react';
import AppModal from '../organisms/CustomModal';
import FormInput from 'components/atoms/FormInput';
import closeIcon from '../../assets/svg/close_x_red.svg';
import searchIcon from '../../assets/svg/navIcons/search_linear.svg';
import { connect } from 'react-redux';
import { storeSearchQuery } from '../../redux/app/app.action';

const SearchBox = (props) => {

    return (
        <div className={`${props.layout} relative animate-fade_in flex items-center gap-2`}>
            <span className='absolute z-10 left-2 w-5 h-5'>
                <img src={searchIcon} alt='search-box' className='w-full h-full object-cover object-center'/>
            </span>
            <FormInput
                type='text'
                placeholder='Search...'
                inputStyle="text-PrimaryActive justify-end"
                inputStyle2='!w-[85%] mobile:!w-[78%]'
                style='w-full'
                indicatorStyle='hidden'
                value={props.search_query}
                onChange={e => props.storeSearchQuery(e.target.value)}
                img={closeIcon}
                imgStyle='w-4 h-4 cursor-pointer'
                imgOnClick={() => {
                    props.setShowSearch(false);
                    props.storeSearchQuery('');
                }}
            />
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    search_query: state.app.search_query
});

const mapDispatchToProps = (dispatch: any) => ({
    storeSearchQuery: (data: any) => dispatch(storeSearchQuery(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);