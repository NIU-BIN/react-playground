import React from "react";
import FileList from "./FileList";
import Editor from "./Editor";

const CodeEditor = () => {
  const file = {
    name: "test.tsx",
    value: 'import lodash from "lodash";\n\nconst a = <div>test</div>',
    language: "typescript",
  };

  function onEditorChange() {
    console.log(...arguments);
  }

  return (
    <div className="code_editor">
      <FileList></FileList>
      <Editor file={file} onChange={onEditorChange}></Editor>
    </div>
  );
};

export default CodeEditor;
