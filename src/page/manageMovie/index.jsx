import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/index";
import Footer from "../../components/Footer";
import CardMovie from "../../components/Card/cardUpcoming";
import Pagination from "react-paginate";
import styles from "./Mmovie.module.css";
import Modal from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovie,
  postMovie,
  patchMovie,
  deleteMovie,
  getMovieName
} from "../../stores/action/movie";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
function ManageMovie() {
  const [image, setImage] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 8;
  const [update, setUpdate] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const cloudinaryImg = process.env.REACT_APP_CLOUDINARY_RES;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const movie = useSelector((state) => state.movie);
  const [form, setForm] = useState({
    name: "",
    category: "",
    synopsis: "",
    cast: "",
    director: "",
    duration: "",
    durationHour: "",
    durationMinute: "",
    releaseDate: "",
    image: null
  });
  useEffect(() => {
    getDataMovie();
  }, [page]);
  useEffect(() => {
    setForm({ ...form, duration: form.durationHour + form.durationMinute });
  }, [form.durationMinute]);
  // const [duration, setDuration] = useState("");
  const getDataMovie = async () => {
    try {
      await dispatch(getMovie(page, limit));
    } catch (error) {}
  };
  const findMovie = async (e) => {
    try {
      if (e.target.value === "") {
        await dispatch(getDataMovie());
      } else {
        await dispatch(getMovieName(e.target.value));
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleDetail = (e) => {
    console.log(e);
  };
  const handleChangeForm = (e) => {
    const { name, value, files } = e.target;
    if (name == "image") {
      setForm({ ...form, [name]: files[0] });
      setImage(URL.createObjectURL(files[0]));
    } else if (name == "durationMinute") {
      setForm({ ...form, [name]: value });
      // setForm({ ...form, duration: form.durationHour + form.durationMinute });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const data in form) {
      formData.append(data, form[data]);
    }
    await dispatch(postMovie(formData));
    getDataMovie();
    handleReset(e);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const data in form) {
      formData.append(data, form[data]);
    }
    await dispatch(patchMovie(params.movieId, formData));
    getDataMovie();
    handleReset(e);
  };
  const handleDelete = async (id) => {
    await dispatch(deleteMovie(id));
    // window.confirm("test");
    console.log(id);
    getDataMovie();
  };
  const handleReset = (e) => {
    e.preventDefault();
    setForm({
      name: "",
      category: "",
      synopsis: "",
      cast: "",
      director: "",
      duration: "",
      durationHour: "",
      durationMinute: "",
      releaseDate: "",
      image: null
    });
    setImage(null);
    setUpdate(false);
  };
  const selectUpdate = (id) => {
    const allMovieData = movie.data.find((item) => {
      if (item.id == id) {
        return true;
      }
    });
    let { name, category, synopsis, cast, director, duration, releaseDate, image } = allMovieData;
    setImage(image);
    releaseDate = releaseDate.split("T")[0];
    setForm({
      ...form,
      name,
      category,
      synopsis,
      cast,
      director,
      duration,
      releaseDate,
      image
    });
    setUpdate(!update);
    console.log(allMovieData.id);
    if (update) {
      setForm({
        name: "",
        category: "",
        synopsis: "",
        cast: "",
        director: "",
        duration: "",
        durationHour: "",
        durationMinute: "",
        releaseDate: "",
        image: null
      });
    }
    navigate({
      pathname: "/manageMovie",
      search: `?${createSearchParams({
        movieId: id
      })}`
    });
  };
  const handlePage = (data) => {
    setPage(data.selected + 1);
  };
  return (
    <div style={{ backgroundColor: "#F5F6F8" }}>
      <Navbar />
      <div className="container">
        <section>
          <h3 className="mt-3">Form Movie</h3>
          <div className={`container ${styles.formMovie}`}>
            <div className={styles.firstColumn}>
              <div className={styles.firstRow}>
                <div className={styles.imageBorder}>
                  <input
                    className={`${styles.inputFile} ${
                      image !== null || undefined ? styles.inputFileHide : ``
                    } `}
                    type="file"
                    name="image"
                    id=""
                    onChange={(e) => handleChangeForm(e)}
                  />
                  {image !== null || undefined ? (
                    image.search("blob") != -1 ? (
                      <img
                        onClick={(e) => setImage(null)}
                        className={styles.imageMovie}
                        src={image}
                        alt=""
                      />
                    ) : (
                      <img
                        onClick={(e) => setImage(null)}
                        className={styles.imageMovie}
                        src={`${cloudinaryImg}${image}`}
                        alt=""
                      />
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className={styles.secondRow}>
                <span className="mb-3">Movie Name</span>
                <input
                  className={`${styles.inputName} mb-3`}
                  value={form.name}
                  type="text"
                  name="name"
                  id=""
                  onChange={(e) => {
                    handleChangeForm(e);
                  }}
                />
                <span className="mb-3">Director</span>
                <input
                  className={`${styles.inputDirector} mb-3`}
                  value={form.director}
                  name="director"
                  type="text"
                  onChange={(e) => handleChangeForm(e)}
                />
                <span className="mb-3">Release Date</span>
                <input
                  className={styles.inputReleaseDate}
                  value={form.releaseDate}
                  type="text"
                  name="releaseDate"
                  id=""
                  onChange={(e) => handleChangeForm(e)}
                />
              </div>
              <div className={styles.thirdRow}>
                <span className="mb-3">Category</span>
                <input
                  className={`${styles.inputCategory} mb-3`}
                  value={form.category}
                  type="text"
                  name="category"
                  id=""
                  onChange={(e) => handleChangeForm(e)}
                />
                <span className="mb-3">Cast</span>
                <input
                  className={`${styles.inputCast} mb-3`}
                  value={form.cast}
                  type="text"
                  name="cast"
                  onChange={(e) => handleChangeForm(e)}
                />
                <div className={styles.durationContainer}>
                  <div className={styles.durationHour}>
                    <span className="mb-3">Duration Hour</span>
                    <input
                      className={`${styles.inputHour} mt-3`}
                      value={form.durationHour}
                      type="text"
                      name="durationHour"
                      onChange={(e) => handleChangeForm(e)}
                    />
                  </div>
                  <div className={styles.durationMinute}>
                    <span className="mb-3">Duration Minute</span>
                    <input
                      className={`${styles.inputMinute} mt-3`}
                      value={form.durationMinute}
                      type="text"
                      name="durationMinute"
                      onChange={(e) => handleChangeForm(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.secondColumn}>
              <span className="mb-3">Synopsis</span>
              <textarea
                className={`${styles.inputSynopsis} mb-3`}
                value={form.synopsis}
                name="synopsis"
                id=""
                cols="30"
                rows="10"
                onChange={(e) => handleChangeForm(e)}
              ></textarea>

              <div className={`${styles.containerButton} mb-3`}>
                <form
                  action=""
                  onSubmit={update ? handleUpdate : handleSubmit}
                  onReset={handleReset}
                >
                  <button className="btn btn-outline-danger" type="reset">
                    Reset
                  </button>
                  <button
                    className={`btn btn-outline-primary ${styles.buttonSubmit}`}
                    type="submit"
                  >
                    {update ? `Update` : `Submit`}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* --------------------------------------------------------------- */}
      <div className="container">
        <section>
          <div className={`mt-5 mb-2 ${styles.sortContainer}`}>
            <h3 className=""> Data Movie</h3>
            <div className={styles.searchAndSort}>
              <select name="" id="">
                <option value="">Sort</option>
              </select>
              <input type="text" placeholder="Search Movie" onChange={(e) => findMovie(e)} />
            </div>
          </div>

          <div className={styles.dataMovie}>
            {movie.data.map((item, index) => (
              <div
                className={styles.movieContainer}
                style={{ display: "inline-block", textAlign: "center" }}
                key={index}
              >
                <CardMovie
                  data={item}
                  handleDetail={handleDetail}
                  handleUpdate={selectUpdate}
                  handleDelete={handleDelete}
                  statusUpdate={update}
                />
              </div>
            ))}
          </div>
          <div className={`${styles.pagination} d-flex justify-content-center`}>
            <Pagination
              previousLabel={"Prev"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={movie.pageInfo.totalPage}
              onPageChange={handlePage}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              // initialPage={page - 1}
            />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default ManageMovie;
