<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
      <h2 class="text-2xl font-semibold text-center text-gray-700 mb-2">Forgot your password?</h2>
      <p class="text-center text-gray-600 mb-6">
        Enter your email address below and we will send you instructions to reset your password.
      </p>
      <form @submit.prevent="resetPassword">
        <div class="mb-4">
          <label class="block text-gray-600 mb-1">Email</label>
          <input type="email" v-model="email" class="w-full px-4 py-2 border rounded-lg border-gray-300"
            placeholder="Enter your email" required />
        </div>
        <button type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">
          Send Reset Link
        </button>
      </form>
      <p class="text-center text-gray-600 mt-4">
        Remembered your password?
        <router-link :to="{ name: 'admin-login' }" class="text-blue-500 hover:underline">Sign In</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const router = useRouter()

const resetPassword = () => {
  router.push({ name: 'admin-login' })
}
</script>