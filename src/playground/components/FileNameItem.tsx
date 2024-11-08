import React, { useContext, useRef, useState } from "react";
import { PlaygroundContext } from "@/context/PlaygroundContext";
import CloseIcon from "@/assets/close.svg";

interface Props {
  fileName: string;
}

const FileNameItem = (props: Props) => {
  const { fileName } = props;
  const { files, setFiles, addFile, updateFileName, selectedFileName, setSelectedFileName } =
    useContext(PlaygroundContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(fileName);

  const handleDelete = (fileName: string) => {
    delete files[fileName];
  };

  const handleDoubleClick = () => {
    setIsEdit(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const inputBlur = () => {
    setIsEdit(false);
    updateFileName(fileName, name);
    setSelectedFileName(name);
  };

  return (
    <li
      className={`file_item ${selectedFileName === fileName && "file_item__active"}`}
      onClick={() => setSelectedFileName(fileName)}
    >
      {isEdit ? (
        <input
          type="text"
          ref={inputRef}
          className="file_name_input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={inputBlur}
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{fileName}</span>
      )}
      {isEdit ? (
        <></>
      ) : (
        <img src={CloseIcon} alt="" className="close_icon" onClick={() => handleDelete(fileName)} />
      )}
    </li>
  );
};

export default FileNameItem;
