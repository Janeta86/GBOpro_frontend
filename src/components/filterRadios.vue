<script setup>
import {defineEmits } from 'vue';

const emit = defineEmits(['filter']);

const filter = (e) => {
  emit('filter', e.target.value);
}
</script>

<template>
  <div class="flex items-center space-x-4">
    <label class="flex items-center">
      <input type="radio" name="show" value="all" checked @change="filter" class="text-orange-500 focus:ring-orange-400 accent-orange">
      <span class="ml-2 text-sm text-gray-700">Все</span>
    </label>
    <label class="flex items-center">
      <input type="radio" name="show" value="today" @change="filter" class="text-orange-500 focus:ring-orange-400 accent-orange">
      <span class="ml-2 text-sm text-gray-700">Сегодня</span>
    </label>
    <label class="flex items-center">
      <input type="radio" name="show" value="past" @change="filter" class="text-orange-500 focus:ring-orange-400 accent-orange">
      <span class="ml-2 text-sm text-gray-700">Прошлые</span>
    </label>
  </div>
</template>
<style scoped>

</style>