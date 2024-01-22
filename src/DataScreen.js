import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./DataScreen.css";
import NavBar from "./NavBar";

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

      <div className="container mt-5 intro-container">
        <h1 className="text-center mb-4">Todo Details</h1>
        <div className="card mx-auto" style={{ width: "18rem" }}>
          {todo ? (
            <div className="card-body">
              <h5 className="card-title">Title: {todo.title}</h5>
              <p className="card-text">ID: {todo.id}</p>
              <p className="card-text">User ID: {todo.userId}</p>
              <p className="card-text">
                Completed: {todo.completed ? "Yes" : "No"}
              </p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <div className="card-footer text-center">
            <Button variant="primary" onClick={handleGoToCounter}>
              Go to Counter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataScreen;
