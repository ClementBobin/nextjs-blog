import React, { useState } from "react";

const CarPage = () => {
  const [carId, setCarId] = useState("");
  const [carData, setCarData] = useState(null);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");

  const handleGetCar = async () => {
    try {
      const response = await fetch(`/api/cars/${carId}`);
      const data = await response.json();
      setCarData(data);
    } catch (error) {
      console.error("Error getting car:", error);
    }
  };

  const handleDeleteCar = async () => {
    try {
      const response = await fetch(`/api/cars/${carId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleAddOrUpdateCar = async () => {
    const newCar = { brand, model, color, year: parseInt(year) };
    try {
      const response = await fetch(`/api/cars/${carId}`, {
        method: carData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error adding/updating car:", error);
    }
  };

  return (
    <div>
      <h1>Car Page</h1>
      <input
        type="text"
        value={carId}
        onChange={(e) => setCarId(e.target.value)}
        placeholder="Enter Car ID"
      />
      <button onClick={handleGetCar}>Get Car</button>
      <button onClick={handleDeleteCar}>Delete Car</button>
      {carData && (
        <div>
          <h2>Car Details</h2>
          <p>Brand: {carData.brand}</p>
          <p>Model: {carData.model}</p>
          <p>Color: {carData.color}</p>
          <p>Year: {carData.year}</p>
        </div>
      )}
      <h2>Add/Update Car</h2>
      <input
        type="text"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Enter Brand"
      />
      <input
        type="text"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        placeholder="Enter Model"
      />
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="Enter Color"
      />
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Enter Year"
      />
      <button onClick={handleAddOrUpdateCar}>
        {carData ? "Update Car" : "Add Car"}
      </button>
    </div>
  );
};

export default CarPage;
