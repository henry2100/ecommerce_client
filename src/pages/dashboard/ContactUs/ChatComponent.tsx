import React, { useState, useEffect, useRef, ChangeEvent, MouseEvent } from 'react';
import { connect } from 'react-redux';
import Button from 'components/atoms/Button';
import FormInput from 'components/atoms/FormInput';
import io, { Socket } from 'socket.io-client';
import { BASE_URL } from 'services/http';

interface Message {
    sender: string;
    receiver: string;
    text: string;
    timestamp?: Date;
}

interface ChatComponentProps {
    userId: string;
    sellerId: string;
    darkMode: boolean;
    authData:any
}

const ENDPOINT = `${BASE_URL}`;
var socket, selectedChatCompare;

const ChatComponent: React.FC<ChatComponentProps> = ({ userId, sellerId, darkMode, authData }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>('');
    const [socketConnected, setSocketConnected] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const socketRef = useRef<Socket | null>(null);
    const user = authData.data;
    
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('setup', user);
        socket.on('connection', () => setSocketConnected(true));
    }, []);

    // useEffect(() => {
    //     socketRef.current = io(`http://localhost:3002/messages/message/send`);

    //     // Listen for new messages from the server
    //     socketRef.current.on('new_message', (
    //         newMessage: Message
    //     ) => {
    //         setMessages(prevMessages => [...prevMessages, newMessage]);
    //     });

    //     // Cleanup on unmount
    //     return () => {
    //         socketRef.current?.disconnect();
    //     };
    // }, []);

    // useEffect(() => {
    //     // Scroll to the bottom of the messages list
    //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }, [messages]);

    const handleSendMessage = (e: MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim() === '') return;

        // Emit the message to the server
        socketRef.current?.emit('send_message', {
            sender: userId,
            receiver: sellerId,
            text: message,
        });

        setMessage('');
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    return (
        <div className={`flex flex-col min-h-[90vh] border ${darkMode ? 'border-Primary_600' : 'border-Primary_300'} rounded-lg overflow-hidden`}>
            <div className={`flex-1 p-4 overflow-y-scroll ${darkMode ? 'bg-Primary_800' : 'bg-Primary_200'}`}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-2 p-2 rounded-lg ${msg.sender === userId ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'}`}
                    >
                        <p>{msg.text}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className={`p-4 flex justify-between items-start gap-5 ${darkMode ? 'bg-Primary_700' : 'bg-Primary_300'}`}>
                <FormInput
                    type='text'
                    name='message'
                    placeholder='Type your message here'
                    inputStyle="text-Black2 flex-1 border border-Primary_300 !rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 !mb-0"
                    inputStyle2='p-3 px-5'
                    style='w-full'
                    value={message}
                    onChange={handleChange}
                />
                <Button
                    btnType='submit'
                    btnText='Send'
                    btnStyle={`!px-3 !py-2 w-1/12 mobile:w-10 mobile:h-10 !rounded-full font-bold text-base mobile:text-sm text-white bg-Primary`}
                />
            </form>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    darkMode: state.app.darkMode,
    authData: state.auth?.user_authData
});

export default connect(mapStateToProps, null)(ChatComponent);
