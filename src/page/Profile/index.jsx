import React from "react";
import Navbar from "../../components/Navbar/index";
import styles from "./Profile.module.css";
import Footer from "../../components/Footer";
function Profile() {
  return (
    <div style={{ backgroundColor: "#D6D8E7" }}>
      <Navbar />
      <main className={`${styles.main} container`}>
        <div className={`${styles.test} d-flex`}>
          <div className={``}>
            <div className={``}>test</div>
          </div>
          <div className={``}>test2</div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
