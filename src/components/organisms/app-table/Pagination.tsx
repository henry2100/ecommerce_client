import React from 'react';
import { connect } from "react-redux";
import arrow_left from '../../../assets/svg/arrows/arrow_dl.svg';
import arrow_right from '../../../assets/svg/arrows/arrow_dr.svg';

import arrow_left_w from '../../../assets/svg/arrows/arrow_wl.svg';
import arrow_right_w from '../../../assets/svg/arrows/arrow_wr.svg';

type PaginationProps = ReturnType<typeof mapStateToProps> & {
  addedStyle?: string;
  currentPage: number;
  totalPages: number;
  totalData?: number;
  darkMode: boolean;
  onPageChange: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ addedStyle, currentPage, totalPages, totalData, onPageChange, darkMode }) => {
  const pageNumbers = Array.from({ length: totalPages }).map((_, index) => index + 1);

  // Determine the range of page numbers to display
  let startPage = currentPage - 1;
  let endPage = currentPage + 1;

  // Adjust the range if it exceeds the total number of pages
  if (startPage < 1) {
    endPage += Math.abs(startPage) + 1;
    startPage = 1;
  }
  if (endPage > totalPages) {
    startPage -= endPage - totalPages;
    endPage = totalPages;
  }

  // Add the truncation logic to show dots if there are more pages
  const shouldShowStartDots = startPage > 1;
  const shouldShowEndDots = endPage < totalPages;

  return (
    <div className={`${addedStyle} flex mobile:flex-col-reverse desktop:items-start items-center py-2 justify-between desktop:bottom-0 left-0 w-full mobile:gap-5`}>
      <div className={`${darkMode ? 'bg-Primary_800' : 'bg-Background1 shadow-sm'} flex flex-col mobile:justify-between mobile:w-full py-1 px-2 rounded-md`}>
        <span className='font-normal text-[15px] leading-7 text-Primary'>Showing <b className={`${darkMode ? 'text-white' : 'text-PrimaryActive'}`}>{currentPage}</b> of <b className={`${darkMode ? 'text-white' : 'text-PrimaryActive'}`}>{totalPages}</b> pages</span>
        <span className='font-normal text-[15px] leading-7 text-Primary'>Total: <b className={`${darkMode ? 'text-white' : 'text-PrimaryActive'}`}>{totalData}</b></span>
      </div>
      <nav className="flex items-center">
        <button
          className={`p-[10px] font-medium rounded-md flex-shrink-0 'text-gray-500 hover:bg-Primary_Accents_xs transition ease-in-out duration-250`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src={darkMode ? arrow_left_w : arrow_left} alt="" className='w-4 h-4'/>
        </button>
        {shouldShowStartDots && (
          <button
            className={`ml-2 px-3 py-1 font-medium rounded-md transition ease-in-out duration-250  ${
              1 === currentPage ? darkMode ? 'bg-Primary_Accents_md text-PrimaryDisabled hover:text-white' : 'bg-Primary_Accents_lg text-PrimaryActive hover:text-Primary_900' : 'text-Primary hover:bg-Primary_Accents_xs'
            }`}
            onClick={() => onPageChange(1)}
          >
            1
          </button>
        )}
        {shouldShowStartDots && (
          <span className="mx-2">...</span>
        )}
        {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`ml-2 px-3 py-1 font-medium rounded-md transition ease-in-out duration-250  ${
              pageNumber === currentPage ? darkMode ? 'bg-Primary_Accents_md text-PrimaryDisabled hover:text-white' : 'bg-Primary_Accents_lg text-PrimaryActive hover:text-Primary_900' : 'text-Primary hover:bg-Primary_Accents_xs'
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        {shouldShowEndDots && (
          <span className="mx-2">...</span>
        )}
        {shouldShowEndDots && (
          <button
            className={`ml-2 px-3 py-1 font-medium rounded-md transition ease-in-out duration-250  ${
              totalPages === currentPage ? darkMode ? 'bg-Primary_Accents_md text-PrimaryDisabled hover:text-white' : 'bg-Primary_Accents_lg text-PrimaryActive hover:text-Primary_900' : 'text-Primary hover:bg-Primary_Accents_xs'
            }`}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        )}
        <button
          className='ml-3 p-[10px] font-medium rounded-md flex-shrink-0 hover:bg-Primary_Accents_xs transition ease-in-out duration-250'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <img src={darkMode ? arrow_right_w : arrow_right} alt="" className='w-4 h-4'/>
        </button>
      </nav>
    </div>
  );
};
  
const mapStateToProps = (state: any) => ({ 
  darkMode: state.app.darkMode 
});

export default connect(mapStateToProps)(Pagination);
