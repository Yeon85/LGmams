import React, { useState } from 'react';

function FileMover({ files }) {
  const [movedFiles, setMovedFiles] = useState([]);

  const onButtonClick = () => {
    setMovedFiles(files);
  };

  return (
    <div>
      <button onClick={onButtonClick}>Move Files</button>
      {movedFiles.map((file, index) => (
        <p key={index}>{file.name}</p>
      ))}
    </div>
  );
}

export default FileMover;