import React, { useContext } from "react";
import { PlaygroundContext } from "@/context/PlaygroundContext";
import AddIcon from "@/assets/add.svg";
import CloseIcon from "@/assets/close.svg";

const FileList = () => {
  const { files, setFiles, addFile, updateFileName, selectedFileName, setSelectedFileName } =
    useContext(PlaygroundContext);

  const handleDelete = (fileName: string) => {
    delete files[fileName];
    console.log("files: ", files);
    setFiles({ ...files });
  };

  return (
    <ul className="file_list">
      {Object.keys(files).map((fileName) => {
        return (
          <li
            key={fileName}
            className={`file_item ${selectedFileName === fileName && "file_item__active"}`}
            onClick={() => setSelectedFileName(fileName)}
          >
            <span>{fileName}</span>
            <img
              src={CloseIcon}
              alt=""
              className="close_icon"
              onClick={() => handleDelete(fileName)}
            />
          </li>
        );
      })}
      <li className="file_item add_icon">
        <img src={AddIcon} alt="" />
      </li>
    </ul>
  );
};

export default FileList;
