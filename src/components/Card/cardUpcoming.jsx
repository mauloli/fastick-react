import React from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./Card.module.css";

function index(props) {
  const { name, category, id, image } = props.data;

  return (
    <div>
      <div className={styles.cardContainer}>
        <Card className={`${styles.cardRow}`}>
          <Card.Body className={styles.cardBody}>
            <Card.Img
              src={`https://res.cloudinary.com/dfoi1ro2a/image/upload/v1649233762/${image}`}
              className={styles.cardImg}
            />
            <div className={styles.cardUpcoming}>
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
