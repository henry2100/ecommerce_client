import React from 'react'
import Button from './Button'

type Props = {
  style?: string,
  pageTitle?: string,
  subTitle?: any,
  pageTitleStyle?: string,
  subTitleStyle?: string
}

const PageTitle: React.FC<Props> = ({style, pageTitle, subTitle, pageTitleStyle, subTitleStyle }) => {
  return (
    <div className={`${style} flex flex-col justify-start gap-3  mt-2 mb-4`}>
      <span className={`${pageTitleStyle} desktop:text-2xl text-xl mobile:text-lg flex-wrap leading-7 font-semibold text-black`}>
        {pageTitle}
      </span>
      {subTitle &&
        <span className={`${subTitleStyle} font-normal flex-wrap text-sm text-SecondaryAccent`}>
          {subTitle}
        </span>
      }
    </div>
  )
}

export default PageTitle