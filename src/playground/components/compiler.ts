import { transform } from "@babel/standalone";
import { Files, File } from "@/context/PlaygroundContext";
import { APP_ENTRY_FILE_NAME } from "@/lib/data";
import { PluginObj } from "@babel/core";

// 检查是否存在'import React'的代码
const regexReact = /import\s+React/g;

// 找出files中跟modulePath的文件名字的匹配的模块，比如  ./App  ->  App.tsx
const getModuleFile = (files: Files, modulePath: string) => {
  let moduleName = modulePath.split("./").pop() || "";
  if (!moduleName.includes(".")) {
    const moduleFileName = Object.keys(files)
      .filter((k) => {
        return k.endsWith(".ts") || k.endsWith(".tsx") || k.endsWith(".js") || k.endsWith(".jsx");
      })
      .find((k) => k.split(".").includes(moduleName));
    if (moduleFileName) {
      moduleName = moduleFileName;
    }
  }
  return files[moduleName];
};

// 将 "css的引入" 转为 "js插入style标签" 的代码，并转为URL
const cssToJs = (file: File) => {
  const js = `
(() => {
  const stylesheet = document.createElement('style')

  const style = document.createTextNode(${file.value})
  stylesheet.innerHTML = ''
  stylesheet.appendChild(style)
  document.head.append(stylesheet) 
})()
  `;
  return URL.createObjectURL(new Blob([js], { type: "application/javascript" }));
};

// json 转blob url
const convertToURL = (file: File) => {
  const js = `export default ${file.value}`;
  return URL.createObjectURL(new Blob([js], { type: "application/javascript" }));
};

// 修改模块的path，转为blob URL
const customResolver: (files: Files) => PluginObj = (files) => {
  return {
    visitor: {
      ImportDeclaration(path) {
        const modulePath = path.node.source.value;
        if (modulePath.startsWith(".")) {
          const file = getModuleFile(files, modulePath);
          if (!file) return;
          if (file.name.endsWith(".css")) {
            path.node.source.value = cssToJs(file);
          } else if (file.name.endsWith(".json")) {
            path.node.source.value = convertToURL(file);
          } else {
            path.node.source.value = URL.createObjectURL(
              new Blob([babelTransform(file.name, file.value, files)], {
                type: "application/javascript",
              })
            );
          }
        }
      },
    },
  };
};

// 没有引入react的添加import React
const beforeTransformCode = (filename: string, code: string) => {
  let newCode = code;
  if ((filename.endsWith(".tsx") || filename.endsWith(".jsx")) && !regexReact.test(code)) {
    newCode = `import React from 'react';\n${code}`;
  }
  return newCode;
};

// 编译代码
export const babelTransform = (filename: string, code: string, files: Files) => {
  let result = "";
  try {
    result = transform(beforeTransformCode(filename, code), {
      presets: ["react", "typescript"],
      filename,
      plugins: [customResolver(files)],
      retainLines: true, // 编译后保持原有行列号不变
    }).code!;
  } catch (e) {
    console.error("编译出错", e);
  }
  return result;
};

export const compile = (files: Files) => {
  const main = files[APP_ENTRY_FILE_NAME];
  return babelTransform(APP_ENTRY_FILE_NAME, main.value, files);
};
