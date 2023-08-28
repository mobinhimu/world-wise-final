import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCity } from "./citySlice";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "../../Message";
import Spinner from "../../Spinner";

function CityList() {
  const dispatch = useDispatch();
  const { cities, isLoading } = useSelector((store) => store.city);

  useEffect(() => {
    dispatch(getCity());
  }, [dispatch]);

  if (cities.length === 0)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </div>
  );
}

export default CityList;
