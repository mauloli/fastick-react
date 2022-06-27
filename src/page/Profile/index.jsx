import React from "react";
import Navbar from "../../components/Navbar/index";
import styles from "./Profile.module.css";
import Footer from "../../components/Footer";
function Profile() {
  return (
    <div style={{ backgroundColor: "#F5F6F8", height: "100%" }}>
      <Navbar />
      <main className={`${styles.main} container`}>
        <div className={styles.firstColumns}>
          <div className={styles.imageContainer}>
            <section className={styles.sectionImg}>
              <div className={styles.sectionHeader}>
                <span style={{ color: "#4E4B66" }}>INFO</span>
              </div>
              <div className={styles.sectionBody}>
                <img className={styles.image} src={require("../../assets/lionking.jpg")} alt="" />
                <span className="mt-3 mb-3">Nama Nama</span>
                <span className="mt-3 mb-3" style={{ color: "#4E4B66", fontSize: "14px" }}>
                  Moviegoers
                </span>
              </div>
              <hr />
              <div className={`${styles.sectionFooter} mt-4`}>
                <button className=" btn btn-primary" style={{ width: "60%" }}>
                  Logout
                </button>
              </div>
            </section>
          </div>
        </div>
        <div className={styles.secondColumns}>
          <div className={styles.formContainer}>
            <div className={styles.formNavbar}>
              <span>Account Setting</span>
              <span>Order History</span>
            </div>
            <div className={`${styles.formDetail} container`}>
              <span className={styles.spanDetail}>Details Information</span>
              <hr />
              <div className=" d-flex">
                <span className={styles.spanDetail} style={{ flex: 1 }}>
                  First Name
                </span>
                <span className={styles.spanDetail} style={{ flex: 1 }}>
                  Last Name
                </span>
              </div>
              <div className=" d-flex">
                <input
                  className={styles.inputDetail}
                  type="text"
                  name=""
                  id=""
                  style={{ flex: 1 }}
                />
                <input className={styles.inputDetail} type="text" style={{ flex: 1 }} />
              </div>
              <div className=" d-flex">
                <span className={styles.spanDetail} style={{ flex: 1 }}>
                  Email
                </span>
                <span className={styles.spanDetail} style={{ flex: 1 }}>
                  Phone Number
                </span>
              </div>
              <div className=" d-flex">
                <input
                  className={styles.inputDetail}
                  type="text"
                  name=""
                  id=""
                  style={{ flex: 1 }}
                />
                <input className={styles.inputDetail} type="text" style={{ flex: 1 }} />
              </div>
            </div>
            <button className="btn btn-primary">Update Changes</button>
            <div className={styles.formPrivacy}>
              <span>Account And Privacy</span>
              <hr />
              <div>
                <span>New Password</span>
                <span>Confirm Password</span>
              </div>
            </div>
            <button className="btn btn-primary">Update Changes</button>
          </div>
        </div>
      </main>
      <div className=" pt-1" style={{ backgroundColor: "white" }}>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
