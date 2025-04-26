<template>
    <router-link :to="{ name: 'admin-extensions-detail', params: { id: extension.id } }"
        class="bg-white rounded shadow transition-transform transform hover:scale-103 hover:shadow-lg p-4">
        <div class="relative w-full h-36">
            <el-image :src="extension.imageUrl" alt="Image" class="object-contain rounded w-full h-full" fit="contain"
                lazy :preview-src-list="[extension.imageUrl]" />
        </div>
        <el-text>{{ extension.name }}</el-text>
    </router-link>
</template>

<script setup>
defineProps({
    extension: Object,
});
<<<<<<< Updated upstream
const BASE_URL = import.meta.env.VITE_API_URL;

const getImageUrl = (imageUrl) => {
    return BASE_URL + "/uploads" + imageUrl;
};
=======
>>>>>>> Stashed changes
</script>