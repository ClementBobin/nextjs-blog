// pages/index.js

import React, { useEffect, useState } from "react";
import CarList from "../components/CarList";
import CarForm from "../components/CarForm";
import CarPage from "../components/CarPage";

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("/api/cars")
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  const addCar = (newCar) => {
    fetch("/api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCar)
    })
      .then((response) => response.json())
      .then((data) => setCars([...cars, data]))
      .catch((error) => console.error("Error adding car:", error));
  };

  return (
    <div>
      <CarForm onAddCar={addCar} />
      <CarList cars={cars} />
      <CarPage />
    </div>
  );
};

export default Home;
