import AppCss from "../template/App.css?raw";
import App from "../template/App.tsx?raw";
import main from "../template/main.tsx?raw";
import importMap from "../template/import-map.json?raw";
import type { Files } from "../context/PlaygroundContext";
import { getFileLanguage } from "../utils";

export const APP_CONTAINER_FILE_NAME = "App.tsx"; // 主文件
export const APP_ENTRY_FILE_NAME = "main.tsx"; // 入口文件
export const IMPORT_MAP_FILE_NAME = "import-map.json"; //  用于 esm 模块映射
export const APP_STYLE_FILE_NAME = "App.css"; // 全局css

export const initFiles: Files = {
  [IMPORT_MAP_FILE_NAME]: {
    name: IMPORT_MAP_FILE_NAME,
    language: getFileLanguage(IMPORT_MAP_FILE_NAME),
    value: importMap,
  },
  [APP_ENTRY_FILE_NAME]: {
    name: APP_ENTRY_FILE_NAME,
    language: getFileLanguage(APP_ENTRY_FILE_NAME),
    value: main,
  },
  [APP_CONTAINER_FILE_NAME]: {
    name: APP_CONTAINER_FILE_NAME,
    language: getFileLanguage(APP_CONTAINER_FILE_NAME),
    value: App,
  },
  [APP_STYLE_FILE_NAME]: {
    name: APP_STYLE_FILE_NAME,
    language: getFileLanguage(APP_STYLE_FILE_NAME),
    value: AppCss,
  },
};
