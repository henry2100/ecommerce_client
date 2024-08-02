import React, { useEffect, useRef } from 'react'

interface Props {
    children: React.ReactNode;
    handleClickOut?: (e?: any) => void,
    cardLayout?: string
}

const DropdownCard: React.FC<Props> = ({
    children,
    handleClickOut,
    cardLayout,
    // dropdown, 
    // setDropdown
}:Props) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if(dropdownRef.current && !dropdownRef.current.contains(e.target as Node)){
            handleClickOut && handleClickOut(false);
            
        }
    }

    useEffect(()=>{
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <div ref={dropdownRef} className={cardLayout}>
            {children}
        </div>
    )
}

export default DropdownCard