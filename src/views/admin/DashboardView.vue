<template>
  <div class="space-y-8">
    <h1 class="text-2xl font-bold text-title mb-6">Dashboard</h1>

    <!-- Dashboard Section -->
    <Section title="Summary">
      <div class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <dashboard-card title="Extensions" :value=totalExtensions class="bg-gray-100"></dashboard-card>
        <dashboard-card title="Downloads" :value=totalDownloads class="bg-gray-100"></dashboard-card>
        <dashboard-card title="Viewer" :value=totalViewer class="bg-gray-100"></dashboard-card>
      </div>
    </Section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Section from '@/components/Section.vue';
import DashboardCard from '@/components/DashboardCard.vue';

const totalExtensions = ref(0)
const totalDownloads = ref(0)
const totalViewer = ref(0)
</script>
