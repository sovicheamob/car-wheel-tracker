<template>
  <div id="app">
    <CarInput />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CarInput from './components/CarInput.vue';

export default defineComponent({
  name: 'App',
  components: {
    CarInput
  }
});
</script>
