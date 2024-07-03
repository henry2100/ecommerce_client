import React from 'react'
import { connect } from 'react-redux'

type Props = ReturnType<typeof mapStateToProps> & {
  text?: string;
  additionalClass?: string,
  onClick?: (data?:any) => void,
  handleMouseEnter?: () => void,
  children?: JSX.Element
}

const TableDataSpan: React.FC<Props> = ({ darkMode, text, additionalClass, onClick, handleMouseEnter, children }) => {
  const handleHover = () => {
    handleMouseEnter && handleMouseEnter()
  }

  return (
    <div onMouseEnter={handleHover} onClick={onClick} className='px-6 py-4 flex items-center'>
      <span
        className={`${darkMode ? 'text-Gray300' : 'text-Gray700'} ${additionalClass && additionalClass}`}
      >{children ? children : (text && text)}</span>
    </div>
  )
}

const mapStateToProps = (state: any) => ({ 
  darkMode: state.app.darkMode 
});

export default connect(mapStateToProps)(TableDataSpan)