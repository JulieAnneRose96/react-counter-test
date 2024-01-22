import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Counter.css";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

import { Container, Row, Col } from "react-bootstrap";

function Counter() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
  };

  const handleGoToIntroScreen = () => {
    navigate("/DataScreen");
  };

  return (
    <div>
      <NavBar />
      <Container className="form-wrapper-counter">
        <Form>
          <h1 className="text-center">Counter App</h1>
          <h2 className="text-center">Count: {count}</h2>
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={4}>
              <div className="d-flex flex-column align-items-center">
                <Button
                  onClick={increment}
                  className="mb-2 custom-btn-counter"
                  aria-label="Increment"
                >
                  Increment
                </Button>
                <Button
                  onClick={decrement}
                  className="custom-btn-counter"
                  aria-label="Decrement"
                >
                  Decrement
                </Button>
              </div>
            </Col>
          </Row>
          <div className="card-footer text-center">
            <Button variant="primary" onClick={handleGoToIntroScreen}>
              Back
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Counter;
