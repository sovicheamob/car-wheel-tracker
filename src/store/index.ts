import { createStore } from 'vuex';
import CarService, { type Car } from '../services/CarService';

export default createStore({
  state: {
    cars: [] as Car[],
  },
  mutations: {
    SET_CARS(state, cars: Car[]) {
      state.cars = cars;
    },
    ADD_CAR(state, car: Car) {
      state.cars.push(car);
    }
  },
  actions: {
    async fetchCars({ commit }) {
      const cars = await CarService.getAllCars();
      commit('SET_CARS', cars);
    },
    async fetchCar({ commit }, name: string) {
      try {
        const car = await CarService.getCar(name);
        return car;
      } catch (error) {
        return null;
      }
    },
    async addCar({ commit }, car: Car) {
      const newCar = await CarService.addCar(car);
      commit('ADD_CAR', newCar);
    }
  },
  getters: {
    carsByWheelCount: (state) => (wheelCount: number) => {
      return state.cars.filter(car => car.wheelCount === wheelCount);
    }
  },
  modules: {
  }
});
