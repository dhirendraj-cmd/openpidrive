import '../App.css';
import { useState } from "react";
import api from "../axiosInstance";

const FileUpload = () => {

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
    }

    const handleUpload = async () => {

        if (selectedFiles.length == 0) {
            alert("No Files selected!!, Please select and upload")
            return
        }

        const formData = new FormData();

        selectedFiles.forEach((file) => {
            formData.append('files', file); // files is the key which is expected in backend api <API_ENDPOINT>
        })

        try {
            const response = await api.post("/upload/uploadfiles/", formData, {
                                headers: { "Content-Type": "multipart/form-data" },
                            });

            console.log("Uploaded Successfully", response.data);
            alert("All files uploaded successfully!")
            setSelectedFiles([]);
        }
        catch (error) {
            if (error.response && error.response.status === 401){
                console.error('Error during upload:', error);
                alert("Please login to upload files")
            } else {
                console.error('Error during upload:', error);
                alert('An error occurred during upload.');
            }
        }

    }

    return (
        <div className="main-upload-container">
        <div className="upload">
            <label htmlFor="file-input">
                <b>Browse: </b>
            </label>
            <input type="file" id="file-input" className="selection" name="upload" multiple onChange={handleFileChange} />
            {selectedFiles.length > 0 && (
                <div className="uploading">
                    <ul>
                        {
                            selectedFiles.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))
                        }
                    </ul>
                </div>
            )}
            <button type="button" onClick={handleUpload}>Upload Files</button>
        </div>
        </div>
    )

}

export default FileUpload
