import { useDispatch, useSelector } from "react-redux";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { deleteCity } from "./citySlice";

function dateFormat(date) {
  const converter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

  return converter;
}

function CityItem({ city }) {
  const { cityName, emoji, date, position, id } = city;
  const { currentCity } = useSelector((store) => store.city);
  const dispatch = useDispatch();

  function handleDelete(eve) {
    eve.preventDefault();
    dispatch(deleteCity(id));
  }

  return (
    <Link
      className={`${styles.cityItem} ${
        id === currentCity?.id ? styles["cityItem--active"] : ""
      }`}
      to={`${id}?lat=${position.lat}&lng=${position.lng}`}
    >
      <span className={styles.emoji}>{emoji}</span>
      <span className={styles.name}>{cityName}</span>
      <span className={styles.date}>{dateFormat(date)}</span>

      <button className={styles.deleteBtn} onClick={handleDelete}>
        &#10005;
      </button>
    </Link>
  );
}

export default CityItem;
