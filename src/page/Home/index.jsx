import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMovie } from "../../stores/action/movie";
import axios from "../../utils/axios";
import Navbar from "../../components/Navbar/index";
import CardMovie from "../../components/Card/cardNowShowing";
import CardUpcoming from "../../components/Card/cardUpcoming";
import Month from "../../components/Month/index";
import Footer from "../../components/Footer";
import styles from "./Home.module.css";
import banner from "../../assets/Group 14.jpg";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
function Home() {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getdataMovie();
  }, []);
  const movie = useSelector((state) => state.movie);
  console.log(movie);
  const getdataMovie = async () => {
    try {
      console.log("GET DATA MOVIE");

      // const resultMovie = await axios.get(`movie?page=${page}&limit=${limit}`);
      await dispatch(getMovie(page, limit));

      // setData(resultMovie.data.data);
      // setPageInfo(resultMovie.data.pagination);
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.stat === 403) {
        alert("please login first!");
        navigate("/login");
      }
    }
  };
  const handleDetail = (id) => {
    navigate(`/movieDetails/${id}`);
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
      <div className={styles.firstSection} id="nowShowing">
        <section className={`container`}>
          <div className={styles.nowShowing_nav}>
            <Link to="" className={styles.nowShowing_textShowing}>
              Now Showing
            </Link>
            <Link to="/viewAll" className={styles.nowShowing_textView}>
              View All
            </Link>
          </div>
          <div className={styles.containerCard}>
            {movie.data.map((item) => (
              <div className={styles.cardMovie} key={item.id}>
                <CardMovie data={item} handleDetail={handleDetail} />
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className={styles.secondSection}>
        <section className={`container`}>
          <div className={styles.nowShowing_nav}>
            <Link to="" className={styles.nowShowing_textShowing}>
              Upcoming Movie
            </Link>
            <Link to="/viewAll" className={styles.nowShowing_textView}>
              View All
            </Link>
          </div>
          <Month />
          <div className={styles.containerCard}>
            {movie.data.map((item) => (
              <div className={styles.cardMovie} key={item.id}>
                <CardUpcoming data={item} handleDetail={handleDetail} />
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className={styles.thirdSection}>
        <section className={`container`}>
          <div class={styles.join}>
            <div class={styles.joinText}>
              <span>Be the vanguard of the</span>
              <h2>Moviegoers</h2>
            </div>
            <div class={styles.joinInput}>
              <input type="email" placeholder="type your email" />
              <button type="button" class="btn btn-outline-primary" id="button">
                Join Now
              </button>
            </div>
            <footer>
              <span> By joining you as a Tickitz member, </span>
              <span>we will always send you the latest updates via email .</span>
            </footer>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
