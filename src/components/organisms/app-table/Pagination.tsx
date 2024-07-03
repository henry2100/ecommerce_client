import React from 'react';
import { connect } from "react-redux";
import arrow_left from '../../../assets/svg/arrow-left.svg'
import arrow_right from '../../../assets/svg/arrow-right.svg'

type PaginationProps = ReturnType<typeof mapStateToProps> & {
  addedStyle?: string;
  currentPage: number;
  totalPages: number;
  totalData?: number
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
    <div className={`${addedStyle} flex mobile:flex-col-reverse items-center py-2 justify-between desktop:bottom-0 left-0 w-full mobile:gap-5`}>
      <div className='flex flex-col mobile:justify-between mobile:w-full'>
        <span className='font-normal text-[15px] leading-7 text-black'>Showing <b>{currentPage}</b> of <b>{totalPages}</b></span>
        <span className='font-bold text-[15px] leading-7 text-black'>Total: {totalData}</span>
      </div>
      <nav className="flex items-center">
        <button
          className={`p-[10px] font-medium rounded-md flex-shrink-0 ${darkMode ? 'text-Gray300 bg-DarkBg3' : 'text-gray-500 bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src={arrow_left} alt="" className='w-3 h-3'/>
        </button>
        {shouldShowStartDots && (
          <button
            className={`ml-2 px-3 py-1 font-medium rounded-md hover:text-Accent_blue ${
              1 === currentPage ? `${darkMode ? 'bg-gray-200 text-DarkBg3' : 'bg-DarkBg3 text-white'}` : ''
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
            className={`ml-2 px-3 py-1 font-medium rounded-md hover:text-Accent_blue ${
              pageNumber === currentPage ? `${darkMode ? 'bg-gray-200 text-DarkBg3' : 'bg-DarkBg3 text-white'}` : ''
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
            className={`ml-2 px-3 py-1 font-medium rounded-md hover:text-Accent_blue ${
              totalPages === currentPage ? `${darkMode ? 'bg-gray-200 text-DarkBg3' : 'bg-DarkBg3 text-white'}` : ''
            }`}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        )}
        <button
          className={`ml-3 p-[10px] font-medium rounded-md flex-shrink-0 ${
            darkMode ? 'text-Gray300 bg-DarkBg3' : 'text-gray-500 bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <img src={arrow_right} alt="" className='w-3 h-3'/>
        </button>
      </nav>
    </div>
  );
};
  
const mapStateToProps = (state: any) => ({ 
  darkMode: state.app.darkMode 
});

export default connect(mapStateToProps)(Pagination);
