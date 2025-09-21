import { useState } from "react";


const FileUpload = () => {

    const [selectFiles, setSelectFiles] = useState([]);

    const handleFileChange = (e) => {
        let selectedFiles = Array.from(e.target.files);
        console.log("selectedFiles >>>>> ", selectedFiles, typeof(selectedFiles))

        if (selectedFiles){
            for (let i=0; i<=selectedFiles.length; i++){
            
        }
        }

        setSelectFiles(selectedFiles)
    }

    return (
        <div>
            <input type="file" multiple onChange={handleFileChange}/>
            {
                selectFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                ))
            }
            <button type="submit">Upload Files</button>
        </div>
    )

}

export default FileUpload