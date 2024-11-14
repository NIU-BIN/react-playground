import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { getFileLanguage, compress, uncompress } from "../utils";
import { initFiles, getTargetImportJson } from "../lib/data";
import { IMPORT_MAP_FILE_NAME } from "../lib/data";

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
  updateVersion: (version: string) => void;
}

const getShareCode = () => {
  let shareFiles: Files | undefined;
  const hash = window.location.hash;
  try {
    const str = uncompress(decodeURIComponent(hash.slice(1)));
    shareFiles = JSON.parse(str);
  } catch (error) {
    console.log("error", error);
  }
  return shareFiles;
};

export const PlaygroundContext = createContext<PlaygroundContextType>({
  selectedFileName: "App.tsx",
} as PlaygroundContextType);

export const PlaygroundProvider = (props: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [files, setFiles] = useState<Files>(getShareCode() || initFiles);
  const [selectedFileName, setSelectedFileName] = useState<string>("App.tsx");

  useEffect(() => {
    const codestr = JSON.stringify(files);
    window.location.hash = encodeURIComponent(compress(codestr));
  }, [files]);

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

  // TODO: 修改文件名不变换顺序以及不可重名
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

  const updateVersion = (version: string) => {
    // const importjson = files[IMPORT_MAP_FILE_NAME];
    const targetImportJson = getTargetImportJson(version);
    console.log("importjson: ", targetImportJson, version);
    const { [IMPORT_MAP_FILE_NAME]: value, ...rest } = files;
    setFiles({
      ...rest,
      [IMPORT_MAP_FILE_NAME]: {
        ...value,
        value: targetImportJson,
      },
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
        updateVersion,
      }}
    >
      {props.children}
    </PlaygroundContext.Provider>
  );
};
