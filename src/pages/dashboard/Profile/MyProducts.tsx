import React, { useEffect, useState } from 'react';
import Spinner from 'components/atoms/Spinner';
import AdminProductCard from 'components/molecules/AdminProductCard';
import { BASE_URL, getRequest } from 'services/http';
import Alert from 'components/atoms/Alert';
import { connect } from 'react-redux';
import ErrorEmptyState from 'components/atoms/ErrorEmptyState';

const MyProducts = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<any>([]);

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${props.accessToken}`
    }

    const getUserProducts = async () => {
        setLoading(true);
        // const res = await getRequest(`${BASE_URL}products/seller/${props.sellerId}`, headers);
        const res = await getRequest(`${BASE_URL}products`, headers);

        if (res?.status === 200) {
            setLoading(false);
            const filteredData = res?.data.data.filter(item => item.sellerId === props.sellerId);

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

    return (
        <div className={`min-h-[40vh] h-fit ${loading ? 'flex justify-center items-center' : ''}`}>
            {loading
                ? <Spinner
                    text='Fetching Products...'
                    textStyle='text-lg font-semibold text-Primary'
                    borderStyle='border-4 border-Primary border-r-transparent w-8 h-8'
                />

                : <div className={`${products.length < 1 ? 'flex flex-row justify-center items-center' : 'grid'} desktop:grid-cols-3 tablet:grid-cols-2 desktop:gap-8 gap-6 mobile:gap-4`}>
                    {products.length < 1
                        ? <ErrorEmptyState img={true}
                            errorMssg='You have not uploaded any products yet'
                            style='!relative'
                        />

                        : products.map((item, i) => (
                            <AdminProductCard
                                key={i}
                                productId={item._id}
                                name={item.name}
                                desc={item.description}
                                price={item.price}
                                quantity={item.quantity}
                            />
                        ))
                    }
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    userData: state.auth?.user_authData,
    sellerId: state.auth?.user_authData.data._id,
    accessToken: state.auth?.user_authData.token.accessToken
})

export default connect(mapStateToProps, null)(MyProducts);