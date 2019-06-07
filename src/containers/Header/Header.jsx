import React from "react";
import { NavLink } from "react-router-dom";
import { Header as UIHeader } from "pi-ui";
import styles from "./Header.module.css";
import Logo from "src/assets/pi-logo-light.svg";
import { useHeader } from "./hooks";

const Header = ({ noBorder }) => {
  const { user, onLogout } = useHeader();
  return (
    <UIHeader
      className={`${styles.customHeader} ${noBorder ? styles.noBorder : ""}`}
    >
      <NavLink to="/">
        <img src={Logo} alt="presentation" />
      </NavLink>
      {user ? (
        <div>
          <NavLink to={`/user/${user.userid}`} style={{ marginRight: "10px" }}>
            {user.username}
          </NavLink>
          <span onClick={onLogout}>Logout</span>
        </div>
      ) : (
        <nav className={styles.navContainer}>
          <NavLink
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            to="/user/login"
          >
            <span className={`${styles.navLinkText} ${styles.rightGreyBorder}`}>
              Log in
            </span>
          </NavLink>
          <NavLink
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            to="/user/signup"
          >
            <span className={styles.navLinkText}>Sign up</span>
          </NavLink>
        </nav>
      )}
    </UIHeader>
  );
};

export default Header;
