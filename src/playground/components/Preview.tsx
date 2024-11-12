import React, { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "@/context/PlaygroundContext";
import { compile } from "./compiler";
import iframeRaw from "./iframe.html?raw";
import { IMPORT_MAP_FILE_NAME } from "@/lib/data";
import Message from "./Message";

interface MessageData {
  data: {
    type: string;
    message: string;
  };
}

const Preview = () => {
  const [compiledCode, setCompiledCode] = useState("");
  const [iframeURL, setIframeURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { files } = useContext(PlaygroundContext);

  useEffect(() => {
    console.log("files 内容更改", files);
    const res = compile(files);
    setCompiledCode(res);
  }, [files]);

  const createIframeURL = () => {
    const res = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${compiledCode}</script>`
      );
    return URL.createObjectURL(new Blob([res], { type: "text/html" }));
  };

  const getErrorMessage = (e: MessageData) => {
    console.log("e: ", e.data);
    setErrorMessage(e.data.message);
  };

  useEffect(() => {
    setIframeURL(createIframeURL());
  }, [compiledCode]);

  useEffect(() => {
    window.addEventListener("message", getErrorMessage);
    return () => {
      window.removeEventListener("message", getErrorMessage);
    };
  });

  return (
    <div style={{ height: "100%" }} className="code_editor">
      <iframe
        src={iframeURL}
        style={{
          width: "100%",
          height: "100%",
          padding: 0,
          border: "none",
        }}
      ></iframe>
      {errorMessage && <Message type="error" content={errorMessage} />}
    </div>
  );
};

export default Preview;
