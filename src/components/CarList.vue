<template>
    <div class="container">
        <h1 class="mt-5 mb-4">Car List</h1>
        <div class="table-responsive">
            <table class="table table-striped custom-table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Wheel Count</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="car in cars" :key="car.id">
                        <th scope="row">{{ car.id }}</th>
                        <td>{{ car.name }}</td>
                        <td>{{ car.wheelCount }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';

export default defineComponent({
    setup() {
        const store = useStore();
        const cars = computed(() => store.state.cars);

        onMounted(() => {
            store.dispatch('fetchCars');
        });

        return {
            cars
        };
    }
});
</script>

<style scoped>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td,
th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
</style>