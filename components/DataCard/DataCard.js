import { useEffect, useState } from "react";
import styles from "./DataCard.module.css";

export default function DataCard({ inputValue, qualityIndex, statData }) {
  const [airQualityText, setAirQualityText] = useState("N/A");
  const [airQualityHighlight, setAirQualityHighlight] = useState("moderate");

  const syncAirQualityText = () => {
    switch (qualityIndex) {
      case 1:
        setAirQualityText("Good");
        setAirQualityHighlight(styles.quality__good);
        break;
      case 2:
        setAirQualityText("Fair");
        setAirQualityHighlight(styles.quality__fair);
        break;
      case 3:
        setAirQualityText("Moderate");
        setAirQualityHighlight(styles.quality__moderate);
        break;
      case 4:
        setAirQualityText("Poor");
        setAirQualityHighlight(styles.quality__poor);
        break;
      case 5:
        setAirQualityText("Very Poor");
        setAirQualityHighlight(styles.quality__verypoor);
        break;
      default:
        setAirQualityText("N/A");
        setAirQualityHighlight(styles.quality__moderate);
    }
  };

  useEffect(() => {
    syncAirQualityText();
  }, [qualityIndex]);

  return (
    <div className={styles.datacard__container}>
      <div className={styles.datacard__flex}>
        <h1 className={styles.datacard__title}>{inputValue}</h1>
        <div className={styles.datacard__quality__flex}>
          <h2 className={styles.datacard__subtitle}>Air Quality Index</h2>
          <div
            className={`${styles.datacard__quality__row__flex} ${airQualityHighlight}`}
          >
            <h3 className={styles.datacard__quality}>{qualityIndex}</h3>
            <p className={styles.datacard__quality__text}>{airQualityText}</p>
          </div>
        </div>
        <h1 className={styles.datacard__statistics__title}>Statistics</h1>
        <div className={styles.datacard__grid}>
          <div className={styles.datacard__grid__cell}>
            <h2>CO</h2>
            <p>{statData.co}</p>
          </div>
          <div className={styles.datacard__grid__cell}>
            <h2>NO</h2>
            <p>{statData.no}</p>
          </div>
          <div className={styles.datacard__grid__cell}>
            <h2>NO2</h2>
            <p>{statData.no2}</p>
          </div>
          <div className={styles.datacard__grid__cell}>
            <h2>O3</h2>
            <p>{statData.o3}</p>
          </div>
          <div className={styles.datacard__grid__cell}>
            <h2>SO2</h2>
            <p>{statData.so2}</p>
          </div>
          <div className={styles.datacard__grid__cell}>
            <h2>PM2_5</h2>
            <p>{statData.pm2_5}</p>
          </div>
          <div className={styles.datacard__grid__cell}>
            <h2>PM10</h2>
            <p>{statData.pm10}</p>
          </div>
          <div className={styles.datacard__grid__cell}>
            <h2>NH3</h2>
            <p>{statData.nh3}</p>
          </div>
        </div>
        <p></p>
      </div>
    </div>
  );
}
