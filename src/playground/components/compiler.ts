import { transform } from "@babel/standalone";
import { Files } from "@/context/PlaygroundContext";
import { APP_ENTRY_FILE_NAME } from "@/lib/data";
import { PluginObj } from "@babel/core";

const customResolver: (files: Files) => PluginObj = (files) => {
  return {
    visitor: {
      ImportDeclaration(path) {
        path.node.source.value = "111111";
      },
    },
  };
};

// 编译代码
export const babelTransform = (filename: string, code: string, files: Files) => {
  let result = "";
  try {
    result = transform(code, {
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
