import React, { useState } from "react";
import Navbar from "../../components/Navbar/index";
import styles from "./Order.module.css";
import Seat from "../../components/Seat";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
function Order() {
  const seatList = ["A", "B", "C", "D", "E", "F", "G"];
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [reservedSeat, setReservedSeat] = useState(["A1", "C2", "B11"]);
  const { state } = useLocation();
  console.log(state);

  const handleSelectSeat = (seat) => {
    console.log(seat);
    if (selectedSeat.includes(seat)) {
      const deleteSeat = selectedSeat.filter((el) => {
        return el !== seat;
      });
      setSelectedSeat(deleteSeat);
    } else {
      setSelectedSeat([...selectedSeat, seat]);
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
                <span style={{ fontWeight: "bold" }}>Spider-Man: Home coming</span>
                <div className="button-select">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    id="button__nav"
                    type="button"
                    style={{
                      backgroundColor: "rgba(239, 240, 246, 1);",
                      color: "rgba(95, 46, 234, 1);",
                      borderColor: "rgba(95, 46, 234, 1);"
                    }}
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
                  {seatList.map((item) => (
                    <div>
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
                  >
                    Chage Movie
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
                  >
                    <a
                      href="./payment.html"
                      style={{ textDecoration: "none", color: "rgba(95, 46, 234, 1)" }}
                    >
                      Checkout Now
                    </a>
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
                <div className={`container ${styles.movieSelected}`}>movie selected</div>
                <div className={`container ${styles.movieDated}`}>Tuesday, 07 July 2020</div>
                <div className={`container ${styles.moviePriced}`}>One ticket price</div>
                <div className={`container ${styles.movieSeated}`}>Seat choosed</div>
              </div>
              <hr />
              <div className={`${styles.movieTotalPayment}`}>Total Payment</div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Order;
