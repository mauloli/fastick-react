import React, { useEffect, useState } from "react";
import styles from "./Mschedule.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Schedule from "../../components/Schedule/admin";
import Pagination from "react-paginate";
import moviePoster from "../../assets/movie.JPG";
import { useDispatch, useSelector } from "react-redux";
import {
  getSchedule,
  postSchedule,
  patchSchedule,
  deleteSchedule
} from "../../stores/action/schedule";
import { getMovie } from "../../stores/action/movie";
import axios from "../../utils/axios";
import { createSearchParams, useNavigate } from "react-router-dom";

function ManageSchedule() {
  const [time, setTime] = useState([]);
  const [dataSchedule, setDataSchedule] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState();
  const [image, setImage] = useState("");
  const [selectPremier, setSelectPremier] = useState("");
  const [sortLocation, setSortLocation] = useState();
  const [sortMovie, setSortMovie] = useState();
  const [updateSchedule, setUpdateSchedule] = useState(false);
  const location = ["Jakarta", "Tangerang", "Bogor", "Tasik", "Bontang"];
  const premier = ["ebuid", "hiflix", "cineone"];
  const cloudinaryImg = process.env.REACT_APP_CLOUDINARY_RES;
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(postSchedule(dataSchedule));
    console.log(dataSchedule);
    getDataSchedule();
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    await dispatch(patchSchedule(dataSchedule.id, dataSchedule));
    handleReset(e);
    getDataSchedule();
  };
  const handleDelete = async (e) => {
    await dispatch(deleteSchedule(e));
    console.log(e);
    getDataSchedule();
  };
  const handleReset = (e) => {
    e.preventDefault();
    setDataSchedule({
      id: "",
      movieid: "",
      price: "",
      premier: "",
      location: "",
      dateStart: "",
      dateEnd: "",
      time: ""
    });
    setTime([]);
    setUpdateSchedule(false);
  };
  const handleChange = (e) => {
    if (e.key === "Enter") {
      setTime([...time, e.target.value]);
    }
  };
  const handeChangeForm = (e) => {
    const { value, name } = e.target;
    if (name == "movie") {
      const allDataMovie = movie.data.find((item) => {
        if (item.id == value) {
          return true;
        }
      });
      setDataSchedule({ ...dataSchedule, movieid: e.target.value });
      setImage(allDataMovie.image);
    } else {
      setDataSchedule({ ...dataSchedule, [name]: value });
    }
  };
  const handleChangePremiere = (e) => {
    setDataSchedule({ ...dataSchedule, premier: e.target.alt });
    setSelectPremier(e.target.alt);
  };
  const deleteTime = () => {
    setTime([]);
    setDataSchedule({ ...dataSchedule, time: "" });
  };

  // const onSelectMovie = (e) => {
  //   const image = e.target.value.split(",")[0];
  //   const id = e.target.value.split(",")[1];
  //   setImage(image);
  //   setDataSchedule({ ...dataSchedule, movieid: id });
  //   console.log(id);
  // };
  const handlePage = (data) => {
    setPage(data.selected + 1);
  };
  useEffect(() => {
    getDataSchedule();
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  useEffect(() => {
    getDataSchedule();
  }, [page, sortLocation, sortMovie, width]);

  const schedule = useSelector((state) => state.schedule);
  const movie = useSelector((state) => state.movie);
  const getDataSchedule = async () => {
    try {
      await dispatch(getSchedule(page, limit, sortMovie, sortLocation));
      await dispatch(getMovie(1, 10));
    } catch (error) {
      console.log(error.response);
    }
  };
  const selectedSchedule = async (id) => {
    const allScheduleData = schedule.data.find((item) => {
      if (item.id == id) {
        return true;
      }
    });

    let { movieid, price, premier, location, dateStart, dateEnd, time } = allScheduleData;
    const dataMovie = movie.data.find((item) => {
      if (item.id == movieid) {
        return true;
      }
    });

    setImage(dataMovie.image);
    dateStart = dateStart.split("T")[0];
    dateEnd = dateEnd.split("T")[0];
    setDataSchedule({
      ...dataSchedule,
      id: allScheduleData.id,
      movieid,
      price,
      premier,
      location,
      dateStart,
      dateEnd,
      time
    });
    time = time.split(",");
    setTime(time);
    setUpdateSchedule(!updateSchedule);
  };
  console.log(width);
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
                value={dataSchedule.movieid}
                onChange={(e) => handeChangeForm(e)}
                name="movie"
                id=""
                className={`mb-3 ${styles.selectMovie}`}
              >
                <option value=""> Select Movie</option>
                {movie.data.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <span className={`mb-3`}>Price</span>
              <form action="">
                <input
                  value={dataSchedule.price}
                  type="text"
                  name="price"
                  className={`mb-3 ${styles.inputPrice}`}
                  onChange={(e) => handeChangeForm(e)}
                />
              </form>
              <span className={`mb-3`}> Premiere</span>
              <div>
                {premier.map((item, index) => (
                  <img
                    className={`${styles.imagePremier} ${
                      dataSchedule.premier === item ? styles.imagePremierClick : ""
                    }`}
                    src={require(`../../assets/${item}.png`)}
                    alt={`${item}`}
                    onClick={(e) => handleChangePremiere(e)}
                  />
                ))}
              </div>
            </div>
            <div className={`${styles.thirdRow} container`}>
              <span className="mb-3">Location</span>
              <select
                value={dataSchedule.location}
                name="location"
                id=""
                className={`mb-3 ${styles.selectLocation}`}
                onChange={(e) => handeChangeForm(e)}
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
                    value={dataSchedule.dateStart}
                    name="dateStart"
                    type="date"
                    className={styles.inputStart}
                    onChange={(e) => handeChangeForm(e)}
                  />
                </div>
                <div className={styles.end}>
                  <span className="mb-3">Date End</span>
                  <input
                    value={dataSchedule.dateEnd}
                    name="dateEnd"
                    type="date"
                    className={styles.inputEnd}
                    onChange={(e) => handeChangeForm(e)}
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
                    placeholder=""
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
                  name="time"
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
                <form
                  action=""
                  onSubmit={updateSchedule ? handleUpdate : handleSubmit}
                  onReset={handleReset}
                >
                  <button className={`btn btn-primary`} type="reset">
                    Reset
                  </button>
                  <button className={`btn btn-primary`} type="submit">
                    {`${updateSchedule ? "Update" : "Submit"}`}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* -------------------------------------------------------------------  */}
      <div className={`container`}>
        <section className={styles.sectionTwo}>
          <div className={`${styles.sortContainer} mb-3 mt-5`}>
            <h3>Data Schedule</h3>
            <div className={`${styles.sortSelect}`}>
              <select className={styles.selectSort} name="" id="">
                <option value="">Sort</option>
              </select>
              <select
                name=""
                id=""
                value={sortLocation}
                onChange={(e) => setSortLocation(e.target.value)}
              >
                <option value="">Location</option>
                {location.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                name=""
                id=""
                value={sortMovie}
                onChange={(e) => setSortMovie(e.target.value)}
              >
                <option value="">Movie</option>
                {movie.data.map((item, index) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={`${styles.dataSchedule}`}>
            {schedule.data.map((item, index) => (
              <div
                className={styles.scheduleContainer}
                key={index}
                style={{ display: "inline-block", textAlign: "center" }}
              >
                <Schedule
                  schedule={item}
                  selectedSchedule={selectedSchedule}
                  handleDelete={handleDelete}
                  updateStatus={updateSchedule}
                />
              </div>
            ))}
            {schedule.data.length === 0 ? (
              <div
                style={{
                  height: "300px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <h1>Schedule Not Found</h1>
              </div>
            ) : (
              ""
            )}
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
