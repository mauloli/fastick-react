import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./ViewAll.module.css";
import Month from "../../components/Month";
import Footer from "../../components/Footer";
import CardMovie from "../../components/Card/cardUpcoming";
import Pagination from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { getMovieName, getMovie } from "../../stores/action/movie";
import { useNavigate } from "react-router-dom";
export default function ViewAll() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie);
  console.log(movie);
  const searhMovie = async (name) => {
    try {
      if (name.target.value === "") {
        await dispatch(getMovie(1, 10));
      } else {
        await dispatch(getMovieName(name.target.value));
      }
    } catch (error) {}
  };
  const handleDetail = (id) => {
    navigate(`/movieDetails/${id}`);
  };
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
                <select name="" id="">
                  <option value="">Sort</option>

                  <option value="">Name</option>
                  <option value="">Month</option>
                </select>
                <input
                  type="text"
                  placeholder="Search Movie Name"
                  onChange={(e) => {
                    searhMovie(e);
                  }}
                />
              </div>
            </div>
            <Month />
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
            // onPageChange={handlePagination}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            // initialPage={page - 1}
          />
        </div>
      </section>

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
