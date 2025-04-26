<template>
  <div class="flex flex-col h-full">
    <el-menu default-active="route.name" router>
      <el-menu-item index="1" :route="{ name: 'admin-document' }">
        <el-icon>
          <document />
        </el-icon>
        <span>Document</span>
      </el-menu-item>
      <el-menu-item index="2" :route="{ name: 'admin-dashboard' }">
        <el-icon><data-line /></el-icon>
        <span>Dashboard</span>
      </el-menu-item>
      <el-menu-item index="3" :route="{ name: 'admin-extensions' }">
        <el-icon><icon-menu /></el-icon>
        <span>Extensions</span>
      </el-menu-item>
    </el-menu>
    <div class="mt-auto p-4">
      <el-button type="danger" plain @click="handleLogout" class="w-full">
        Sign out
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { AuthService } from '@/services/auth';
import { Document, DataLine, Menu as IconMenu } from '@element-plus/icons-vue'

const router = useRouter();

function handleLogout() {
  AuthService.logout()
  router.push({ name: 'admin-login' })
}
</script>