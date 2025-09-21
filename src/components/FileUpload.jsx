import { useState } from "react";


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
            formData.append('files', file); // files is the key which is expected in backend api
        })

        try {
            const response = await fetch("/api/uploadfiles/", {
                method: 'POST',
                body: formData,
            })

            if (response.ok){
                const data = await response.json();
                console.log("Uploaded Successfully", data);
                alert("All files uploaded successfully!")
                setSelectedFiles([]);
            }
            else {
                console.error("Failed to Upload ", response.statusText);
                alert("File upload failed!")
            }
        }
        catch (error) {
            console.error('Error during upload:', error);
            alert('An error occurred during upload.');
        }

    }

    return (
        <div>
            <input type="file" multiple onChange={handleFileChange} />
            {selectedFiles.length > 0 && (
                <div>
                    <ul>
                        {
                            selectedFiles.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))
                        }
                    </ul>
                </div>
            )}
            <button type="submit" onClick={handleUpload}>Upload Files</button>
        </div>
    )

}

export default FileUpload