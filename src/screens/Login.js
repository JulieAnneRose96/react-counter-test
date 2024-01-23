import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LoginStyles";
import { Container, FloatingLabel, Row, Col } from "react-bootstrap";

function Login() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmation: "",
  });

  const confirmationError = useRef(null);
  const passwordError = useRef(null);
  const emailError = useRef(null);
  const navigate = useNavigate();

  function isValidEmail(email) {
    // Define a regular expression pattern for email validation.
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  }

  const handlePasswordChange = (password) => {
    setFormData({ ...formData, password });
  };

  const handleEmailChange = (email) => {
    setFormData({ ...formData, email });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Hide error messages
    confirmationError.current.style.display = "none";
    passwordError.current.style.display = "none";
    emailError.current.style.display = "none";

    const { email, password, confirmation } = formData;

    if (password !== confirmation) {
      confirmationError.current.style.display = null;
    } else if (password.length < 8) {
      passwordError.current.style.display = null;
    } else if (!isValidEmail(email)) {
      emailError.current.style.display = null;
    } else {
      emailError.current.style.display = "none";
      navigate("/DataScreen");
    }

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div style={styles.formWrapper}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>New user register</h2>
        <Container fluid>
          <Row>
            <Col sm={6} style={styles.formGroupBottom}>
              <Form.Group>
                <FloatingLabel controlId="firstnamLabel" label="First name">
                  <Form.Control
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </FloatingLabel>
                <Form.Control.Feedback type="invalid" style={styles.errorText}>
                  Do not leave empty
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={6} style={styles.formGroupBottom}>
              <FloatingLabel controlId="lastnameLabel" label="Last name">
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Form.Group style={styles.formGroupBottom} controlId="formBasicEmail">
              <FloatingLabel controlId="emailLabel" label="Enter email">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    handleInputChange(e);
                    handleEmailChange(e.target.value);
                  }}
                  required
                  pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
                />
              </FloatingLabel>
              <p style={styles.errorText} ref={emailError}>
                Please enter valid email
              </p>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group style={styles.formGroupBottom} controlId="formBasicPassword">
              <FloatingLabel controlId="passwordLabel" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    handleInputChange(e);
                    handlePasswordChange(e.target.value);
                  }}
                  required
                  pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                />
              </FloatingLabel>
              <p style={styles.errorText} ref={passwordError}>
                Must be 8 characters long
              </p>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group style={styles.formGroupBottom} controlId="formBasicConfirmation">
              <FloatingLabel controlId="confirmationLabel" label="Confirmation">
                <Form.Control
                  type="password"
                  placeholder="Confirmation"
                  name="confirmation"
                  value={formData.confirmation}
                  onChange={handleInputChange}
                  required
                />
              </FloatingLabel>
              <p
                style={styles.errorText}
                ref={confirmationError}
              >
                Password and confirmation are not the same
              </p>
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit" style={styles.customBtn}>
            Register
          </Button>
        </Container>
      </Form>
    </div>
  );
}

export default Login;