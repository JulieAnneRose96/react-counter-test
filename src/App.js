import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./screens/Login";
import DataScreen from "./screens/DataScreen";
import Counter from "./screens/Counter";

const App = () => {
  return (
    <div style={styles.app}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/DataScreen" element={<DataScreen />} />
          <Route path="/Counter" element={<Counter />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

const styles = {
  app: {
    padding: 50,
  },
};
