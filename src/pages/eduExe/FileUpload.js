import React, { useState } from 'react';

function FileUpload() {
  const [files, setFiles] = useState([]);

  const onDrop = (e) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setFiles(newFiles);
    }
  };

  return (
    <div
      style={{ height: '200px', backgroundColor: '#f0f0f0' }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      {files.map((file, index) => (
        <p key={index}>{file.name}</p>
      ))}
    </div>
  );
}

export default FileUpload;