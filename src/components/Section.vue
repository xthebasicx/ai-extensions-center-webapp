<template>
    <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
        <slot />
    </div>
</template>

<script setup>
defineProps({
    title: String,
})
</script>