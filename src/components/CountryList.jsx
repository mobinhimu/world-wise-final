import { useSelector } from "react-redux";

import CountryItem from "./CountryItem";
import Message from "./Message";
import styles from "./CountryList.module.css";

function CountryList() {
  const { cities } = useSelector((store) => store.city);

  const countries = [];

  for (const city of cities) {
    const c = city.country;

    if (!countries.some((country) => country.country === c)) {
      countries.push(city);
    }
  }

  if (countries.length === 0)
    <Message message="Add your first city by clicking on a city on the map" />;
  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </div>
  );
}

export default CountryList;
