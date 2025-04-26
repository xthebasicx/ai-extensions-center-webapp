<template>
  <div class="common-layout h-screen overflow-hidden">
    <el-container class="h-full">
      <el-header class="flex items-center bg-blue-500 drop-shadow-lg">
        <h1 class="text-white text-xl font-bold">AI Extensions Center</h1>
      </el-header>

      <el-container class="h-[calc(100%-4rem)]">
        <el-aside width="200px">
          <Sidebar />
        </el-aside>
        <el-main class="overflow-auto bg-gray-100">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
</script>