// pages/api/cars/index.js
import { cars } from "./carsData";
  
  export default function handler(req, res) {
    const { method } = req;
  
    switch (method) {
      case "GET":
        res.status(200).json(cars);
        break;
      case "POST":
        const newCar = req.body;
        cars.push(newCar);
        res.status(201).json(newCar);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }