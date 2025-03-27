<template>
  <aside class="md:w-64 w-40 bg-white border-r border-gray-300 shadow-md h-full">
    <nav class="p-6 flex flex-col h-full">
      <ul class="flex-grow space-y-2">
        <li>
          <router-link :to="{ name: 'admin-dashboard' }" class="block p-2 hover:bg-gray-100 rounded">
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'admin-extensions' }" class="block p-2 hover:bg-gray-100 rounded">
            Extensions
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'admin-document' }" class="block p-2 hover:bg-gray-100 rounded">
            Document
          </router-link>
        </li>
      </ul>
      <button @click="handleLogout" class="w-full p-2 mt-auto text-left text-red-600 hover:bg-gray-100 rounded">
        Sign out
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { AuthService } from '@/services/auth';

const router = useRouter();

function handleLogout() {
  AuthService.logout()
  router.push({ name: 'admin-login' })
}
</script>
