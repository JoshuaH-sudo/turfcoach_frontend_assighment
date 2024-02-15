"use client";
import { FormEvent } from "react";
import styles from "./page.module.css";

// Would not realistically hardcoded the api key but the task is for frontend demonstration purposes.
// Api key will be deactivated after review.
const apiKey = "99415a21e30bf87c261fcec6637619c6"

export default function Home() {
  async function getCityWeatherInfo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log(formData);
    const city = formData.get("city")
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

    console.log(response)
    // Handle response if necessary
    // const data = await response.json();
    // console.log(data);
  }

  return (
    <main className={styles.main}>
      <h1>Weather Report</h1>
      <form onSubmit={getCityWeatherInfo} style={{ flex: "true", flexDirection: "row" }}>
        <input id="cityInput" name="city" defaultValue="Enter City" />
        <button type="submit">Enter</button>
      </form>
    </main>
  );
}
