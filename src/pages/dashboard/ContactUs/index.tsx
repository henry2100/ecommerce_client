import React from 'react';
import ChatComponent from './ChatComponent';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';

const Chat = (props) => {
    const location = useLocation();
    const {sellerId} = location.state || {};
    const userId = props?.authData?.data._id;

    console.log("ID:", {
        userId: userId,
        sellerId: sellerId
    });
    

    return (
        <div className="p-8">
            <h1 className={`${props.darkMode ? 'text-Primary' : 'text-PrimaryActive'} text-2xl font-bold mb-4`}>Chat System</h1>
            <ChatComponent 
                userId={userId} 
                sellerId={sellerId}
            />
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    darkMode: state.app.darkMode,
    authData: state.auth?.user_authData
});

export default connect(mapStateToProps, null)(Chat);