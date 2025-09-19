import { useState } from "react";


const FileUpload = () => {


    return (
        <div>
            <input type="file" multiple/>
            <button type="submit">Upload Files</button>
        </div>
    )

}

export default FileUpload