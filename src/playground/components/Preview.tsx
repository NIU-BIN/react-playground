import React, { useContext, useEffect, useState } from "react";
import Editor from "./Editor";
import { PlaygroundContext } from "@/context/PlaygroundContext";
import { compile } from "./compiler";
import Message from "./Message";

const Preview = () => {
  const [compiledCode, setCompiledCode] = useState("");

  const { files } = useContext(PlaygroundContext);

  useEffect(() => {
    console.log("files 内容更改", files);
    const res = compile(files);
    setCompiledCode(res);
  }, [files]);

  return (
    <div
      style={{ position: "relative", height: "100%" }}
      className="code_editor"
    >
      <Editor
        file={{
          name: "dist.js",
          value: compiledCode,
          language: "javascript",
        }}
      />
      <Message type="warning" content={new Error().stack!.toString()} />
    </div>
  );
};

export default Preview;
