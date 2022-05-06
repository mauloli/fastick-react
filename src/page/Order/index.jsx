import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/index";
import { useNavigate } from "react-router-dom";
import styles from "./Order.module.css";
import Seat from "../../components/Seat";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import axios from "../../utils/axios";
function Order() {
  const seatList = ["A", "B", "C", "D", "E", "F", "G"];
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [reservedSeat, setReservedSeat] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log(state);
  const { dataOrder, dataMovie } = state;
  // console.log(dataMovie);

  const handleSelectSeat = (seat) => {
    // console.log(seat);
    if (selectedSeat.includes(seat)) {
      const deleteSeat = selectedSeat.filter((el) => {
        return el !== seat;
      });
      setSelectedSeat(deleteSeat);
    } else {
      setSelectedSeat([...selectedSeat, seat]);
    }
  };
  console.log(selectedSeat.length);

  const handleClick = () => {
    navigate("/payment", { state: { seatDetails: selectedSeat, ...state } });
  };
  useEffect(() => {
    getBookingByUserId();
  }, []);
  const getBookingByUserId = async () => {
    try {
      const dataUser = JSON.parse(localStorage.getItem("dataUser"));
      const result = await axios.get(
        `/booking/?scheduleId=${dataOrder.scheduleId}&dateBooking=${dataOrder.dateBooking}&timeBooking=${dataOrder.timeBooking}`
      );
      const seat = result.data.data;
      console.log(seat);

      setReservedSeat(seat);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.section}>
        <section className={`container ${styles.mainPage}`}>
          <div className={styles.movieSeat}>
            <div className="movie-select__main mb-5">
              <span style={{ fontWeight: "bold", margin: "10px" }}>Movie Select</span>
              <div className={styles.movieSelect}>
                <span style={{ fontWeight: "bold" }}>{dataMovie.name}</span>
                <div className="button-select">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    id="button__nav"
                    type="button"
                    style={{
                      backgroundColor: "rgba(239, 240, 246, 1)",
                      color: "rgba(95, 46, 234, 1)",
                      borderColor: "rgba(95, 46, 234, 1)"
                    }}
                    onClick={() => navigate("/")}
                  >
                    Chage Movie
                  </button>
                </div>
              </div>
            </div>

            <div className={`container ${styles.selectSeat_main}`}>
              <span style={{ fontWeight: "bold", margin: "10px" }}>Choose Your Seat</span>
              <div className={styles.seatContainer}>
                <div className={styles.containerSeat}>
                  <div>
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: "bold",
                        paddingTop: "30px"
                      }}
                    >
                      Screen
                    </span>
                    <hr
                      className={`a ${styles.hrLine}`}
                      style={{ paddingTop: "5px", margin: "30px 100px" }}
                    />
                  </div>
                  {seatList.map((item, index) => (
                    <div key={index}>
                      <Seat
                        rowSeat={item}
                        selectedSeat={handleSelectSeat}
                        reserved={reservedSeat}
                        selected={selectedSeat}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.containerButton}>
                <div className={styles.btnHide}>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    id="button__nav"
                    type="button"
                    style={{
                      backgroundColor: "rgba(239, 240, 246, 1)",
                      color: "rgba(95, 46, 234, 1)",
                      borderColor: "rgba(95, 46, 234, 1)"
                    }}
                    onClick={() => navigate("/")}
                  >
                    Change Movie
                  </button>
                </div>

                <div>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    id="button__nav"
                    type="button"
                    style={{
                      backgroundColor: "rgba(239, 240, 246, 1)",
                      color: "rgba(95, 46, 234, 1)",
                      borderColor: "rgba(95, 46, 234, 1)"
                    }}
                    onClick={handleClick}
                  >
                    Checkout Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.orderInfo}>
            <div className={styles.orderInfo_details}>
              <div className="mt-3" style={{ textAlign: "center" }}>
                <img
                  src="./assets/cineone.png"
                  alt=""
                  style={{ width: "120px", objectFit: "cover" }}
                />
                <span style={{ display: "block", fontSize: "20px" }}>CineOne 21 Cinema</span>
              </div>
              <div className="mt-3">
                <div className={`container ${styles.movieSelected}`}>
                  <span>Movie Selected</span>
                  <span style={{ fontSize: "14px", color: "black", fontWeight: "bold" }}>
                    {dataMovie.name}
                  </span>
                </div>
                <div className={`container ${styles.movieDated}`}>
                  <span>{dataOrder.dateBooking}</span>
                  <span style={{ fontSize: "14px", color: "black", fontWeight: "bold" }}>
                    {dataOrder.timeBooking}
                  </span>
                </div>
                <div className={`container ${styles.moviePriced}`}>
                  <span>One ticket price</span>
                  <span style={{ fontSize: "14px", color: "black", fontWeight: "bold" }}>
                    {dataOrder.price}
                  </span>
                </div>
                <div className={`container ${styles.movieSeated}`}>
                  <span>Seat choosed</span>
                  <span style={{ fontSize: "14px", color: "black", fontWeight: "bold" }}>
                    {selectedSeat.map((item) => ` ${item},`)}
                  </span>
                </div>
              </div>
              <hr />
              <div className={`${styles.movieTotalPayment}`}>
                <span>Total Payment</span>
                <span style={{ fontWeight: "700", color: "rgba(95, 46, 234, 1)" }}>
                  {dataOrder.price * selectedSeat.length}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Order;
