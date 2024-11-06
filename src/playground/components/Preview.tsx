import React, { useContext, useEffect, useState } from "react";
import Editor from "./Editor";
import { PlaygroundContext } from "@/context/PlaygroundContext";
import { compile } from "./compiler";

const Preview = () => {
  const [compiledCode, setCompiledCode] = useState("");

  const { files } = useContext(PlaygroundContext);

  useEffect(() => {
    console.log("files 内容更改");
    const res = compile(files);
    setCompiledCode(res);
  }, [files]);

  return (
    <div style={{ height: "100%" }} className="code_editor">
      <Editor
        file={{
          name: "dist.js",
          value: compiledCode,
          language: "javascript",
        }}
      />
    </div>
  );
};

export default Preview;
