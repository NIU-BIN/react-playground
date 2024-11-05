import React from "react";
import ReactPlayground from "./playground";
import "./App.scss";
import { PlaygroundProvider } from "./context/PlaygroundContext";

function App() {
  return (
    <PlaygroundProvider>
      <ReactPlayground />
    </PlaygroundProvider>
  );
}

export default App;
