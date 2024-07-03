import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import { connect } from 'react-redux';
import { generateRandomAlphanumeric, getBusinessInitials } from 'utils';
// import Dropdown from 'components/atoms/Dropdown/index';
import closeIcon from '../../../assets/svg/close-circle-solid.svg';

type Props = {
  data: any[];
  loading?: boolean;
  errorState?: boolean;
  currentPage?: number;
  recordsPerPage: number;
  dataLength?: any;
  navKey?: string;
  rowStatus?: any;
  storeNavKey?: (data: any) => void;
  getCurrentPage?: (pageNum: number) => void;
} & ReturnType<typeof mapStateToProps>;

const FromCSV = (props: Props) => {
  const [dropdown, setDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [businessInitials, setBusinessInitials] = useState('');
  const [fileDataWithRef, setFileDataWithRef] = useState<any[]>([]);
  const [modalId, setModalId] = useState(null);
  const { pocketAccountInfo } = props;

  console.log('rowStatus:', props.rowStatus);

  useEffect(() => {
    if (pocketAccountInfo) {
      setBusinessInitials(
        getBusinessInitials(pocketAccountInfo.pocketOwner.businessName)
      );
      // setFileDataWithRef(props.data.map((item: any) => ({ ...item, reference })));
    }
  }, [pocketAccountInfo]);

  console.log('file data: ', props.data);

  const fileData = props.data;

  const headers = fileData?.length > 0 ? Object.keys(fileData[0]) : [];

  const navigate = useNavigate();

  const handleClick = () => {
    props.navKey && navigate(props.navKey);
    props.storeNavKey && props.storeNavKey('');
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    props.getCurrentPage && props.getCurrentPage(pageNumber);
  };

  const handleDropdown = (e) => {
    setModalId(e.target.id);
    setDropdown((prevState) => !prevState);
  };

  const handleDropdownOpen = (e) => {
    setModalId(e.target.id);
    // setDropdown(prevState => !prevState)
    setDropdown(true);
  };

  const handleDropdownClose = (e) => {
    setModalId(e.target.id);
    // setDropdown(prevState => !prevState)
    setDropdown(false);
  };

  return (
    <div className='w-full h-fit max-h-[58vh] mobile:max-h-auto rounded-lg flex flex-col justify-between'>
      <div className='w-full h-full overflow-x-auto rounded-lg bg-white custom_container relative z-[0px]'>
        <table
          className={`min-w-full mobile:min-h-full divide-y divide-gray-200`}
        >
          <thead>
            <tr className='bg-Background3 sticky z-[18] top-0 shadow-md w-full'>
              <th
                className={`px-6 py-3 text-left text-sm mobile:text-xs font-semibold text-gray-500 uppercase tracking-wider truncate bg-Green_Accent8`}
              >
                s/n
              </th>
              {headers?.map((header, index) => (
                <th
                  key={index}
                  className={`px-6 py-3 text-left text-sm mobile:text-xs font-semibold text-gray-500 uppercase tracking-wider truncate`}
                >
                  {header}
                </th>
              ))}
              {props.rowStatus && (
                <th
                  className={`px-6 py-3 text-left text-sm mobile:text-xs font-semibold text-gray-500 uppercase tracking-wider truncate`}
                >
                  Status
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {fileData.map((row, index) => (
              <tr
                key={index}
                className={`border-b border-gray-100 hover:bg-GrayCustom3 hover:bg-opacity-30 transition-all cursor-pointer`}
                onClick={handleClick}
              >
                <td key={index} className='bg-Green_Accent8'>
                  <div
                    onClick={() => {}}
                    className='px-6 py-5 flex justify-start items-center'
                  >
                    <span
                      className={`text-Gray700 text-opacity-70 text-base cursor-default font-semibold`}
                    >
                      {index + 1}
                    </span>
                  </div>
                </td>
                {headers?.map((item, columnIndex) => (
                  <td
                    key={columnIndex}
                    className='whitespace-nowrap text-sm mobile:text-xs font-medium text-gray-900'
                  >
                    <div
                      onClick={() => {}}
                      className='px-6 py-5 flex justify-start items-center'
                    >
                      <span
                        className={`text-Gray700 text-opacity-70 text-xs cursor-default`}
                      >
                        {row[item]}
                      </span>
                    </div>
                  </td>
                ))}
                {props.rowStatus &&
                  props.rowStatus.map(
                    (item: any, i) =>
                      i === index && (
                        <td
                          key={i}
                          className='whitespace-nowrap text-sm mobile:text-xs font-medium text-gray-900 relative'
                        >
                          <div
                            onClick={() => {}}
                            className='px-6 py-5 flex justify-start items-center gap-4'
                          >
                            <span
                              className={`
                                                ${
                                                  item.validity === 'Valid'
                                                    ? 'bg-Green_Accent8 text-Success2'
                                                    : 'bg-DangerAccent5 text-Danger4'
                                                } px-[10px] py-[5px] w-[54px] text-center rounded-md text-Gray700 text-opacity-70 text-xs cursor-default
                                            `}
                            >
                              {item.validity}
                            </span>
                            {item.validity === 'Valid' ? (
                              <span className='text-Success2 border border-Success2 bg-white rounded-md text-xs px-[10px] py-[5px] font-normal cursor-default'>
                                {item.errorReport}
                              </span>
                            ) : (
                              <>
                                <div
                                  className={`relative flex mobile:hidden transition-all w-[40%]`}
                                  onMouseEnter={(e) => handleDropdownOpen(e)}
                                  onClick={(e) => handleDropdownClose(e)}
                                >
                                  <span
                                    id={`${i}`}
                                    className={`border border-Primary rounded-md px-[10px] py-[5px] bg-white text-Primary text-xs font-normal hover:shadow-md transition-all`}
                                  >
                                    View Report
                                  </span>
                                </div>

                                <div
                                  className={`relative hidden mobile:flex transition-all w-[40%]`}
                                  onClick={(e) => handleDropdown(e)}
                                >
                                  <span
                                    id={`${i}`}
                                    className={`border border-Primary rounded-md px-[10px] py-[5px] bg-white text-Primary text-xs font-normal hover:shadow-md transition-all`}
                                  >
                                    View Report
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                          {dropdown && modalId == index && (
                            <div
                              className={`overflow-x-hidden flex tablet:hidden flex-col justify-start gap-[5px] absolute z-20 w-fit h-fit right-20 ${
                                index <= 3 ? 'top-0' : 'bottom-0'
                              }`}
                              onMouseLeave={(e) => handleDropdownClose(e)}
                            >
                              {/* <div onClick={e=>handleDropdownClose(e)}>
                                                <img src={closeIcon} alt='close' id={`${i}`} className='w-4 h-4 absolute -right-5 top-2 cursor-pointer'/>
                                            </div> */}
                              {item.validity === 'Invalid' &&
                                item.errorReport.map(
                                  (errItem, i) =>
                                    errItem !== undefined && (
                                      <div className='flex items-center gap-[6px] w-fit px-3 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] animate-slide_left2 bg-white rounded-md'>
                                        <span className='w-[8px] h-[8px] rounded-full bg-Primary flex-shrink-0'></span>
                                        <span className='text-Primary text-base font-normal flex-shrink-0 break-normal'>
                                          {errItem}
                                        </span>
                                      </div>
                                    )
                                )}
                            </div>
                          )}
                          <div
                            className={`hidden tablet:flex absolute z-[25] max-w-[500px] mobile:max-w-[320px] w-fit h-fit ${
                              index <= 3 ? 'top-2' : 'bottom-[5px]'
                            } right-5 rounded-lg`}
                          >
                            <div
                              onClick={(e) => handleDropdownClose(e)}
                              className='absolute z-[21] rounded-full right-1 top-1 cursor-pointer'
                            >
                              <img
                                src={closeIcon}
                                alt='close'
                                id={`${i}`}
                                className='w-5 h-5'
                              />
                            </div>
                            {dropdown && modalId == index && (
                              <div className='relative flex flex-col gap-2 p-5 pt-8 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-scroll custom_container animate-slide_left2 bg-GrayCustom6 w-full h-fit'>
                                {item.validity === 'Invalid' ? (
                                  item.errorReport.map(
                                    (errItem, i) =>
                                      errItem !== undefined && (
                                        <div className='py-[2px] w-fit break-normal flex gap-1 rounded-lg items-center'>
                                          <span className='w-[6px] h-[6px] rounded-full bg-Primary flex-shrink-0'></span>
                                          <p className='text-Primary text-base font-normal flex-shrink-0'>
                                            {errItem}
                                          </p>
                                        </div>
                                      )
                                  )
                                ) : item.validity === 'Invalid' &&
                                  item.errorReport.some(
                                    (err) => err === undefined
                                  ) ? (
                                  <div className='py-[2px] w-fit break-normal flex gap-1 rounded-lg items-center'>
                                    <span className='w-[6px] h-[6px] rounded-full bg-Primary flex-shrink-0'></span>
                                    <p className='text-Primary text-base font-normal flex-shrink-0'>
                                      Empty transaction row!
                                    </p>
                                  </div>
                                ) : (
                                  <div className='py-[2px] w-fit break-normal flex gap-1 rounded-lg items-center'>
                                    <span className='w-[6px] h-[6px] rounded-full bg-Primary flex-shrink-0'></span>
                                    <p className='text-Primary text-base font-normal flex-shrink-0'>
                                      Empty transaction row!
                                    </p>
                                  </div>
                                )}
                                {/* <div className={`${item.validity === 'Invalid' && row[item] === '\"\"' ? 'flex' : 'hidden'} py-[2px] w-fit break-normal gap-1 rounded-lg items-center`}>
                                                    <span className='w-[6px] h-[6px] rounded-full bg-Primary flex-shrink-0'></span>
                                                    <p className='text-Primary text-base font-normal flex-shrink-0'><b>Invalid</b> transaction row!</p>
                                                </div> */}
                              </div>
                            )}
                          </div>
                        </td>
                      )
                  )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* {fileData.length > 0 && totalPages > 1 && !props.errorState && <Pagination
                addedStyle="!p-0"
                currentPage={currentPage}
                totalPages={totalPages}
                totalData={fileData.length}
                onPageChange={handlePageChange}
            />} */}
    </div>
  );
};
const mapStateToProps = (state) => ({
  pocketAccountInfo: state.pocket.pocketAccountInfo,
});
export default connect(mapStateToProps)(FromCSV);
