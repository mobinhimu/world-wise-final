import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import { isAuthenticated } from "../components/features/citySlice/citySlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("mobinhimu@example.com");
  const [password, setPassword] = useState("mobin123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated: authenticated } = useSelector((store) => store.city);

  function handleLogin(eve) {
    eve.preventDefault();
    dispatch(isAuthenticated(email, password));
  }

  useEffect(() => {
    if (authenticated) navigate("/app", { replace: true });
  }, [authenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button
            type="primary"
            onClick={() => {
              isAuthenticated(email, password);
            }}
          >
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
