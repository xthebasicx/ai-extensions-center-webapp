<template>
  <div>
    <div class="flex items-center justify-end mb-4">
      <el-button size="large" :tag="'router-link'" :to="{ name: 'admin-extensions-create' }" :icon="Plus">
        Add Extension
      </el-button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <extension-card v-for="extension in extensions" :extension="extension" />
    </div>
    <el-pagination v-model:current-page="currentPage" :page-size="pageSize" :total="totalItems"
      layout="prev, pager, next" @current-change="handlePageChange" background class="mt-4 flex justify-center" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ExtensionCard from "@/components/ExtensionCard.vue";
import { ExtensionService } from "@/services/extensions";
import { Plus } from '@element-plus/icons-vue'

const extensions = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = ref(12);
const totalItems = ref(0);

onMounted(() => {
  fetchExtensions();
});

const fetchExtensions = async () => {
  try {
    const response = await ExtensionService.fetchExtensionWithPaginationByUserId(currentPage.value, pageSize.value);
    extensions.value = response.items || [];
    totalPages.value = response.totalPages || 1;
    totalItems.value = response.totalCount || 0;
  } catch (error) {
    console.error("Error fetching extensions", error);
  }
};

const handlePageChange = async (page) => {
  currentPage.value = page;
  await fetchExtensions();
};

</script>
