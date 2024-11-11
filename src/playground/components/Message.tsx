import React from "react";

interface Props {
  type: "error" | "warning";
  content: string;
}

const Message = (props: Props) => {
  const { type, content } = props;

  return (
    <div className={`tips_message ${type}`}>
      <pre
        className="tips_content"
        dangerouslySetInnerHTML={{ __html: content }}
      ></pre>
      <button className="close_tips">✕</button>
    </div>
  );
};

export default Message;
