import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";
import { useContext } from "react";
import { PlaygroundContext } from "@/context/PlaygroundContext";
import { message, ConfigProvider, theme as antdTheme } from "antd";

export default function ReactPlayground() {
  const { theme, setTheme, updateVersion } = useContext(PlaygroundContext);

  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const getShareURL = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      message.success("分享的链接已复制", 2);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <div className={theme} style={{ height: "100vh" }}>
        <Header
          theme={theme}
          handleChangeTheme={handleChangeTheme}
          getShareURL={getShareURL}
          updateVersion={updateVersion}
        />
        <Allotment defaultSizes={[100, 100]}>
          <Allotment.Pane minSize={0}>
            <CodeEditor />
          </Allotment.Pane>
          <Allotment.Pane minSize={0}>
            <Preview />
          </Allotment.Pane>
        </Allotment>
      </div>
    </ConfigProvider>
  );
}
