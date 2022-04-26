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
    <div className="seat">
      <div className={`row ${styles.seatRow}`}>
        <div className="col">{rowSeat}</div>
        <div className={`col ${styles.seatList_container}`}>
          {leftSeat.map((item) => (
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
            >
              {item}
            </div>
          ))}
        </div>
        <div className="col"></div>
        <div className={`col ${styles.seatList_container}`}>
          {rightSeat.map((item) => (
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
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Seat;
