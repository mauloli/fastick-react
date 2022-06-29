import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./ViewAll.module.css";
import Month from "../../components/Month";
import Footer from "../../components/Footer";
import CardMovie from "../../components/Card/cardUpcoming";
import Pagination from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { getMovieName, getMovie, getMovieMonth } from "../../stores/action/movie";
import { useNavigate } from "react-router-dom";

export default function ViewAll() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 8;
  const [sort, setSort] = useState({ sort: "" });
  const [listMonth, setListMonth] = useState({
    january: false,
    february: false,
    march: false,
    april: false,
    may: false,
    june: false,
    july: false,
    august: false,
    september: false,
    october: false,
    november: false,
    december: false
  });
  const movie = useSelector((state) => state.movie);
  console.log(movie);
  useEffect(() => {
    getDataMovie();
  }, [page]);
  const getDataMovie = async () => {
    await dispatch(getMovie(page, limit));
  };
  const handleSortMovie = async (e) => {
    const { name, value } = e.target;
    console.log(value);

    if (value !== "sort") {
      await dispatch(getMovie(page, limit, value));
    } else {
      await dispatch(getMovie(page, limit));
    }
  };
  const handlePage = (data) => {
    setPage(data.selected + 1);
  };
  const searhMovie = async (name) => {
    try {
      if (name.target.value === "") {
        await dispatch(getMovie(page, limit));
      } else {
        await dispatch(getMovieName(name.target.value));
      }
    } catch (error) {}
  };
  const movieMonth = async (month) => {
    try {
      await dispatch(getMovieMonth(month));
    } catch (error) {
      console.log(error.response);
    }
  };
  const unselectMonth = () => {
    getDataMovie();
  };
  const handleDetail = (id) => {
    navigate(`/movieDetails/${id}`);
  };
  console.log(movie);
  return (
    <div>
      <Navbar />
      <section className={styles.section}>
        <div className={`container `}>
          <header className={styles.header}>
            <div className={`${styles.headerContent} pt-5`}>
              <div className={`${styles.headerText} `}>
                <span>List Movie</span>
              </div>
              <div className={styles.headerForm}>
                <select name="" id="" onChange={(e) => handleSortMovie(e)}>
                  <option value="sort">Sort</option>

                  <option value="name">Name</option>
                  <option value="releaseDate">Month</option>
                </select>
                <input
                  style={{ paddingLeft: "10px" }}
                  type="text"
                  placeholder="Search Movie Name"
                  onChange={(e) => {
                    searhMovie(e);
                  }}
                />
              </div>
            </div>
            <Month handleMonth={movieMonth} handleUnMonth={unselectMonth} listMonth={listMonth} />
          </header>
        </div>
        <div className={`container ${styles.main}`}>
          <div className={styles.containerCard}>
            {movie.data.map((item) => (
              <div className={styles.cardMovie} key={item.id}>
                <CardMovie data={item} handleDetail={handleDetail} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.pagination}>
          <Pagination
            previousLabel={"Prev"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={movie.pageInfo.totalPage}
            onPageChange={handlePage}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            initialPage={page - 1}
          />
        </div>
      </section>

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
