import React from "react";
import styles from "./Schedule.module.css";

function Admin(props) {
  const { premier, location, time, price } = props.schedule;
  const timeSchedule = time.split(",");
  return (
    <div className={styles.showTime}>
      <div className={styles.showTime_border}>
        <div className={`container ${styles.borderContainer}`}>
          <div className={styles.borderHeader}>
            <div className={styles.borderHeader_logo} style={{ flex: "1" }}>
              <img src={require(`../../assets/${premier}.png`)} alt="" />
            </div>
            <div className={styles.borderHeader_text} style={{ flex: "1" }}>
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>{premier}</span>
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
                    <div
                      className={`${styles.borderTime}`}
                      style={{ cursor: "pointer" }}
                      //   onClick={(e) => clickTime(item, e)}
                    >
                      {item}
                    </div>
                  </div>
                ))}
              </div>

              <div className={`mt-4 mb-4 ${styles.borderPrice}`}>
                <span>Price</span>
                <span>{price}</span>
              </div>
              <div className={`text-center mt-4 ${styles.containerButton}`}>
                <button className="btn btn-sm btn-outline-primary" id="button__nav" type="button">
                  Update
                </button>
                <button className="btn btn-sm btn-outline-danger" id="button__nav" type="button">
                  Delete{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
