import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div>
      <footer className="footer-moviedetails">
        <div className="container">
          <div className={styles.footerDetails}>
            <div className={styles.firstRow}>
              <div className={styles.firstRow_border}>
                <img src={require("../../assets/logo.png")} alt="" />
                <span>Stop waiting in line. Buy tickets conveniently, watch movies quietly.</span>
              </div>
            </div>
            <div className={styles.secondRow}>
              <div className={styles.secondRow_border}>
                <p>Explore</p>
                <div className={styles.secondRow_span}>
                  <span className={styles.spanHome}>Home</span>
                  <span>List Movie</span>
                </div>
              </div>
            </div>

            <div className={styles.thirdRow}>
              <div className={styles.thirdRow_border}>
                <p>Our Sponsor</p>
                <img src={require("../../assets/ebuid.png")} alt="" />
                <img src={require("../../assets/cineone.png")} alt="" />
                <img src={require("../../assets/hiflix.png")} alt="" />
              </div>
            </div>

            <div className={styles.fourthRow}>
              <div className={styles.fourthRow_border}>
                <p>Follow Us</p>
                <div className={styles.footerIcon}>
                  <div>
                    <i className="bi bi-facebook"></i>
                    <span> Fastick cinema.id</span>
                  </div>
                  <div>
                    <i className="bi bi-instagram"></i>
                    <span> Fastick.id</span>
                  </div>
                  <div>
                    <i className="bi bi-twitter"></i>
                    <span>Fastick.id</span>
                  </div>
                  <div>
                    <i className="bi bi-youtube"></i>
                    <span>Fastick.id</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.copyRight}>
            <span>© 2020 Tickitz. All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
