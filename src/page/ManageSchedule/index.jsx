import React, { useEffect, useState } from "react";
import styles from "./Mschedule.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Schedule from "../../components/Schedule/admin";
import Pagination from "react-paginate";
import moviePoster from "../../assets/movie.JPG";
import { useDispatch, useSelector } from "react-redux";
import { getSchedule, postSchedule } from "../../stores/action/schedule";
import { getMovie } from "../../stores/action/movie";
import axios from "../../utils/axios";
import { createSearchParams, useNavigate } from "react-router-dom";

function ManageSchedule() {
  const [time, setTime] = useState([]);
  const [dataSchedule, setDataSchedule] = useState({});
  const [page, setPage] = useState(1);
  const [image, setImage] = useState("");
  const location = ["Jakarta", "Tangerang", "Bogor", "Tasik", "Bontang"];
  const premier = ["ebuid", "hiflix", "cineone"];
  const cloudinaryImg = process.env.REACT_APP_CLOUDINARY_RES;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postSchedule(dataSchedule));
    console.log(dataSchedule);
    getDataSchedule();
  };
  const handleChange = (e) => {
    if (e.key === "Enter") {
      setTime([...time, e.target.value]);
    }
  };
  const deleteTime = () => {
    setTime([]);
    setDataSchedule({ ...dataSchedule, time: "" });
  };

  const onSelectMovie = (e) => {
    const image = e.target.value.split(",")[0];
    const id = e.target.value.split(",")[1];
    setImage(image);
    setDataSchedule({ ...dataSchedule, movieid: id });
    console.log(id);
  };
  const handlePage = (data) => {
    setPage(data.selected + 1);
  };
  useEffect(() => {
    getDataSchedule();
  }, []);
  useEffect(() => {
    getDataSchedule();
  }, [page]);

  const schedule = useSelector((state) => state.schedule);
  const movie = useSelector((state) => state.movie);
  const getDataSchedule = async () => {
    try {
      await dispatch(getSchedule(page, 6));
      await dispatch(getMovie(1, 10));
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
                <img src={`${image == "" ? moviePoster : `${cloudinaryImg}${image}`}`} alt="" />
              </div>
            </div>
            <div className={`${styles.secondRow}`}>
              <span className={`mb-3`}>Movie</span>
              <select
                onChange={(e) => onSelectMovie(e)}
                name=""
                id=""
                className={`mb-3 ${styles.selectMovie}`}
              >
                <option value=""> Select Movie</option>
                {movie.data.map((item) => (
                  <option value={[item.image, item.id]} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <span className={`mb-3`}>Price</span>
              <form action="">
                <input
                  type="text"
                  className={`mb-3 ${styles.inputPrice}`}
                  onChange={(e) => setDataSchedule({ ...dataSchedule, price: e.target.value })}
                />
              </form>
              <span className={`mb-3`}> Premiere</span>
              <div>
                {premier.map((item, index) => (
                  <img
                    src={require(`../../assets/${item}.png`)}
                    alt={`${item}`}
                    onClick={(e) => setDataSchedule({ ...dataSchedule, premier: e.target.alt })}
                  />
                ))}
              </div>
            </div>
            <div className={`${styles.thirdRow} container`}>
              <span className="mb-3">Location</span>
              <select
                name=""
                id=""
                className={`mb-3 ${styles.selectLocation}`}
                onChange={(e) => setDataSchedule({ ...dataSchedule, location: e.target.value })}
              >
                <option value=""> Select Location</option>
                {location.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
              <div className={`${styles.startEnd} mb-3`}>
                <div className={styles.start}>
                  <span className="mb-3">Date Start</span>
                  <input
                    type="date"
                    className={styles.inputStart}
                    onChange={(e) =>
                      setDataSchedule({ ...dataSchedule, dateStart: e.target.value })
                    }
                  />
                </div>
                <div className={styles.end}>
                  <span className="mb-3">Date End</span>
                  <input
                    type="date"
                    className={styles.inputEnd}
                    onChange={(e) => setDataSchedule({ ...dataSchedule, dateEnd: e.target.value })}
                  />
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
              <div className="d-flex justify-content-xl-around">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setDataSchedule({ ...dataSchedule, time: time.toString() })}
                >
                  Ok
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTime()}>
                  Del
                </button>
              </div>
              <div className={styles.containerButton}>
                <form action="" onSubmit={handleSubmit}>
                  <button className={`btn btn-primary`}>Reset</button>
                  <button className={`btn btn-primary`}>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* -------------------------------------------------------------------  */}
      <div className={`container`}>
        <section className={styles.sectionTwo}>
          <h3 className="mt-3">Data Schedule</h3>
          <div className={`${styles.dataSchedule}`}>
            {schedule.data.map((item, index) => (
              <div key={index} style={{ display: "inline-block", textAlign: "center" }}>
                <Schedule schedule={item} />
              </div>
            ))}
          </div>
          <div className={`${styles.pagination} d-flex justify-content-center`}>
            <Pagination
              previousLabel={"Prev"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={schedule.pageInfo.totalPage}
              onPageChange={handlePage}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              // initialPage={page - 1}
            />
          </div>
        </section>
      </div>
      <div className={`footer bg-white pt-1`}>
        <Footer />
      </div>
    </div>
  );
}

export default ManageSchedule;
