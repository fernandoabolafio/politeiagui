import React from "react";
import { NavLink } from "react-router-dom";
import { Header as UIHeader } from "pi-ui";
import styles from "./Header.module.css";
import Logo from "src/style/piLogo.png";
import { useHeader } from "./hooks";

const Header = ({ history }) => {
  const { username, onLogout } = useHeader();
  return (
    <UIHeader className={styles.customHeader}>
      <img src={Logo} alt="presentation" />
      {/* XXX replace the nav buttons to the specific component from pi-ui */}
      {username ? 
      <div>
        <span style={{ marginRight: "10px" }}>{username}</span>
        <span onClick={onLogout}>Logout</span>
      </div>
       : 
      <nav className={styles.navContainer}>
        <NavLink 
         className={styles.navLink}
         activeClassName={styles.activeNavLink}
        to="/user/login">
          <span className={`${styles.navLinkText} ${styles.rightGreyBorder}`}>Log in</span>
          
        </NavLink>
        <NavLink
         className={styles.navLink}
         activeClassName={styles.activeNavLink}
         to="/user/signup">
         <span className={styles.navLinkText}>Sign up</span>
         </NavLink>
      </nav>}
    </UIHeader>
  );
};

export default Header;
