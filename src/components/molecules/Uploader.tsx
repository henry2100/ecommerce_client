import { useState } from "react";
import Alert from "components/atoms/Alert";

const UploadFile = async (file) => {
    // const [uploadRes, setUploadRes] = useState();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ecom_app_uploads');

    try {
        const res = await fetch('https://api.cloudinary.com/v1_1/dtegg4r9t/image/upload', {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        console.log("uploadFile response:", data);

        if (data.secure_url) {
            Alert('success', 'File uploaded successfully');
            // setUploadRes(data);
        } else {
            Alert('error', 'File upload failed');
        }

        return data;
    } catch (error) {
        console.error("uploadFile error:", error);
        Alert('error', 'File upload failed');
    }
}

export default UploadFile;