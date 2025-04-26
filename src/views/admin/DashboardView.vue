<template>
  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="card in cards" :key="card.title"
        class="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-lg transition duration-300">
        <h2 class="text-lg font-semibold text-blue-400 mb-4">{{ card.title }}</h2>
        <div class="text-xl font-bold text-gray-800">
          <el-statistic :value="card.value" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ExtensionService } from "@/services/extensions";

const totalExtensions = ref(0)
const totalDownloads = ref(0)
const totalViewe = ref(0)
const extension = ref([])

const cards = ref([
  { title: 'Extensions', value: totalExtensions },
  { title: 'Downloads', value: totalDownloads },
  { title: 'Viewers', value: totalViewe },
])

onMounted(() => {
  fetchExtensions()
})

const fetchExtensions = async () => {
  try {
    extension.value = await ExtensionService.fetchExtensionByUserId()
    totalExtensions.value = extension.value.length
    totalDownloads.value = extension.value.reduce((sum, ext) => sum + (ext.downloadCount || 0), 0)
    totalViewe.value = extension.value.reduce((sum, ext) => sum + (ext.viewCount || 0), 0)
  } catch (error) {
    console.error('Failed to fetch extensions', error)
  }
}
</script>
