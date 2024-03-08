import React from 'react';

function FileDropZone({ onDrop, files }) {
  const handleDrop = (e) => {
    e.preventDefault();
    onDrop(e.dataTransfer.files);
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      style={{ height: '200px', width: '200px', border: '1px solid black' }}
    >
      Drop files here
      {/* 드롭된 파일 목록을 렌더링합니다. */}
      {files.map((file, index) => (
        <img
          key={index}
          src={URL.createObjectURL(file)}
          alt={`preview-${index}`}
          style={{ width: '50px', height: '50px' }}
        />
      ))}
    </div>
  );
}

export default FileDropZone;