import React, { useEffect, useState } from 'react';
import AppModal from '../organisms/CustomModal';
import FormInput from 'components/atoms/FormInput';
import closeIcon from '../../assets/svg/close_x_red.svg';
import searchIcon from '../../assets/svg/navIcons/search_linear.svg';
import { connect } from 'react-redux';
import { storeSearchQuery } from '../../redux/app/app.action';
import { trimString } from 'components/atoms/CaseManager';

const SearchBox = (props) => {

    console.log("Test:", {
        showSearch: props.showSearch
    });

    return (
        <div className={`${props.layout} animate-fade_in flex justify-center items-center gap-3 pt-2`}>
            <img src={searchIcon} alt='search-box' className='w-5 h-5' />
            <FormInput
                type='search'
                name='search_query'
                placeholder='Search...'
                inputStyle="border-b border-transparent rounded-none !bg-NoColor text-PrimaryActive"
                inputStyle2='!p-1'
                style='w-full'
                value={props.search_query}
                // onChange={e => props.storeSearchQuery(trimString(e.target.value))}
                onChange={e => props.storeSearchQuery(e.target.value)}
            />
            <img src={closeIcon} alt='search-box' className='w-4 h-4 cursor-pointer' onClick={() => {
                props.setShowSearch(false);
                props.storeSearchQuery('');
            }} />
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