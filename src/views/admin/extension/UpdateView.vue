<template>
  <div class="space-y-8">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-4">
      <el-text size="large" tag="b" type="primary">{{ mode }} Extension</el-text>
      <el-button v-if="mode === 'Edit'" @click="deleteExtension" type="danger" :icon="DeleteFilled">
        Delete
      </el-button>
    </div>

    <!-- Extension Form -->
    <el-form class="bg-white p-8 rounded-lg shadow-md" :model="extension" label-position="top"
      @submit.prevent="updateExtension">
      <div v-if="errorMessage" class="text-red-500 mb-4">
        {{ errorMessage }}
      </div>

      <el-form-item label="Upload Image">
        <el-upload class="upload-demo" drag action="" :auto-upload="false" :on-change="handleImageFile" :limit="1">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              Only images are accepted
            </div>
          </template>
        </el-upload>
      </el-form-item>

      <el-form-item label="Extension Name" required>
        <el-input v-model="extension.name" placeholder="Extension name" />
      </el-form-item>

      <el-form-item label="Module Name" required>
        <el-input v-model="extension.moduleName" placeholder="Module name" />
      </el-form-item>

      <el-form-item label="Description">
        <el-input v-model="extension.description" type="textarea" placeholder="Extension description" />
      </el-form-item>

      <div class="flex justify-end">
        <el-button @click="updateExtension" :icon="Edit">
          {{ mode }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ExtensionService } from '@/services/extensions';
import { DeleteFilled, Edit } from '@element-plus/icons-vue'

const route = useRoute();
const router = useRouter();
const extensionId = ref(-1);
const mode = computed(() => extensionId.value !== -1 ? 'Edit' : 'Create');
const errorMessage = ref('');

const imageFile = ref(null);
const extension = ref({});

onMounted(async () => {
  if (route.params.id) {
    extensionId.value = route.params.id;
    extension.value = await ExtensionService.fetchExtensionById(extensionId.value) || {};
  }
});

const updateExtension = async () => {
  try {
    const imageUrl = await uploadImage();
    extension.value.imageUrl = imageUrl || extension.value.imageUrl;

    if (extensionId.value !== -1) {
      await ExtensionService.updateExtension(extensionId.value, extension.value);
    } else {
      await ExtensionService.createExtension(extension.value);
    }
    router.push({ name: 'admin-extensions' });
  } catch (error) {
    errorMessage.value = 'Unable to create extension. Please try again.';
  }
};

const handleImageFile = (file) => {
  imageFile.value = file.raw;
};

const uploadImage = async () => {
  if (!imageFile.value) return;
  const formData = new FormData();
  formData.append('file', imageFile.value);
  const ImageUrl = await ExtensionService.uploadImage(formData);
  return ImageUrl;
};

const deleteExtension = async () => {
  const isConfirmed = window.confirm('Are you sure you want to delete this extension?');
  if (!isConfirmed) return;
  await ExtensionService.deleteExtension(extensionId.value);
  router.push({ name: 'admin-extensions' });
};
</script>
