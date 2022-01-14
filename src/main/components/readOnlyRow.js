import React from "react";

const ReadOnlyRow = ({file, handleDownloadClick, handleDeleteClick}) => {
  return (
    <tr>
      <td>{file.fileName}</td>
      <td>{file.date}</td>
      <td>
        <button
          className={"control-button"}
          type="button"
          onClick={(event) => handleDownloadClick(event, file)}
        >
          Download
        </button>
        <button
          className={"control-button"}
          type="button"
          onClick={(event) => handleDeleteClick(event, file)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;