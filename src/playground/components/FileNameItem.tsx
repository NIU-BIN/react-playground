import React, { useContext, useRef, useState } from "react";
import { PlaygroundContext } from "@/context/PlaygroundContext";
import CloseIcon from "@/assets/close.svg";
import { APP_CONTAINER_FILE_NAME } from "@/lib/data";

interface Props {
  fileName: string;
  basicFiles: string[];
}

const FileNameItem = (props: Props) => {
  const { fileName, basicFiles } = props;
  const { removeFile, updateFileName, selectedFileName, setSelectedFileName } =
    useContext(PlaygroundContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(fileName);

  const handleDelete = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, fileName: string) => {
    e.stopPropagation();
    const res = confirm(`是否确认删除${fileName}文件？`);
    if (res) {
      setSelectedFileName(APP_CONTAINER_FILE_NAME);
      removeFile(fileName);
    }
  };

  const handleDoubleClick = () => {
    if (basicFiles.includes(fileName)) return;
    setIsEdit(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const inputBlur = () => {
    if (!name) return;
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
        <span className="file_item_label" onDoubleClick={handleDoubleClick}>
          {fileName}
        </span>
      )}
      {isEdit || basicFiles.includes(fileName) ? (
        <></>
      ) : (
        <img
          src={CloseIcon}
          alt=""
          className="close_icon"
          onClick={(e) => handleDelete(e, fileName)}
        />
      )}
    </li>
  );
};

export default FileNameItem;
