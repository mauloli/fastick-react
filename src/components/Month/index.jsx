import React from "react";
import styles from "./Month.module.css";

function Month() {
  return (
    <div className={styles.buttonContainer}>
      <button type="button" class="btn btn-outline-primary" id="button__section">
        January
      </button>
      <button type="button" class="btn btn-outline-primary">
        February
      </button>
      <button type="button" class="btn btn-outline-primary">
        March
      </button>
      <button type="button" class="btn btn-outline-primary">
        April
      </button>
      <button type="button" class="btn btn-outline-primary">
        May
      </button>
      <button type="button" class="btn btn-outline-primary">
        June
      </button>
      <button type="button" class="btn btn-outline-primary">
        July
      </button>
      <button type="button" class="btn btn-outline-primary">
        August
      </button>
      <button type="button" class="btn btn-outline-primary">
        September
      </button>
      <button type="button" class="btn btn-outline-primary">
        October
      </button>
      <button type="button" class="btn btn-outline-primary">
        November
      </button>
      <button type="button" class="btn btn-outline-primary">
        December
      </button>
    </div>
  );
}

export default Month;
