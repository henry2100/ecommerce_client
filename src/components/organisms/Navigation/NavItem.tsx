import React from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../atoms/Alert';
import { ToSnakeCase } from 'components/atoms/CaseManager';
import { connect } from 'react-redux';

interface Props {
    darkMode: boolean;
    available: boolean;
    active: boolean;
    itemStyle?: string;
    navLink: string;
    navItem: string;
    icon_1: string;
    icon_2: string;
    style: string;
    onClick: ((e?: any) => void);
    action: ((e?: any) => void) | null;
}

const NavItem: React.FC<Props> = (props) => {
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
        <div onClick={handleClick} data-name={ToSnakeCase(props.navItem)} className={props.style}>
            <div
                data-name={ToSnakeCase(props.navItem)}
                className={`flex justify-center items-center py-1 px-5 min-w-[100px] w-fit gap-3 rounded-md cursor-pointer transition ease-in-out duration-250 ${
                    props.active 
                        ? props.darkMode 
                            ? 'bg-Primary_700 text-PrimaryDisabled' 
                            : 'bg-slate-400 text-white' 
                        : props.darkMode 
                            ? 'bg-Primary_600 text-Primary' 
                            : 'bg-slate-100 text-slate-500'
                } hover:bg-Primary_Accents_sm`}
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

const mapStateToProps = (state:any) => ({
    darkMode: state.app.darkMode
})

export default connect(mapStateToProps, null)(NavItem);
