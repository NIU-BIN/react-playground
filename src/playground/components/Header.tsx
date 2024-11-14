import React, { useContext } from "react";
import ReactIcon from "@/assets/react.svg";
import LightIcon from "@/assets/light.svg";
import DarkIcon from "@/assets/night.svg";
import { Theme } from "@/context/PlaygroundContext";
import { Select } from "antd";

interface Props {
  theme: Theme;
  handleChangeTheme: () => void;
  getShareURL: () => void;
  updateVersion: (version: string) => void;
}

const Header = (props: Props) => {
  const { theme, handleChangeTheme, getShareURL, updateVersion } = props;

  return (
    <header>
      <div className="header_left">
        <img src={ReactIcon} alt="" />
        <span className="header_title">React Playground</span>
      </div>
      <div className="header_right">
        <div>
          <span style={{ fontSize: "14px", marginRight: "10px" }}>React:</span>
          <Select
            defaultValue="18.3.0"
            size="small"
            style={{ width: 120 }}
            options={[
              { value: "18.3.1", label: "18.3.1" },
              { value: "18.2.0", label: "18.2.0" },
              { value: "18.0.0", label: "18.0.0" },
            ]}
            onChange={(value) => updateVersion(value)}
          />
        </div>
        <div className="action_item" onClick={() => handleChangeTheme()}>
          <img src={theme === "light" ? LightIcon : DarkIcon} alt="" />
        </div>
        <div className="action_item" onClick={getShareURL}>
          <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2596"
            width="22"
            height="22"
          >
            <path
              d="M716.8 627.2c-32 0-64 12.8-83.2 32L422.4 537.6c0-6.4 6.4-19.2 6.4-25.6 0-12.8 0-19.2-6.4-25.6l217.6-121.6c19.2 19.2 51.2 32 83.2 32 64 0 115.2-51.2 115.2-115.2s-51.2-115.2-115.2-115.2S601.6 211.2 601.6 275.2c0 12.8 0 19.2 6.4 25.6L390.4 428.8C364.8 409.6 339.2 396.8 307.2 396.8 243.2 396.8 192 448 192 512s51.2 115.2 115.2 115.2c32 0 64-12.8 83.2-32l217.6 121.6c0 6.4-6.4 19.2-6.4 25.6 0 64 51.2 115.2 115.2 115.2s115.2-51.2 115.2-115.2S780.8 627.2 716.8 627.2zM716.8 224c32 0 51.2 25.6 51.2 51.2 0 32-25.6 51.2-51.2 51.2-32 0-51.2-25.6-51.2-51.2C665.6 249.6 684.8 224 716.8 224zM307.2 563.2C275.2 563.2 256 544 256 512s25.6-51.2 51.2-51.2c32 0 51.2 25.6 51.2 51.2S339.2 563.2 307.2 563.2zM716.8 800c-32 0-51.2-25.6-51.2-51.2 0-32 25.6-51.2 51.2-51.2 32 0 51.2 25.6 51.2 51.2C768 774.4 748.8 800 716.8 800z"
              p-id="2597"
            ></path>
          </svg>
        </div>
        <div className="action_item">
          <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3671"
            width="22"
            height="22"
          >
            <path
              d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"
              p-id="3672"
            ></path>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
