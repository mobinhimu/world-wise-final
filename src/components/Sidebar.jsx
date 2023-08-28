import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import { Link, Outlet } from "react-router-dom";
import AppNav from "./AppNav";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Link to="/">
        <Logo />
      </Link>
      <AppNav />
      <Outlet />
    </div>
  );
}

export default Sidebar;
