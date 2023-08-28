// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";

import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import useQueryString from "../hooks/useQueryString";
import { useDispatch, useSelector } from "react-redux";
import { createCity } from "./features/citySlice/citySlice";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [loading, setLoading] = useState(false);
  const [cityName, setCityName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();
  const [lat, lng] = useQueryString();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.city);

  async function handleAddCity(eve) {
    eve.preventDefault();

    await dispatch(
      createCity({
        cityName,
        country,
        emoji,
        date,
        notes,
        position: { lat, lng },
      })
    );

    navigate("/app/cities");
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
      );
      const data = await res.json();
      setCountry(data.countryName);
      setCityName(data.city);
      setEmoji(data.countryCode);
      setLoading(false);
    })();
  }, [lat, lng, navigate]);

  if (!cityName || !country)
    return (
      <Message message="This Is Not A Country. Please Select Another Place Of This Map " />
    );

  if (loading) return <Spinner />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles["loading"] : ""}`}
      onSubmit={handleAddCity}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{convertToEmoji(emoji)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" disabled={isLoading}>
          Add
        </Button>
        <Button type="back" onClick={() => navigate("/app/cities")}>
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
