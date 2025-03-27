<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Extension List</h1>
      <router-link :to="{ name: 'admin-extensions-create' }"
        class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
        Add Extension
      </router-link>
    </div>

    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <extension-card v-for="extension in currentExtensions" :key="extension.id" :extension="extension" />
    </div>

    <!-- Pagination Component -->
    <Pagination :currentPage="currentPage" :totalPages="totalPages" :prevPage="prevPage" :nextPage="nextPage" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ExtensionCard from "@/components/ExtensionCard.vue";
import Pagination from "@/components/Pagination.vue";
import { ExtensionService } from "@/services/extensions";

const extensions = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const loading = ref(true);
const pageSize = ref(12);

const fetchExtensions = async () => {
  try {
    loading.value = true;
    const response = await ExtensionService.fetchExtensionByUserId(currentPage.value, pageSize.value);

    extensions.value = response.items || [];
    totalPages.value = response.totalPages || 1;
  } catch (error) {
    console.error("Error fetching extensions", error);
  } finally {
    loading.value = false;
  }
};

const nextPage = async () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    await fetchExtensions();
  }
};

const prevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    await fetchExtensions();
  }
};

const currentExtensions = computed(() => {
  return extensions.value;
});

onMounted(() => {
  fetchExtensions();
});
</script>
