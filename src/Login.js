import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./Login.css";
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
  const [passwordStrength, setPasswordStrength] = useState(0);

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

    // Update the password strength
    const strength = Math.min(password.length, 8) * 12.5; // Adjust based on your preference
    setPasswordStrength(strength);
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
    <div className="form-wrapper">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: "15px", textAlign: "center" }}>
          New user register
        </h2>
        <Container fluid>
          <Row>
            <Col sm={6} style={{ marginBottom: "10px" }}>
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
                <Form.Control.Feedback type="invalid">
                  Do not leave empty
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={6} style={{ marginBottom: "10px" }}>
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
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
              <p style={{ color: "red", display: "none" }} ref={emailError}>
                Please enter valid email
              </p>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3" controlId="formBasicPassword">
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
              <p style={{ color: "red", display: "none" }} ref={passwordError}>
                Must be 8 characters long
              </p>
              {/* Password strength meter */}
              <div
                className="password-strength-meter"
                style={{ width: `${passwordStrength}%` }}
              ></div>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3" controlId="formBasicConfirmation">
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
                style={{ color: "red", display: "none" }}
                ref={confirmationError}
              >
                Password and confirmation are not the same
              </p>
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Container>
      </Form>
    </div>
  );
}

export default Login;
