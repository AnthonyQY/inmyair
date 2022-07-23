import { useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import Head from "next/head";

import SearchBar from "../components/SearchBar/SearchBar";
import DataCard from "../components/DataCard/DataCard";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [widgetElevated, setWidgetElevated] = useState(false);
  const [titleVisible, setTitleVisible] = useState(true);
  const [datacardVisible, setDatacardVisible] = useState(false);

  const [lookupInput, setLookupInput] = useState("");
  const [datacard, setDatacard] = useState(undefined);

  const widgetVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
      },
    },
    elevated: {
      scale: 1,
      opacity: 1,
      margin: "-40vh",
      transition: {
        type: "linear",
      },
    },
  };

  const titleVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
    },
  };

  const datacardVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
        type: "spring",
      },
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
      },
    },
    refresh: {
      scale: [0, 1],
      opacity: [0, 1],
      transition: {
        duration: 0.5,
        type: "spring",
      },
    },
  };

  async function handleLookupButton() {
    if (!widgetElevated) {
      setWidgetElevated(true);
    }
    if (titleVisible) {
      setTitleVisible(false);
    }

    const airStats = await axios.get("/api/airStatistics", {
      params: { location: lookupInput },
    });

    setDatacardVisible(false);

    setTimeout(function () {
      setDatacard(
        <DataCard
          inputValue={lookupInput}
          qualityIndex={airStats.data.main.aqi}
          statData={airStats.data.components}
        />
      );
      setDatacardVisible(true);
    }, 100);
  }

  const handleLookupInputChange = (e) => {
    setLookupInput(e.target.value);
  };

  return (
    <div className={styles.home__container}>
      <Head>
        <title>InMyAir</title>
        <meta name="description" content="Air Quality Index" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.home__flex}>
        <motion.div
          className={styles.home__widget__container}
          variants={widgetVariants}
          initial="hidden"
          animate={widgetElevated ? "elevated" : "visible"}
        >
          <div className={styles.home__widget__flex}>
            <motion.div
              className={styles.home__widget__title__flex}
              variants={titleVariants}
              initial="visible"
              animate={titleVisible ? "visible" : "hidden"}
            >
              <h1 className={styles.home__widget__title}>
                What's in your air?
              </h1>
              <h2 className={styles.home__widget__subtitle}>Let's find out.</h2>
            </motion.div>
            <SearchBar
              className={styles.home__searchbar}
              onChange={handleLookupInputChange}
              onClick={handleLookupButton}
            />
          </div>
        </motion.div>
        <motion.div
          variants={datacardVariants}
          initial="hidden"
          animate={datacardVisible ? "refresh" : "hidden"}
        >
          {datacard}
        </motion.div>
      </div>
    </div>
  );
}
