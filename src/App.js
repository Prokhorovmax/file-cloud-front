import './App.css';
import React, {useEffect, useState} from "react";
import FileService from './main/fileService'
import ReadOnlyRow from "./main/components/readOnlyRow";

const App = () => {

  const [data, setData] = useState(Array.of())

  useEffect(() => {
    updateFiles()
  }, [])

  const updateFiles = async () => {
    const newData = await FileService.getFiles().then(result => {
      return result
    });
    console.log(newData);
    setData(newData);
  }

  const hiddenFileInput = React.useRef(null);

  const onFileChange = (event) => {
    const [newFile] = event.target.files;
    FileService.uploadFile(newFile).then(status => {
      console.log(status);
      updateFiles();
    });
  };

  const handleUploadClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleDownloadClick = async (event, file) => {
    event.preventDefault();
    const type = file.fileName.substring(file.fileName.lastIndexOf('.') + 1);
    console.log(type);
    await FileService.downloadFile(file.id).then(response => {
      console.log(response);
      // var newBlob = new Blob([response], {type: 'application/octet-stream'})
      var data = window.URL.createObjectURL(response);
      var link = document.createElement('a');
      link.href = data;
      link.download = file.fileName;
      setTimeout(function () {
        link.click();
        // Firefox, necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
      }, 100);
    })
  }

  const handleDeleteClick = async (event, file) => {
    event.preventDefault();
    FileService.deleteFile(file).then(status => {
      console.log(status);
      updateFiles();
    });
  }

  return (
    <div className="App">
      <h1 className="app-title">FILE CLOUD</h1>
      <div className="app-container">
        <div className="upload-container">
          <input
            name="input-file"
            ref={hiddenFileInput}
            size="large"
            type="file"
            onChange={onFileChange}
            style={{display: 'none'}}
          />
          <button
            className={"upload-button"}
            id="upload"
            type="button"
            onClick={handleUploadClick}
          >
            UPLOAD NEW FILE
          </button>
        </div>
        <table>
          <thead>
          <tr>
            <th>File</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {data.map((file) => (
            <ReadOnlyRow
              key={file.id}
              file={file}
              handleDownloadClick={handleDownloadClick}
              handleDeleteClick={handleDeleteClick}
            />
          ))
          }
          < /tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
