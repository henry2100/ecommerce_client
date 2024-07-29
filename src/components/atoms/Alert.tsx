import React from 'react';
import toast from 'react-hot-toast';

type AlertType = 'success' | 'error' | 'warning' | 'info';

const Alert = (type: AlertType, message:string, darkMode?:boolean) => {
    const alertStyle = { 
        minWidth: '250px', 
        maxWidth: '350px' ,
        backgroundColor: darkMode ? '#0f172a' : '#fff', 
        color: darkMode ? '#fff' : '#0f172a' 
    }

    if(type === 'success') return toast.success(message, { position: 'top-center', style: alertStyle});
    if(type === 'error') return toast.error(message, { position: 'top-center', style: alertStyle}); 
    if(type === 'warning') return toast.custom(<div className='bg-white shadow-md py-2 px-4 rounded border-[.5px] border-Warning'>{message}</div>, {position: 'top-center', icon:'', style: alertStyle});
    if(type === 'info') return toast.custom(<div className='bg-white shadow-md py-2 px-4 rounded border-[.5px] border-Accent_blue'>{message}</div>, {position: 'top-center', icon:'', style: alertStyle});
}

export default Alert;