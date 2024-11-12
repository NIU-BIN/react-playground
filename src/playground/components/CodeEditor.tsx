import React, { useContext } from "react";
import FileList from "./FileList";
import Editor from "./Editor";
import { PlaygroundContext } from "@/context/PlaygroundContext";
import { debounce } from "@/utils";

const CodeEditor = () => {
  const { theme, files, setFiles, selectedFileName } = useContext(PlaygroundContext);

  const onEditorChange = (value?: string) => {
    files[selectedFileName].value = value || "";
    setFiles({
      ...files,
    });
  };

  return (
    <div className="code_editor">
      <FileList></FileList>
      <Editor
        option={{
          theme: `vs-${theme}`,
        }}
        file={files[selectedFileName]}
        onChange={debounce(onEditorChange)}
      ></Editor>
    </div>
  );
};

export default CodeEditor;
