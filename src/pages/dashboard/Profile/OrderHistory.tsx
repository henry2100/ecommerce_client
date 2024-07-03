import PageTitle from 'components/atoms/PageTitle'
import React from 'react'

const OrderHistory = () => {
    return (
        <div className='flex flex-col gap-4'>
            <PageTitle
                pageTitle='Order history'
                pageTitleStyle='!font-semibold !text-xl mobile:!text-lg !text-Primary'
                style='!mb-0 !pb-0'
            />

            <div className='text-SecondaryAccent flex flex-col gap-4'>
                <p>
                    Ullamco do non sunt sint eu Lorem ipsum ullamco eu aliquip nostrud commodo. Id sint laboris elit dolor esse proident magna laboris. Ex aliquip est nisi velit cupidatat aliquip officia sunt. Deserunt aliqua anim ex nostrud eu sunt voluptate sunt. Laborum adipisicing do voluptate enim irure.
                </p>
                <p>
                    Nisi nulla proident officia sit tempor. Incididunt sint duis quis ad ex est do laboris quis Lorem consequat pariatur occaecat. Ullamco occaecat anim Lorem voluptate aute laboris ad ad sint velit cupidatat proident proident. Id eu commodo laboris duis fugiat irure sunt tempor eu ea ipsum. Minim minim laborum commodo officia consectetur enim laborum commodo sunt anim.
                </p>
                <p>
                    Commodo culpa commodo voluptate eu enim laborum. Quis id aliquip proident consectetur quis ad consectetur consectetur magna. Nostrud non sit amet elit velit occaecat adipisicing dolore do.
                </p>
                <p>
                    Proident tempor duis in elit laboris qui. Esse excepteur dolore exercitation aute id consequat proident commodo exercitation. Tempor minim nostrud sunt ad irure fugiat irure et sit sint. Aliquip in cupidatat ad enim. Id occaecat nisi veniam dolore velit esse incididunt ex. Sit et commodo aliquip proident.
                </p>
            </div>
        </div>
    )
}

export default OrderHistory