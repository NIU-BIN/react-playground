import React, { useContext, useEffect, useRef, useState } from "react";
import { PlaygroundContext } from "@/context/PlaygroundContext";
import AddIcon from "@/assets/add.svg";
import FileNameItem from "./FileNameItem";
import { APP_CONTAINER_FILE_NAME, APP_ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME } from "@/lib/data";

const FileList = () => {
  const { files, addFile, setSelectedFileName } = useContext(PlaygroundContext);

  const [tabs, setTabs] = useState([""]);
  const [showNewFileInput, setShowNewFileInput] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const newFileInputRef = useRef<HTMLInputElement>(null);
  const BASIC_FILES = [APP_CONTAINER_FILE_NAME, APP_ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME]; // 基础文件，不能被删除、更改文件名

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  const createFile = () => {
    setShowNewFileInput(true);
    setTimeout(() => {
      newFileInputRef.current?.focus();
    });
  };

  const newFileInputBlur = () => {
    setShowNewFileInput(false);
    if (!newFileName) return;
    addFile(newFileName);
    setNewFileName("");
    setSelectedFileName(newFileName);
  };

  return (
    <ul className="file_list">
      {tabs.map((fileName) => {
        return <FileNameItem fileName={fileName} key={fileName} basicFiles={BASIC_FILES} />;
      })}
      {showNewFileInput && (
        <li className="file_item">
          <input
            type="text"
            ref={newFileInputRef}
            className="file_name_input"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onBlur={newFileInputBlur}
          />
        </li>
      )}
      <li className="file_item add_icon" onClick={createFile}>
        <img src={AddIcon} alt="" />
      </li>
    </ul>
  );
};

export default FileList;
