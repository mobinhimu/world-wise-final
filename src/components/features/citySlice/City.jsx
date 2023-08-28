import { useNavigate, useParams } from "react-router-dom";
import Button from "../../Button";
import styles from "./City.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentCity } from "./citySlice";
import Spinner from "../../Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentCity, isLoading } = useSelector((store) => store.city);
  const { id } = useParams();

  useEffect(() => {
    if (+id === +currentCity?.id) return;

    dispatch(getCurrentCity(id));
  }, [dispatch, id, currentCity?.id]);

  if (!currentCity) return;

  const { cityName, emoji, date, notes } = currentCity;

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className={styles.city}>
        <div className={styles.row}>
          <h6>City name</h6>
          <h3>
            <span>{emoji}</span> {cityName}
          </h3>
        </div>

        <div className={styles.row}>
          <h6>You went to {cityName} on</h6>
          <p>{formatDate(date || null)}</p>
        </div>

        {notes && (
          <div className={styles.row}>
            <h6>Your notes</h6>
            <p>{notes}</p>
          </div>
        )}

        <div className={styles.row}>
          <h6>Learn more</h6>
          <a
            href={`https://en.wikipedia.org/wiki/${cityName}`}
            target="_blank"
            rel="noreferrer"
          >
            Check out {cityName} on Wikipedia &rarr;
          </a>
        </div>

        <div>
          <Button type="back" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </div>
    </>
  );
}

export default City;
