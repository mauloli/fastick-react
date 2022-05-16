import React from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./Card.module.css";
import MovieDetails from "../../page/MovieDetails";

function index(props) {
  const { name, category, id, image } = props.data;
  // console.log(props);
  const key = process.env.REACT_APP_CLOUDINARY_RES;
  const cloudinaryImg = key;

  return (
    <div>
      <div className={styles.cardContainer}>
        <Card className={`${styles.cardRow}`}>
          <Card.Body className={styles.cardBody}>
            <Card.Img src={`${cloudinaryImg}${image}`} className={styles.cardImg} />
            <div className={styles.cardHover}>
              <Card.Text className={`${styles.cardTextTittle}`}>{name}</Card.Text>
              <Card.Text className={`${styles.cardTextCat}`}>{category}</Card.Text>
              <div className={styles.buttonCard}>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  onClick={() => props.handleDetail(id)}
                >
                  Details
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default index;
