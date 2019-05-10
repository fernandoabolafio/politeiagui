import React from "react";
import { Header as UIHeader } from "pi-ui";
import styles from "./Header.module.css";
import Logo from "src/style/piLogo.png";

const Header = () => {
  return (
    <UIHeader className={styles.customHeader}>
      <img src={Logo} alt="presentation" />
    </UIHeader>
  );
};

export default Header;
