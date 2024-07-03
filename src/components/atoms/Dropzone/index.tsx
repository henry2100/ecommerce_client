import { Children, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import AppModal from '../../organisms/CustomModal';

const Dropzone = (props) => {
    // const [showModal, setShowModal] = useState(false);
    const [showMssg, setShowMssg] = useState(false);
    // const [itemData, setItemData] = useState<any>([]);

    const onDrop = useCallback(acceptedFile => {
        if (acceptedFile?.length > 0) {
            const uploadedFile = acceptedFile.map(item => (
                Object.assign(item, { preview: URL.createObjectURL(item) })
            ))
            props.setFile(uploadedFile);
        };
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone(
        {
            onDrop,
            accept: props.acceptedExt ? props.acceptedExt : {}
        });

    useEffect(() => {
        if (props.file.length > 0) {
            setShowMssg(true);
        }
        setTimeout(() => setShowMssg(false), 3000);
    }, [props.file]);

    // const showItem = (item) => {
    //     setShowModal(true);
    //     setItemData(item);
    // }

    // const modalComponent = (
    //     <AppModal
    //         handleClose={() => setShowModal(false)}
    //         modalStyle={`bg-white w-2/5 mobile:w-3/4 h-fit z-30 top-0 right-0 left-0 bottom-0 animate-slide_left rounded-l-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all`}
    //         contentStyle="h-[100vh]"
    //     >

    //     </AppModal>
    // )

    return (
        <div className={`${props.style} flex flex-col`}>
            {props.label && <label className={`${props.labelStyle} mb-2`}>{props.label}</label>}
            <div {...getRootProps({
                className: `${props.className} flex items-center justify-center gap-1 cursor-pointer relative ${props.file.length > 1 && 'p-[3.5px]'}`
            })}>
                {props.file.length <= 1 &&
                    props.icon && <img src={props.icon} alt='fileInputIcon' className={`${props.iconStyle} w-4 h-4 absolute left-3`} />
                }
                <input {...getInputProps()} />
                {props.file.length === 1
                    ? <>
                        <span className="font-normal flex justify-between items-center">
                            <p className={`${props.disappear ? 'hidden' : 'block'} text-sm`}>{props.file.map(item => item.name)}</p>
                            {showMssg && <p className={`text-Success text-xs absolute right-4 -top-5 ${props.addedStyle}`}>File Ready</p>}
                        </span>
                        {props.children && props.children}
                    </>

                    : props.file.length > 1
                        ? <>
                            <div className="font-normal flex justify-between items-center w-full overflow-y-scroll">
                                {<div className="text-sm flex flex-wrap gap-1">
                                    {props.file.map((item, i) => (
                                        <img
                                            key={i}
                                            src={item.preview}
                                            alt='uploads'
                                            className="w-8 h-8 border border-Primary rounded-md object-cover object-center"
                                        // onClick={() => showItem(item)}
                                        />
                                    ))}
                                </div>
                                }
                                {showMssg && <p className={`text-Success text-xs absolute right-4 -top-5 ${props.addedStyle}`}>File Ready</p>}
                            </div>
                            {props.children && props.children}
                        </>

                        : props.file.length === 0 && props.children
                            ? props.children

                            : isDragActive
                                ? <p className={`${props.textStyle}`}>Drop the files here ...</p>

                                : <p className={`${props.textStyle}`}>
                                    {props.text ? props.text : 'Drag \'n\' drop some files here, or click to select files'}
                                </p>
                }

            </div>
            {/* {showModal && modalComponent} */}
        </div>
    );
};

export default Dropzone;