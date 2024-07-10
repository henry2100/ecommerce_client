import React from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../atoms/Alert';
import { ToSnakeCase } from 'components/atoms/CaseManager';

const NavItem = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!props.available) {
            Alert('info', "Sorry, this feature is not available yet.");
            return;
        }
        if (props.action) {
            props.action();
        } else {
            navigate(props.navLink);
        }
    };

    return (
        <div onClick={handleClick} data-name={ToSnakeCase(props.navItem)}>
            <div
                data-name={ToSnakeCase(props.navItem)}
                className={`flex justify-center items-center py-1 px-5 min-w-[100px] w-fit gap-3 rounded-md mobile:pl-0 cursor-pointer ${
                    props.active ? 'bg-slate-400 text-white hover:bg-slate-500' : 'bg-slate-100 text-slate-500 hover:bg-slate-300'
                } ${props.style}`}
            >
                {props.icon_1 && props.icon_2 && (
                    <span className="flex-shrink-0 pointer-events-none">
                        <img src={props.active ? props.icon_1 : props.icon_2} alt="nav_icons" className="w-4 h-4" />
                    </span>
                )}
                <span className="pointer-events-none truncate">{props.navItem}</span>
            </div>
        </div>
    );
};

export default NavItem;
