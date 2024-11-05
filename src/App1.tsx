import { transform } from "@babel/standalone";
import { useRef, useState } from "react";
import type { PluginObj } from "@babel/core";
// import './App.css'

function App() {
  const code = `import { useEffect, useState } from "react";
   
  function App() {
    const [num, setNum] = useState(() => {
      const num1 = 1 + 2;
      const num2 = 2 + 3;
      return num1 + num2
    });
  
    return (
      <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
    );
  }
  
  export default App;
   `;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const code1 = `
  function add(a, b) {
        return a + b;
    }
    export { add };
  `;

  const url = URL.createObjectURL(new Blob([code1], { type: "application/javascript" }));

  const transformImportSourcePlugin: PluginObj = {
    visitor: {
      ImportDeclaration(path) {
        path.node.source.value = url;
      },
    },
  };

  const code2 = `import { add } from './add.ts'; console.log(add(2, 3));`;

  const handleClick = () => {
    if (!textareaRef.current) return;

    // const result = transform(textareaRef.current.value, {
    //   presets: ["react", "typescript"],
    //   filename: "test.tsx",
    // });

    const result = transform(code2, {
      presets: ["react", "typescript"],
      filename: "test.tsx",
      plugins: [transformImportSourcePlugin],
    });
    console.log(result.code);
  };

  return (
    <div>
      <textarea
        ref={textareaRef}
        style={{ width: "500px", height: "300px" }}
        defaultValue={code}
      ></textarea>
      <button onClick={handleClick}>编译</button>
    </div>
  );
}

export default App;
