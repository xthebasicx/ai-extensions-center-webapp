<template>
    <router-link :to="{ name: 'admin-extensions-detail', params: { id: extension.id } }"
        class="bg-white shadow rounded block transition-transform transform hover:scale-103 hover:shadow-lg p-4">
        <div class="relative w-full h-36">
            <img :src="getImageUrl(extension.imageUrl)" alt="Image" class="object-contain rounded w-full h-full">
        </div>
        <h2 class="font-semibold mt-2">{{ extension.name }}</h2>
    </router-link>
</template>

<script setup>
defineProps({
    extension: Object,
});
const backendBaseUrl = "http://localhost:5000";

const getImageUrl = (imageUrl) => {
    return backendBaseUrl + "/uploads" + imageUrl;
};
</script>