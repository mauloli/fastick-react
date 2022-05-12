import React, { useEffect, useState } from "react";
import styles from "./Mschedule.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Schedule from "../../components/Schedule/admin";
import { useDispatch, useSelector } from "react-redux";
import { getSchedule } from "../../stores/action/schedule";
function ManageSchedule() {
  const [time, setTime] = useState([]);
  const [dataSchedule, setDataSchedule] = useState([]);
  const dispatch = useDispatch();
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));
  console.log(dataUser);
  const handleChange = (e) => {
    if (e.key === "Enter") {
      setTime([...time, e.target.value]);
    }
  };

  useEffect(() => {
    getDataSchedule();
  }, []);
  const schedule = useSelector((state) => state.schedule);
  const getDataSchedule = async () => {
    try {
      await dispatch(getSchedule(1, 6));
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div style={{ backgroundColor: "#F5F6F8" }}>
      <Navbar />
      <div className={`container `}>
        <section>
          <h3 className="mt-3">Form Schedule</h3>
          <div className={`${styles.formSchedule}`}>
            <div className={styles.firstRow}>
              <div className={styles.imageBorder}>
                <img src={require("../../assets/tenet.png")} alt="" />
              </div>
            </div>
            <div className={`${styles.secondRow}`}>
              <span className={`mb-3`}>Movie</span>
              <select name="" id="" className={`mb-3 ${styles.selectMovie}`}>
                <option value=""> Select Movie</option>
              </select>
              <span className={`mb-3`}>Price</span>
              <form action="">
                <input type="text" className={`mb-3 ${styles.inputPrice}`} />
              </form>
              <span className={`mb-3`}> Premiere</span>
              <div>
                <img
                  src={require("../../assets/cineone.png")}
                  alt="cineone"
                  value="cineone"
                  onClick={(e) => {
                    console.log(e.target.alt);
                  }}
                />
                <img src={require("../../assets/hiflix.png")} alt="hiflix" />
                <img src={require("../../assets/ebuid.png")} alt="ebuid" />
              </div>
            </div>
            <div className={`${styles.thirdRow} container`}>
              <span className="mb-3">Location</span>
              <select name="" id="" className={`mb-3 ${styles.selectLocation}`}>
                <option value=""> Select Location</option>
              </select>
              <div className={`${styles.startEnd} mb-3`}>
                <div className={styles.start}>
                  <span className="mb-3">Date Start</span>
                  <input type="date" className={styles.inputStart} />
                </div>
                <div className={styles.end}>
                  <span className="mb-3">Date End</span>
                  <input type="date" className={styles.inputEnd} />
                </div>
              </div>
              <span className="mb-3">Time</span>
              <div className={styles.addTime}>
                <div className={styles.addIcon}>
                  <input
                    className={styles.inputTime}
                    type="text"
                    name=""
                    id=""
                    placeholder="+"
                    onKeyDown={(e) => handleChange(e)}
                  />
                  {time.map((item) => (
                    <div className={styles.timeOrder}>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.containerButton}>
                <button className={`btn btn-primary`}>Reset</button>
                <button className={`btn btn-primary`}>Submit</button>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* -------------------------------------------------------------------  */}
      <div className={`container`}>
        <section>
          <h3 className="mt-3">Data Schedule</h3>
          <div className={`${styles.dataSchedule}`}>
            {schedule.data.map((item, index) => (
              <div key={index} style={{ display: "inline-block", textAlign: "center" }}>
                <Schedule schedule={item} role="admin" />
              </div>
            ))}
          </div>
        </section>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default ManageSchedule;
