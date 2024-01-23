import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/NavBarStyles"; // Import the CSS file

const Navbar = () => {
  const navigate = useNavigate();

  const goToMainScreen = () => {
    navigate("/");
  };

  const goToCounter = () => {
    navigate("/Counter");
  };

  const goToDataScreen = () => {
    navigate("/DataScreen");
  };

  return (
    <nav style={styles.container}>
      <ul style={styles.subContainer}>
        <li style={styles.title} onClick={goToDataScreen}>
          Home
        </li>
        <li style={styles.title} onClick={goToCounter}>
          Counter
        </li>
        <li
          style={{ ...styles.title, ":hover": styles.titleHover }}
          onClick={goToMainScreen}
        >
          Logout
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
