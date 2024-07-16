<template>
    <div>
        <div class="center-content">
            <div class="form-container">
                <h1 class="mt-5 mb-4">Search the cars</h1>
                <input class="input-field" v-model="carName" placeholder="Car name?" @keyup.enter="fetchCar" />
                <input v-if="showWheelCountInput" class="input-field mt-3" v-model="carWheelCount"
                    placeholder="Wheel count?" @keyup.enter="addNewCar" />
            </div>
        </div>
        <div v-if="car">
            <div class="container">
                <div class="table-form-container">
                    <h1 class="mt-5 mb-4">Car Found</h1>
                    <div class="table-responsive">
                        <table class="table table-striped custom-table">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Wheel Count</th>
                                </tr>
                            </thead>
                            <tbody v-if="Array.isArray(car)">
                                <tr v-for="(item, index) in car" :key="index">
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.wheelCount }}</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td>{{ car.id }}</td>
                                    <td>{{ car.name }}</td>
                                    <td>{{ car.wheelCount }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="message" class="message">{{ message }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const store = useStore();
        const carName = ref('');
        const car = ref(null);
        const carWheelCount = ref('');
        const showWheelCountInput = ref(false);
        const message = ref('');

        const fetchCar = async () => {
            if (carName.value.trim() === '') {
                message.value = 'Please enter a car name.';
                return;
            }
            if (carName.value.toLowerCase() === 'all') {
                await store.dispatch('fetchCars');
                car.value = store.state.cars;
                message.value = 'Displaying all cars.';
                return;
            }

            if (carName.value.endsWith('-wheel-car')) {
                const wheelCount = parseInt(carName.value.split('-')[0]);
                const cars = store.getters.carsByWheelCount(wheelCount);
                if (cars.length > 0) {
                    car.value = cars;
                    // message.value = `Displaying all ${wheelCount}-wheel cars: ${cars
                    //     .map((car) => car.name)
                    //     .join(', ')}`;
                    message.value = `Displaying all ${wheelCount}-wheel cars`;
                } else {
                    car.value = null;
                    message.value = `No ${wheelCount}-wheel cars found.`;
                }
                return;
            }

            if (carName.value === 'Bye') {
                message.value = 'Goodbye!';
                return;
            }

            const carResponse = await store.dispatch('fetchCar', carName.value);
            car.value = carResponse;
            if (!car.value) {
                message.value = `${carName.value} is not on my list. Please enter the number of wheels and press Enter.`;
                showWheelCountInput.value = true;
            } else {
                message.value = `${carName.value} has ${car.value.wheelCount} wheels.`;
                showWheelCountInput.value = false;
            }
        };

        const addNewCar = async () => {
            if (carWheelCount.value) {
                const newCar = {
                    name: carName.value,
                    wheelCount: parseInt(carWheelCount.value),
                };
                await store.dispatch('addCar', newCar);
                message.value = `Thanks. I updated the information for ${carName.value}.`;
                showWheelCountInput.value = false;
                carWheelCount.value = '';
                fetchCar();  // Refetch to update the list if necessary
            }
        };

        return {
            carName,
            car,
            carWheelCount,
            showWheelCountInput,
            fetchCar,
            addNewCar,
            message,
        };
    },
});
</script>
