import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import Navbar from "../../components/Navbar/index";
import CardMovie from "../../components/Card/cardNowShowing";
import styles from "./Home.module.css";
import banner from "../../assets/Group 14.jpg";
import { Link } from "react-router-dom";
function Home() {
  const limit = 6;
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    getdataMovie();
  }, []);

  const getdataMovie = async () => {
    try {
      console.log("GET DATA MOVIE");

      const resultMovie = await axios.get(`movie?page=${page}&limit=${limit}`);

      setData(resultMovie.data.data);
      setPageInfo(resultMovie.data.pagination);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleDetail = (id) => {
    console.log(id);
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <article className={styles.articleContainer}>
          <div className={styles.articleText}>
            <div className={styles.articleText_text}>
              <p>Nearest Cinema, Newest Movie,</p>
              <h1>Find out Now</h1>
            </div>
          </div>
          <div className={styles.articleImg}>
            <img src={banner} alt="" className={styles.articleImg_img} />
          </div>
        </article>
      </div>
      <div className={styles.firstSection}>
        <section className={`container`}>
          <div className={styles.nowShowing_nav}>
            <Link to="basic/router" className={styles.nowShowing_textShowing}>
              Now Showing
            </Link>
            <Link to="" className={styles.nowShowing_textView}>
              View All
            </Link>
          </div>
          <div className={styles.containerCard}>
            {data.map((item) => (
              <div className={styles.cardMovie} key={item.id}>
                <CardMovie data={item} handleDetail={handleDetail} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
