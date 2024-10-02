import React, { useEffect, useState } from 'react'
import { BASE_URL, getRequest } from 'services/http';
import Alert from 'components/atoms/Alert';
import ProductCard from 'components/molecules/ProductCard';
import Spinner from 'components/atoms/Spinner';
import { connect } from 'react-redux';
import ErrorEmptyState from 'components/atoms/ErrorEmptyState';
import { trimString } from 'components/atoms/CaseManager';
import Pagination from 'components/organisms/app-table/Pagination';
import reloadIcon from '../../../assets/svg/refresh.svg';
import { storeSearchQuery } from '../../../redux/app/app.action';
import Button from 'components/atoms/Button';

const Home = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(Boolean);
    const [products, setProducts] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNum, setPageNum] = useState<any>(null);
    const [recordsPerPage] = useState(12);

    const refreshState = () => setRefresh(prevState => !prevState);

    const headers = {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${props.accessToken}`
    }

    const getProducts = async () => {
        setLoading(true);
        const res = await getRequest(`${BASE_URL}products`, headers);

        if (res?.status === 200) {
            setLoading(false);
            setProducts(res?.data.data);
            // Alert('success', res?.data.message, props.darkMode);
        } else {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
        props.storeSearchQuery('');
    }, [refresh]);

    useEffect(() => {
        if (props.showSearch) setCurrentPage(1);
    }, [props.showSearch]);

    const filteredData = products?.filter(item => {
        if (item.name.toLowerCase().includes(trimString(props.search_query)?.toLowerCase())) {
            return item;
        }
        else {
            return;
        }
    }).reverse();


    const indexOfLastItem = currentPage * recordsPerPage;
    const indexOfFirstItem = indexOfLastItem - recordsPerPage;
    const totalPages = Math.ceil(filteredData?.length / recordsPerPage);
    const currentData = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

    const getCurrentPage = (pageNumber) => {
        setPageNum(pageNumber);
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        getCurrentPage(pageNumber);
    }

    return (
        <div className={`relative desktop:px-32 desktop:py-10 px-16 py-8 mobile:p-3 min-h-[90vh] flex ${loading ? 'justify-center items-center' : 'flex-col justify-between gap-12'}`}>
            {loading
                ? <Spinner
                    text='Fetching Products...'
                    textStyle='text-lg font-semibold text-Primary'
                    borderStyle='border-4 border-Primary border-r-transparent w-8 h-8'
                />

                : <div className='grid desktop:grid-cols-4 grid-cols-3 mobile:grid-cols-2 desktop:gap-x-10 desktop:gap-y-16 gap-6 mobile:gap-4 mt-12 mobile:mt-5' >
                    {filteredData?.length === 0
                        ? <ErrorEmptyState
                            img={true}
                            style='!bg-NoColor !border-none left-0 right-0 bottom-0 mx-auto'
                            btn={true}
                            btnText='Reload'
                            btnStyle="!bg-Primary_200 !text-Primary"
                            btnImg={reloadIcon}
                            btnImgStyle={`w-4 h-4 transition ease-in-out duration-500 ${loading && 'animate-fullRoll'}`}
                            onClick={refreshState}
                        />

                        : currentData?.map((item, i) => (
                            <ProductCard
                                key={i}
                                productId={item._id}
                                productImg={item.imageUrl}
                                currency={item.currency}
                                category={item.category}
                                tags={item.tags}
                                name={item.name}
                                desc={item.description}
                                price={item.price}
                                quantity={item.quantity}
                            />
                        ))}
                </div>
            }
            {filteredData.length > 0 && totalPages > 1 && !loading && <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalData={filteredData.length}
                itemsPerPage={recordsPerPage}
                onPageChange={handlePageChange}
            />}
        </div>
    )
}

const mapStateToProps = state => ({
    darkMode: state.app.darkMode,
    search_query: state.app.search_query,
    showSearch: state.app.search_status,
});

const mapDispatchToProps = dispatch => ({
    storeSearchQuery: (data: any) => dispatch(storeSearchQuery(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
