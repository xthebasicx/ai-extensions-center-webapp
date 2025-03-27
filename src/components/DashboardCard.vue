<template>
    <div class="rounded-lg text-center p-4">
        <div class="font-semibold text-2xl">{{ value }}</div>
        <div>{{ title }}</div>
    </div>
</template>

<script setup>
defineProps({
    value: Number,
    title: String,
})
</script>