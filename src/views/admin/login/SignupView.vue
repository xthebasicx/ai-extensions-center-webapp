<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
      <h2 class="text-2xl font-semibold text-center text-gray-700 mb-2">Create a new account</h2>
      <form @submit.prevent="handleRegister">
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
        <div class="mb-4">
          <label class="block text-gray-600 mb-1">Confirm Password</label>
          <input type="password" v-model="confirmPassword" class="w-full px-4 py-2 border rounded-lg border-gray-300"
            placeholder="Confirm your password" required />
        </div>
        <button type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">
          Sign up
        </button>
        <p v-if="errorMessage" class="text-red-500 text-center mt-2">{{ errorMessage }}</p>
      </form>
      <p class="text-center text-gray-600 mt-4">
        Already have an account?
        <router-link :to="{ name: 'admin-login' }" class="text-blue-500 hover:underline">Sign In</router-link>
      </p>
    </div>

    <el-dialog v-model="showModal" title="Registration Successful" width="400px" center>
      <el-text>Please check your email to verify your account.</el-text>
      <template #footer>
        <el-button type="primary" @click="redirectToLogin">Go to Login</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserService } from '@/services/users'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const showModal = ref(false)
const router = useRouter()

const handleRegister = async () => {
  errorMessage.value = ''
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match!'
    return
  }
  try {
    const user = { email: email.value, password: password.value }
    await UserService.register(user)
    showModal.value = true
  } catch (error) {
    errorMessage.value = 'Registration failed.'
  }
}

const redirectToLogin = () => {
  showModal.value = false
  router.push({ name: 'admin-login' })
}
</script>