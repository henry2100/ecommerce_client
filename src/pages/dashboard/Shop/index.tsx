import React, { useEffect, useState } from 'react'
import { BASE_URL, getRequest } from 'services/http';
import Alert from 'components/atoms/Alert';
import ProductCard from 'components/molecules/ProductCard';
import Spinner from 'components/atoms/Spinner';
import { connect } from 'react-redux';

const Shop = (props) => {
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [products, setProducts] = useState<any>([]);

    const refreshState = () => setRefresh(prevState => !prevState);

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${props.accessToken}`
    }

    const getProducts = async () => {
        setLoading(true);
        const res = await getRequest(`${BASE_URL}products`, headers);

        console.log("Products_res:", res);

        if (res?.status === 200) {
            setLoading(false);
            setProducts(res?.data.data);
            Alert('success', 'Products fetched successfully');
        } else {
            setLoading(false);
            // Alert('error', 'Error fetching Products');
        }
    }

    console.log("UserAuthData:", {
        userLogStatus: props.loggedIn,
        userAuthData: props.authData
    });


    useEffect(() => {
        getProducts();
    }, [refresh]);


    return (
        <div className={`desktop:px-32 desktop:py-10 px-16 py-8 mobile:p-3 min-h-[65vh] ${loading ? 'flex justify-center items-center' : ''}`}>
            {loading
                ? <Spinner
                    text='Fetching Products...'
                    textStyle='text-lg font-semibold text-Primary'
                    borderStyle='border-4 border-Primary border-r-transparent w-8 h-8'
                />

                : <div className='grid desktop:grid-cols-4 tablet:grid-cols-2 desktop:gap-8 gap-6 mobile:gap-4'>
                    {products?.map((item, i) => (
                        <ProductCard
                            key={i}
                            productId={item._id}
                            productImg={item.imageUrl}
                            name={item.name}
                            desc={item.description}
                            price={item.price}
                            quantity={item.quantity}
                        />
                    )).reverse()}
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    loggedIn: state.auth.user_loggedIn,
    authData: state.auth.user_authData,
    accessToken: state.auth.user_authData.token.accessToken
});

export default connect(mapStateToProps, null)(Shop);