import React, { useState } from "react";
import styles from "./Month.module.css";

function Month(props) {
  const [selectMonth, setSelectMonth] = useState({ name: "" });
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const handleClick = async (e) => {
    try {
      if (selectMonth.name !== e.target.name) {
        props.handleMonth(e.target.value);
      } else {
        props.handleUnMonth();
      }
      setSelectMonth({ ...selectMonth, name: e.target.name });
    } catch (error) {
      console.log(error.response);
    }
  };
  console.log(selectMonth);
  return (
    <div className={styles.buttonContainer}>
      {month.map((item, index) => (
        <button
          name={item}
          value={index + 1}
          type="button"
          class="btn btn-outline-primary"
          id="button__section"
          onClick={(e) => handleClick(e)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default Month;
