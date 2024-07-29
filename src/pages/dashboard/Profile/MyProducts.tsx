import React, { useEffect, useState } from 'react';
import Spinner from 'components/atoms/Spinner';
import AdminProductCard from 'components/molecules/AdminProductCard';
import { BASE_URL, getRequest } from 'services/http';
import Alert from 'components/atoms/Alert';
import { connect } from 'react-redux';
import ErrorEmptyState from 'components/atoms/ErrorEmptyState';
import Pagination from 'components/organisms/app-table/Pagination';
import reloadIcon from '../../../assets/svg/refresh.svg';

const MyProducts = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(Boolean);
    const [products, setProducts] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNum, setPageNum] = useState<any>(null);
    const [recordsPerPage] = useState(8);

    const refreshState = () => setRefresh(prevState => !prevState);

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${props.accessToken}`
    }

    const getUserProducts = async () => {
        setLoading(true);
        const res = await getRequest(`${BASE_URL}products`, headers);

        if (res?.status === 200) {
            setLoading(false);
            const filteredData = res?.data.data.filter(item => item.sellerId === props.sellerId).reverse();

            if (filteredData.length === 0) {
                Alert('info', 'You have no products yet');
            } else {
                setProducts(filteredData);
                Alert('success', 'Products retrieved successfully');
            }

            console.log("Products:", filteredData);
        } else {
            setLoading(false);
            Alert('error', 'Error fetching Products');
        }
    }

    useEffect(() => {
        getUserProducts();
    }, []);

    const indexOfLastItem = currentPage * recordsPerPage;
    const indexOfFirstItem = indexOfLastItem - recordsPerPage;
    const totalPages = Math.ceil(products.length / recordsPerPage);
    const currentData = products.slice(indexOfFirstItem, indexOfLastItem);

    const getCurrentPage = (pageNumber) => {
        setPageNum(pageNumber);
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        getCurrentPage(pageNumber);
    }

    return (
        <div className={`min-h-[40vh] h-fit flex ${loading ? 'justify-center items-center' : 'flex-col justify-between gap-12'}`}>
            {loading
                ? <Spinner
                    text='Fetching Products...'
                    textStyle='text-lg font-semibold text-Primary'
                    borderStyle='border-4 border-Primary border-r-transparent w-8 h-8'
                />

                : <div className={`${products.length < 1 ? 'flex flex-row justify-center items-center' : 'grid desktop:py-8 py-6 mobile:p-2'} desktop:grid-cols-4 grid-cols-3 mobile:grid-cols-1 mx-auto desktop:gap-8 gap-6 mobile:gap-4`}>
                    {products.length < 1
                        ? <ErrorEmptyState
                            img={true}
                            errorMssg='You have not uploaded any products yet'
                            style='!bg-NoColor !border-none left-0 right-0 bottom-0 mx-auto !relative'
                            btn={true}
                            btnText='Reload'
                            btnStyle="!bg-Primary_200 !text-Primary"
                            btnImg={reloadIcon}
                            btnImgStyle={`w-4 h-4 transition ease-in-out duration-500 ${loading && 'animate-fullRoll'}`}
                            onClick={refreshState}
                        />

                        : currentData.map((item, i) => (
                            <AdminProductCard
                                key={i}
                                productId={item._id}
                                productImg={item.imageUrl}
                                name={item.name}
                                desc={item.description}
                                price={item.price}
                                quantity={item.quantity}
                            />
                        ))
                    }
                </div>
            }
            {products.length > 0 && totalPages > 1 && !loading && <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalData={products.length}
                onPageChange={handlePageChange}
            />}
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    userData: state.auth?.user_authData,
    sellerId: state.auth?.user_authData.data._id,
    accessToken: state.auth?.user_authData.token.accessToken
})

export default connect(mapStateToProps, null)(MyProducts);