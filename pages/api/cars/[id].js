// pages/api/cars/[id].js
import { cars } from "./carsData";

export default function handler(req, res) {
    const {
      query: { id },
      method,
    } = req;
  
    switch (method) {
      case "GET":
        const car = cars.find((car) => car.id === parseInt(id));
        if (car) {
          res.status(200).json(car);
        } else {
          res.status(404).json({ message: "Car not found" });
        }
        break;
      case "PUT":
        const carToUpdate = cars.find((car) => car.id === parseInt(id));
          if (carToUpdate) {
            const updatedCar = req.body;
            carToUpdate.brand = updatedCar.brand;
            carToUpdate.model = updatedCar.model;
            carToUpdate.color = updatedCar.color;
            carToUpdate.year = updatedCar.year;
            res.status(200).json(carToUpdate);
          } else {
            res.status(404).json({ message: "Car not found" });
          }
        break;
      case "DELETE":
        const index = cars.findIndex((car) => car.id === parseInt(id));
        if (index !== -1) {
          cars.splice(index, 1);
          res.status(200).json({ message: "Car deleted successfully" });
        } else {
          res.status(404).json({ message: "Car not found" });
        }
        break;
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
  