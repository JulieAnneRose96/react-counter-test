import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavBar from "./NavBar";
import styles from "../styles/CounterStyles";

import { Container, Row, Col } from "react-bootstrap";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
  };

  return (
    <div>
      <NavBar />
      <Container style={styles.formWrapper}>
        <Form>
          <h1 style={styles.textCenter}>Counter App</h1>
          <h2 style={styles.textCenter}>Count: {count}</h2>
          <Row style={styles.justifyContentCenter}>
            <Col xs={12} md={6} lg={4}>
              <div style={styles.flexColumnAlignCenter}>
                <Button
                  onClick={increment}
                  style={styles.customBtn}
                  aria-label="Increment"
                >
                  Increment
                </Button>
                <Button
                  onClick={decrement}
                  style={styles.customBtn}
                  aria-label="Decrement"
                >
                  Decrement
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default Counter;
