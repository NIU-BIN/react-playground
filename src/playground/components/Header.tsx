import React, { useContext } from "react";
import ReactIcon from "@/assets/react.svg";
import LightIcon from "@/assets/light.svg";
import DarkIcon from "@/assets/night.svg";
import { Theme } from "@/context/PlaygroundContext";

interface Props {
  theme: Theme;
  handleChangeTheme: () => void;
}

const Header = (props: Props) => {
  const { theme, handleChangeTheme } = props;

  return (
    <header>
      <div className="header_left">
        <img src={ReactIcon} alt="" />
        <span className="header_title">React Playground</span>
      </div>
      <div className="header_right">
        <div className="action_item" onClick={() => handleChangeTheme()}>
          <img src={theme === "light" ? LightIcon : DarkIcon} alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
