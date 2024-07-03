import React from 'react';
import toast from 'react-hot-toast';

type AlertType = 'success' | 'error' | 'warning' | 'info';

const Alert = (type: AlertType, message) => {
    if(type === 'success') return toast.success(message, { position: 'top-center', style: { minWidth: '250px' }});
    if(type === 'error') return toast.error(message, { position: 'top-center', style: { minWidth: '250px' }});
    if(type === 'warning') return toast.custom(<div className='bg-white shadow-md py-2 px-4 rounded border-2 border-Warning'>{message}</div>, {position: 'top-center', icon:'', style: { minWidth: '250px', maxWidth: '350px' }});
    if(type === 'info') return toast.custom(<div className='bg-white shadow-md py-2 px-4 rounded border-2 border-Accent_blue'>{message}</div>, {position: 'top-center', icon:'', style: { minWidth: '250px', maxWidth: '350px' }});
}

export default Alert;