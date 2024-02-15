"use client";
import { FormEvent, useEffect, useState } from "react";
import styles from "./page.module.css";

// Would not realistically hardcoded the api key but the task is for frontend demonstration purposes.
// Api key will be deactivated after review.
const apiKey = "99415a21e30bf87c261fcec6637619c6";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<any | undefined>();
  const [error, setError] = useState<string | undefined>();

  async function getCityWeatherInfo(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const city = formData.get("city");

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

    const data = await response.json();
    setWeatherData({ ...data });
    setLoading(false);
  }

  let content = <h2>Enter A City Name</h2>;

  if (loading) {
    content = <h2>Loading</h2>;
  }
  if (!loading && error) {
    content = (
      <div>
        <h2>Failed To Get Weather Data</h2>
        <p>{error}</p>
      </div>
    );
  }
  if (!loading && weatherData) {
    content = (
      <div>
        <p>{weatherData.coord.lat}</p>
        <p>{weatherData.coord.lon}</p>
        <p>{weatherData.main.temp}</p>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <h1>Weather Report</h1>
      <form onSubmit={getCityWeatherInfo} style={{ flex: "true", flexDirection: "row" }}>
        <input id="cityInput" name="city" placeholder="Enter City" />
        <button type="submit">Enter</button>
      </form>
      <div>{content}</div>
    </main>
  );
}
