import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import styles from "../styles/DataScreenStyles";

function DataScreen() {
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos/1"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const todoData = await response.json();
        setTodo(todoData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const handleGoToCounter = () => {
    navigate("/Counter");
  };

  return (
    <div>
      <NavBar />

      <div style={styles.container}>
        <h1 style={styles.heading}>Todo Details</h1>
        <div style={styles.card}>
          {todo ? (
            <div>
              <h4 style={styles.textCenter}>Title: {todo.title}</h4>
               <p>ID: {todo.id}</p> 
              <p>User ID: {todo.userId}</p>
              <p>Completed: {todo.completed ? "Yes" : "No"}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <div style={styles.buttonContainer}>
            <Button variant="primary" style={styles.customBtn} onClick={handleGoToCounter}>
              Go to Counter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataScreen;
