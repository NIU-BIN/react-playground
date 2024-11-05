import React from "react";
import IframeRaw from "../preview.html?raw";

const iframeUrl = URL.createObjectURL(new Blob([IframeRaw], { type: "text/html" }));

const Preview = () => {
  return (
    <iframe
      src={iframeUrl}
      style={{
        width: "100%",
        height: "100%",
        padding: 0,
        border: "none",
      }}
    ></iframe>
  );
};

export default Preview;
