import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./Payment.module.css";
import { useLocation } from "react-router-dom";
import axios from "../../utils/axios";
function Payment() {
  const [selectPayment, setSelectPayment] = useState("");
  const { state } = useLocation();
  console.log(state);
  const { dataOrder } = state;
  const { seatDetails } = state;
  const { dataMovie } = state;
  const userId = JSON.parse(localStorage.getItem("dataUser")).id;
  const setData = {
    userId: userId,
    scheduleId: dataOrder.scheduleId,
    dateBooking: dataOrder.dateBooking,
    timeBooking: dataOrder.timeBooking,
    totalPayment: dataOrder.price * seatDetails.length,
    totalTicket: seatDetails.length,
    seat: seatDetails,
    paymentMethod: selectPayment
  };

  console.log(setData);
  // console.log(selectPayment);
  useEffect(() => {});
  const paymentClick = async () => {
    try {
      const result = await axios.post("/booking", setData);
      console.log(result.data.data.redirectUrl.length);
      console.log(result.data.data.redirectUrl);
      const redirectUrl = result.data.data.redirectUrl;
      window.open(`${redirectUrl}`, "_blank");
    } catch (error) {
      console.log(error.response);
    }
  };
  const paymentSelect = (data) => {
    setSelectPayment(data);
  };

  return (
    <div>
      <Navbar />
      <section className={styles.section}>
        <div className={`container ${styles.mainPage}`}>
          <div className={styles.movieSeat}>
            <div className={`mb-5 ${styles.movieSelect_main}`}>
              <span style={{ fontWeight: "bold", margin: "10px" }}>Payment Info</span>
              <div className={styles.movieSelect}>
                <div className={styles.paymentDate}>
                  <span>{`Date & Time`}</span>
                  <span
                    style={{ fontWeight: "400", color: "black", fontSize: "16px" }}
                  >{`${dataOrder.dateBooking} at ${dataOrder.timeBooking}`}</span>
                </div>
                <hr />
                <div className={styles.paymentMovie}>
                  <span>Movie title</span>
                  <span style={{ fontWeight: "400", color: "black", fontSize: "16px" }}>
                    {dataMovie.name}
                  </span>
                </div>
                <hr />
                <div className={styles.paymentCinema}>
                  <span>Cinema name</span>
                  <span style={{ fontWeight: "400", color: "black", fontSize: "16px" }}>
                    {dataOrder.premier}
                  </span>
                </div>
                <hr />
                <div className={styles.paymentTicket}>
                  <span>Number of tickets</span>
                  <span style={{ fontWeight: "400", color: "black", fontSize: "16px" }}>
                    {seatDetails.length}
                  </span>
                </div>
                <hr />
                <div className={styles.paymentTotal}>
                  <span>Total payment</span>
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    {dataOrder.price * seatDetails.length}
                  </span>
                </div>
              </div>
            </div>
            <div className="select-seat__main">
              <span style={{ fontWeight: "bold", margin: "10px" }}>Choose Your Payment Method</span>
              <div className={styles.seatSelect}>
                <div>
                  <div className="container" style={{ padding: "10px 50px" }}>
                    <div className="row mt-5" style={{ justifyContent: "center" }}>
                      <div className={`col-2 ${styles.paymentMethod}`}>
                        <img
                          src={require("../../assets/logos_google-pay.png")}
                          alt=""
                          onClick={() => paymentSelect("Google Pay")}
                        />
                      </div>
                      <div className={`col-2 ${styles.paymentMethod}`}>
                        <img
                          src={require("../../assets/logos_visa.png")}
                          alt=""
                          onClick={() => paymentSelect("Visa")}
                        />
                      </div>
                      <div className={`col-2 ${styles.paymentMethod}`}>
                        <img
                          src={require("../../assets/Logo GoPay (SVG-240p) - FileVector69 1.png")}
                          alt=""
                          onClick={() => paymentSelect("Go Pay")}
                        />
                      </div>
                      <div className={`col-2 ${styles.paymentMethod}`}>
                        <img
                          src={require("../../assets/logos_paypal.png")}
                          alt=""
                          onClick={() => paymentSelect("Paypal")}
                        />
                      </div>
                      <div className={`col-2 ${styles.paymentMethod}`}>
                        <img
                          src={require("../../assets/Logo DANA (PNG-240p) - FileVector69 1.png")}
                          alt=""
                          onClick={() => paymentSelect("Dana")}
                        />
                      </div>
                      <div className={`col-2 ${styles.paymentMethod} ${styles.imgHide}`}>
                        <img
                          src={require("../../assets/Bank BCA Logo (SVG-240p) - FileVector69 1.png")}
                          alt=""
                          onClick={() => paymentSelect("Bank BCA")}
                        />
                      </div>
                      <div className={`col-2 ${styles.paymentMethod} ${styles.imgHide}`}>
                        <img
                          src={require("../../assets/Bank BRI (Bank Rakyat Indonesia) Logo (SVG-240p) - FileVector69 1.png")}
                          alt=""
                          onClick={() => paymentSelect("Bank BRI")}
                        />
                      </div>
                      <div className={`col-2 ${styles.paymentMethod}`}>
                        <img
                          src={require("../../assets/ovo.png")}
                          alt=""
                          onClick={() => paymentSelect("OVO")}
                        />
                      </div>
                    </div>
                    <hr />
                    <div
                      className={styles.payVia}
                      style={{ display: "flex", justifyContent: "center", marginTop: "35px" }}
                    >
                      Pay via Cash.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`mt-5 ${styles.orderInfo}`}>
            <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Order Info</span>
            <div className={styles.orderInfo_details}>
              <div className="mt-3" style={{ textAlign: "center" }}>
                <img
                  src="./assets/cineone.png"
                  alt=""
                  style={{ width: "120px", objectFit: "cover" }}
                />
                <span style={{ display: "block", fontSize: "20px" }}>CineOne 21 Cinema</span>
              </div>
              <div className={`mt-3 ${styles.orderInfo_text}`}>
                <div className="container movie-selected">movie selected</div>
                <div className="container movie-dated">Tuesday, 07 July 2020</div>
                <div className="container movie-priced">One ticket price</div>
                <div className="container movie-seated">Seat choosed</div>
              </div>
              <hr />
              <div className={`container ${styles.movieTotal_payment}`}>Total Payment</div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className={styles.containerButton}>
            <div className={styles.buttonHide}>
              <button
                style={{
                  backgroundColor: "rgba(239, 240, 246, 1)",
                  color: "rgba(95, 46, 234, 1)",
                  borderColor: "rgba(95, 46, 234, 1)"
                }}
                className="btn btn-sm btn-outline-secondary"
                id="button__nav"
                type="button"
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
                onClick={paymentClick}
              >
                {/* <a href="" target="_blank"> */}
                Checkout Now
                {/* </a> */}
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Payment;
