import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import styles from "./MovieDetails.module.css";
import Navbar from "../../components/Navbar/";
import Schedule from "../../components/Schedule";
import Footer from "../../components/Footer";
import { useParams, useNavigate } from "react-router-dom";
function MovieDetails(props) {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [dataSchedule, setSchedule] = useState([]);
  let { releaseDate } = data;
  const [dataOrder, setDataOrder] = useState({
    movieId: id,
    dateBooking: new Date().toISOString().split("T")[0]
  });
  console.log(dataOrder);

  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  console.log(location);

  const getdataMovie = async () => {
    try {
      console.log("GET DATA MOVIE");
      const resultMovie = await axios.get(`movie/${id}`);
      const resultSchedule = await axios.get(
        `schedule/?page=1&limit=10&searchMovieid=${id}&searchLocation=${location}&sortSchedule=id `
      );
      // console.log(resultSchedule.data.data);

      setData(resultMovie.data.data[0]);
      setSchedule(resultSchedule.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getdataMovie();
  }, [location]);

  const changeDataBooking = (data) => {
    console.log(data);
    setDataOrder({ ...dataOrder, ...data });
  };
  const handleBooking = (dataSeat) => {
    console.log(dataSeat);
    setDataOrder({ ...dataOrder, dataMovie: data });
    navigate("/order", { state: { dataOrder: dataOrder, dataMovie: data } });
  };

  return (
    <div>
      <Navbar />
      <article className={styles.article}>
        <div className={`row ${styles.articleMain}`}>
          <div className={`col-4 ${styles.articleMain_img}`}>
            <div className={`${styles.articleImage}`}>
              <img
                src={`https://res.cloudinary.com/dfoi1ro2a/image/upload/v1649233762/${data.image}`}
                alt=""
              />
            </div>
          </div>
          <div className={`col-8 ${styles.articleMain_text}`}>
            <div className={styles.articleText}>
              <div className={styles.articleText_title}>
                <h1>{data.name}</h1>
                <span>{data.category}</span>
              </div>
              <div className={`${styles.articleText_details}`}>
                <div className={styles.detailsDate_duration}>
                  <span className={styles.spanRelease}>relase date</span>
                  <span>{releaseDate ? releaseDate.split("T")[0] : ""}</span>
                  <span className={styles.spanDuration}>duration</span>
                  <span>{data.duration}</span>
                </div>
                <div className={styles.detailsDirect_cast}>
                  <span className={styles.spanDirect}>Direct by</span>
                  <span>{data.director}</span>
                  <span className={styles.spanCast}>Cast</span>
                  <span>{data.cast}</span>
                </div>
              </div>
              <hr style={{ border: "rgba(222, 222, 222, 1)" }} />
              <div className="article__synopsis">
                <p style={{ fontWeight: "bold" }}>Synopsis</p>
                <span style={{ color: "#4e4b66" }}>{data.synopsis}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
      <section className={styles.thirdSection}>
        <div className="container">
          <header className={styles.header}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: "24px" }}>
              {/* font-size: 24px; font-weight: bold; margin: 20px 0px */}
              Show Time and Tickets
            </h1>
            <div>
              <input
                type="date"
                name=""
                id=""
                className={styles.input}
                min={new Date().toISOString().split("T")[0]}
                max="2022-04-30"
                onChange={(e) => setDataOrder({ ...dataOrder, dateBooking: e.target.value })}
              />
              <select
                name=""
                id="map-marker"
                className={styles.select}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">All</option>
                <option value="Tangerang">Tangerang</option>
                <option value="Bontang">Bontang</option>
                <option value="Bogor">Bogor</option>
                <option value="Tasik">Tasik</option>
              </select>
            </div>
          </header>
        </div>
        <div className={styles.scheduleContainer}>
          {dataSchedule.map((item, index) => (
            <div key={item.id} style={{ display: "inline-block", textAlign: "center" }}>
              <Schedule
                schedule={item}
                handleBooking={handleBooking}
                changeDataBooking={changeDataBooking}
                dataOrder={dataOrder}
              />
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MovieDetails;
