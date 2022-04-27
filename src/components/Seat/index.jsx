import React, { useEffect, useState } from "react";
import styles from "./Seat.module.css";
function Seat(props) {
  const { rowSeat, selectedSeat, reserved, selected } = props;
  const [leftSeat, setLeftSeat] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [rightSeat, setRightSeat] = useState([8, 9, 10, 11, 12, 13, 14]);

  useEffect(() => {
    setupSeat();
  }, []);
  const setupSeat = () => {
    const leftSeatRow = leftSeat.map((item) => `${rowSeat}${item}`);
    const rightSeatRow = rightSeat.map((item) => `${rowSeat}${item}`);
    setLeftSeat(leftSeatRow);
    setRightSeat(rightSeatRow);
  };

  return (
    <div className={styles.seat} style={{ width: "100%" }}>
      <div className={`row ${styles.seatRow}`}>
        <div className={`col ${styles.seatLetter}`}>{rowSeat}</div>

        {leftSeat.map((item) => (
          <div className={`col ${styles.seatList_container}`} key={item}>
            <div
              className={`${styles.seatList} ${
                reserved.includes(item)
                  ? styles.seatList_sold
                  : selected.includes(item)
                  ? styles.seatList_selected
                  : styles.seatList_available
              }`}
              onClick={() => {
                // eslint-disable-next-line no-unused-expressions
                reserved.includes(item) ? null : selectedSeat(item);
              }}
            ></div>
          </div>
        ))}

        <div className="col"></div>

        {rightSeat.map((item, index) => (
          <div className={`col ${styles.seatList_container}`} key={index}>
            <div
              className={`${styles.seatList} ${
                reserved.includes(item)
                  ? styles.seatList_sold
                  : selected.includes(item)
                  ? styles.seatList_selected
                  : styles.seatList_available
              }`}
              onClick={() => {
                // eslint-disable-next-line no-unused-expressions
                reserved.includes(item) ? null : selectedSeat(item);
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Seat;
