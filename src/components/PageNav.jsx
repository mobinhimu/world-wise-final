import styles from "./PageNav.module.css";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/">
        <Logo />
      </NavLink>
      <ul>
        <NavLink to="/pricing">Pricing</NavLink>
        <NavLink to="/product">Product</NavLink>
        <NavLink to="/login" className={styles.ctaLink}>
          Login
        </NavLink>
      </ul>
    </nav>
  );
}

export default PageNav;
