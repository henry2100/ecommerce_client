import { useState } from "react";
import Alert from "components/atoms/Alert";

const UploadFile = async (file, userId?:any, darkMode?: boolean) => {
    // const uniqueFolder = `user_uploads/${userId}/`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ecom_app_uploads');
    // formData.append('folder', uniqueFolder);

    try {
        const res = await fetch('https://api.cloudinary.com/v1_1/dtegg4r9t/image/upload', {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        // console.log("uploadFile response:", data);
        // console.log("formData:", data);

        if (data.secure_url) {
            Alert('success', 'File uploaded successfully', darkMode);
        } else {
            Alert('error', 'File upload failed', darkMode);
        }

        return data;
    } catch (error) {
        console.error("uploadFile error:", error);
        Alert('error', 'File upload failed', darkMode);
    }
}

export default UploadFile;