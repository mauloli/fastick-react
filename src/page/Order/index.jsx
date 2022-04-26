import React, { useState } from "react";
import Navbar from "../../components/Navbar/index";
import styles from "./Order.module.css";
import Seat from "../../components/Seat";
function Order() {
  const seatList = ["A", "B", "C", "D", "E", "F", "G"];
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [reservedSeat, setReservedSeat] = useState(["A1", "C2", "B11"]);

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

            <div className="select-seat__main container">
              <span style={{ fontWeight: "bold", margin: "10px" }}>Choose Your Seat</span>
              <div className={styles.seatContainer}>
                <div>
                  <span style={{ display: "flex", justifyContent: "center" }}>screen</span>
                  <hr style={{ paddingTop: "5px" }} />
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
          </div>
          <div className={styles.orderInfo}>test</div>
        </section>
      </div>
    </div>
  );
}

export default Order;
