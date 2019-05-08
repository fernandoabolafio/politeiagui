import React, { useState } from "react";
import {
  Header,
  Container,
  Card,
  defaultDarkTheme,
  defaultLightTheme,
  useTheme
} from "pi-ui";
import "./styles.css";
import piLogo from "../style/piLogo.png";

// TODO: Move header to an external and high order context
const themes = {
  light: defaultLightTheme,
  dark: defaultDarkTheme
};

const AuthenticationPage = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const handleToggleTheme = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");
  useTheme(themes[theme]);
  return (
    <Container>
      <Header>
        <img src={piLogo} />
        <span onClick={handleToggleTheme}>Toggle theme</span>
      </Header>
      <div className="contentWrapper">
        <Card paddingSize={"medium"}>{children}</Card>
      </div>
    </Container>
  );
};

export default AuthenticationPage;
