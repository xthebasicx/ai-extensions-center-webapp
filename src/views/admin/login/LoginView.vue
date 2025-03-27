<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
      <h2 class="text-2xl font-semibold text-center text-gray-700 mb-2">Sign in to your account</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-600 mb-1">Email</label>
          <input type="email" v-model="email" class="w-full px-4 py-2 border rounded-lg border-gray-300"
            placeholder="Enter your email" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-600 mb-1">Password</label>
          <input type="password" v-model="password" class="w-full px-4 py-2 border rounded-lg border-gray-300"
            placeholder="Enter your password" required />
        </div>
        <!-- <div class="flex justify-end items-center mb-4">
          <router-link :to="{ name: 'admin-forgotpassword' }" class="text-blue-500 text-sm hover:underline">
            Forgot password?
          </router-link>
        </div> -->
        <button type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">
          Sign in
        </button>
        <p v-if="errorMessage" class="text-red-500 text-center mt-2">{{ errorMessage }}</p>
      </form>
      <p class="text-center text-gray-600 mt-4">
        Don't have an account?
        <router-link :to="{ name: 'admin-signup' }" class="text-blue-500 hover:underline">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthService } from '@/services/auth'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)
const router = useRouter()

const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true
  try {
    const user = { email: email.value, password: password.value }
    await AuthService.login(user)
    const redirectTo = router.currentRoute.value.query.redirect || { name: 'admin-dashboard' };
    router.push(redirectTo)
  } catch (error) {
    errorMessage.value = 'Login failed. Please check your credentials.'
  } finally {
    loading.value = false
  }
}
</script>
