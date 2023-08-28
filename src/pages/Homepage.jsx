import PageNav from "../components/PageNav";
import Button from "../components/Button";

import styles from "./Homepage.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((store) => store.city);

  function handleTrack() {
    isAuthenticated ? navigate("/app/cities") : navigate("login");
  }
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>

        <Button onClick={handleTrack} type="primary">
          Start Tracking Now
        </Button>
      </section>
    </main>
  );
}
