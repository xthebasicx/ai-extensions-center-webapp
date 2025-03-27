<template>
  <div class="flex justify-center items-center space-x-4 mt-4">
    <button @click="prevPage" :disabled="isPrevDisabled"
      class="p-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50">
      Previous
    </button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="isNextDisabled"
      class="p-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50">
      Next
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  prevPage: Function,
  nextPage: Function,
});

// Disable next and prev buttons when on first or last page
const isPrevDisabled = computed(() => props.currentPage === 1);
const isNextDisabled = computed(() => props.currentPage >= props.totalPages);
</script>