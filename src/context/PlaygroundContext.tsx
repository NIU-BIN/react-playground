import React, { createContext, PropsWithChildren, useState } from "react";
import { getFileLanguage } from "../utils";

export interface File {
  name: string;
  value: string;
  language: string;
}

interface Files {
  [key: string]: File;
}

export interface PlaygroundContextType {
  files: Files;
  selectedFileName: string;
  setSelectedFileName: (fileName: string) => void;
  setFiles: (files: Files) => void;
  addFile: (fileName: string) => void;
  removeFile: (fileName: string) => void;
  updateFileName: (oldFieldName: string, newFieldName: string) => void;
}

export const PlaygroundContext = createContext<PlaygroundContextType>({
  selectedFileName: "App.tsx",
} as PlaygroundContextType);

export const PlaygroundProvider = (props: PropsWithChildren) => {
  const [files, setFiles] = useState<Files>({});
  const [selectedFileName, setSelectedFileName] = useState<string>("App.tsx");

  const addFile = (fileName: string) => {
    files[fileName] = {
      name: fileName,
      value: "",
      language: getFileLanguage(fileName),
    };
    setFiles({
      ...files,
    });
  };

  const removeFile = (fileName: string) => {
    delete files[fileName];
    setFiles({ ...files });
  };

  const updateFileName = (oldFileName: string, newFileName: string) => {
    if (!files[oldFileName] || newFileName === undefined || newFileName === null) return;

    const { [oldFileName]: value, ...rest } = files;
    const newFile = {
      ...value,
      name: newFileName,
      language: getFileLanguage(newFileName),
    };

    setFiles({
      ...rest,
      newFile,
    });
  };

  return (
    <PlaygroundContext.Provider
      value={{
        files,
        setFiles,
        selectedFileName,
        setSelectedFileName,
        addFile,
        removeFile,
        updateFileName,
      }}
    >
      {props.children}
    </PlaygroundContext.Provider>
  );
};
