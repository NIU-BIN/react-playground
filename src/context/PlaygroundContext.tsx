import React, { createContext, PropsWithChildren, useState } from "react";
import { getFileLanguage } from "../utils";
import { initFiles } from "../lib/data";

export type Theme = "light" | "dark";

export interface File {
  name: string;
  value: string;
  language: string;
}

export interface Files {
  [key: string]: File;
}

export interface PlaygroundContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
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
  const [theme, setTheme] = useState<Theme>("dark");
  const [files, setFiles] = useState<Files>(initFiles);
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

  // TODO: 修改文件名不变换顺序
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
      [newFileName]: newFile,
    });
  };

  return (
    <PlaygroundContext.Provider
      value={{
        theme,
        setTheme,
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
