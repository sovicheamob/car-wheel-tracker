import axios from 'axios';

export interface Car {
  id?: number;
  name: string;
  wheelCount: number;
}

export class CarService {
  private API_URL = 'http://localhost:8080/api/cars';

  async getCar(name: string): Promise<Car> {
    const response = await axios.get(`${this.API_URL}/${name}`, { withCredentials: true });
    return response.data.data;
  }

  async addCar(car: Car): Promise<Car> {
    const response = await axios.post(this.API_URL, car, { withCredentials: true });
    return response.data.data;
  }

  async getCarsByWheelCount(wheelCount: number): Promise<Car[]> {
    const response = await axios.get(`${this.API_URL}/wheelCount/${wheelCount}`, { withCredentials: true });
    return response.data.data;
  }

  async getAllCars(): Promise<Car[]> {
    const response = await axios.get(this.API_URL, { withCredentials: true });
    return response.data.data;
  }
}

export default new CarService();
