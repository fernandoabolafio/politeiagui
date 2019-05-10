import React from "react";
import { Link } from "react-router-dom";
import { Header as UIHeader } from "pi-ui";
import styles from "./Header.module.css";
import Logo from "src/style/piLogo.png";

const Header = () => {
  return (
    <UIHeader className={styles.customHeader}>
      <img src={Logo} alt="presentation" />
      {/* XXX replace the nav buttons to the specific component from pi-ui */}
      <nav>
        <Link to="/user/login" style={{ marginRight: "10px" }}>
          Log in
        </Link>
        <Link to="/user/signup">Sign up</Link>
      </nav>
    </UIHeader>
  );
};

export default Header;
