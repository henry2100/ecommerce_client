import React, { useEffect, useState } from 'react';
import Spinner from 'components/atoms/Spinner';
import AdminProductCard from 'components/molecules/AdminProductCard';
import { BASE_URL, getRequest } from 'services/http';
import Alert from 'components/atoms/Alert';
import { connect } from 'react-redux';
import ErrorEmptyState from 'components/atoms/ErrorEmptyState';
import Pagination from 'components/organisms/app-table/Pagination';

const MyProducts = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNum, setPageNum] = useState<any>(null);
    const [recordsPerPage] = useState(12);

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

                : <div className={`${products.length < 1 ? 'flex flex-row justify-center items-center' : 'grid'} desktop:grid-cols-4 tablet:grid-cols-2 desktop:gap-8 gap-6 mobile:gap-4`}>
                    {products.length < 1
                        ? <ErrorEmptyState img={true}
                            errorMssg='You have not uploaded any products yet'
                            style='!relative'
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