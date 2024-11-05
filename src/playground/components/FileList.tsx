import React, { useContext } from "react";
import { PlaygroundContext } from "../../context/PlaygroundContext";

const FileList = () => {
  const { files, addFile, updateFileName, selectedFileName } = useContext(PlaygroundContext);
  return (
    <ul className="file_list">
      {Object.keys(files).map((fileName) => {
        return <li key={fileName}>{fileName}</li>;
      })}
    </ul>
  );
};

export default FileList;
