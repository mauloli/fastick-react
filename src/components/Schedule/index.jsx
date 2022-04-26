import React from "react";
import styles from "./Schedule.module.css";
import { Link, useNavigate } from "react-router-dom";
function Schedule(props) {
  const { premier, location, time, price } = props.schedule;
  const timeSchedule = time.split(",");

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/order");
  };
  return (
    <div className={styles.showTime}>
      <div className={styles.showTime_border}>
        <div className={`container ${styles.borderContainer}`}>
          <div className={styles.borderHeader}>
            <div className={styles.borderHeader_logo} style={{ flex: "1" }}>
              <img src={require(`../../assets/${premier}.png`)} alt="" />
            </div>
            <div className={styles.borderHeader_text} style={{ flex: "1" }}>
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>ebv.id</span>
              <span style={{ fontSize: "12px", display: "block", color: "rgba(110, 113, 145, 1)" }}>
                {location}
              </span>
            </div>
          </div>
          <hr />
          <div className="border-main">
            <div className="container">
              <div className="row text-center mt-2">
                {timeSchedule.map((item) => (
                  <div className="col-sm-3 col-3 mt-1" key={item}>
                    <div className={styles.borderTime}>{item}</div>
                  </div>
                ))}
              </div>
              <div className={`mt-4 mb-4 ${styles.borderPrice}`}>
                <span>Price</span>
                <span>{price}</span>
              </div>
              <div className={`text-center mt-4 ${styles.borderButton}`}>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  id="button__nav"
                  type="button"
                  onClick={handleClick}
                >
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
