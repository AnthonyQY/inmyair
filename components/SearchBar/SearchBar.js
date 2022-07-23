import styles from "./SearchBar.module.css";

export default function SearchBar({ onChange, onClick }) {
  return (
    <div className={styles.search__container}>
      <div className={styles.search__flex}>
        <input
          className={styles.search__input}
          type="text"
          placeholder="City Name (e.g 'Los Angeles')"
          onChange={onChange}
        />
        <button className={styles.search__button} onClick={onClick}>
          Lookup
        </button>
      </div>
    </div>
  );
}
