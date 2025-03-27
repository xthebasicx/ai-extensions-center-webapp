<template>
  <div class="space-y-8">
    <!-- Header Section-->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">{{ mode }} Extension</h1>
      <button v-if="mode === 'Edit'" type="button" @click="deleteExtension()"
        class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        Delete
      </button>
    </div>

    <!-- Extension Form -->
    <Section>
      <form @submit.prevent="updateExtension()">
        <div v-if="errorMessage" class="text-red-500 mb-4">
          {{ errorMessage }}
        </div>
        <div class="mb-4">
          <label for="imagefile" class="block mb-2">Upload Image</label>
          <input type="file" id="imagefile" name="imagefile" class="border rounded border-gray-300 w-full px-3 py-2"
            accept="image/*" @change="handleImageFile" />
        </div>
        <div class="mb-4">
          <label for="name" class="block mb-2">Extension Name</label>
          <input v-model="extension.name" type="text" id="name" class="border rounded border-gray-300 w-full px-3 py-2"
            placeholder="Extension name" required />
        </div>
        <div class="mb-4">
          <label for="description" class="block mb-2">Description</label>
          <textarea v-model="extension.description" id="description"
            class="border rounded border-gray-300 w-full px-3 py-2" placeholder="Extension description"></textarea>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="rounded bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4">
            {{ mode }}
          </button>
        </div>
      </form>
    </Section>

    <!-- Licenses Section -->
    <Section v-if="mode === 'Edit'">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">License List</h2>
        <button @click="openModal(license)"
          class="rounded bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4">
          Create License
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead class="bg-gray-50">
            <th v-for="header in tableHeaders" :key="header"
              class="text-left text-xs text-gray-500 font-medium uppercase tracking-wider px-6 py-3">
              {{ header }}
            </th>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="license in licenses" :key="license.id">
              <td class="whitespace-nowrap text-sm px-6 py-4">{{ license.licenseKey }}</td>
              <td class="whitespace-nowrap text-sm px-6 py-4" :class="statusClass(license.licenseStatus)">
                {{ license.licenseStatus }}</td>
              <td class="whitespace-nowrap text-sm px-6 py-4">{{ formatDate(license.expirationDate) }}</td>
              <td class="whitespace-nowrap text-sm px-6 py-4">{{ formatActivationDate(license.activationDate) }}</td>
              <td class="whitespace-nowrap text-sm px-6 py-4">{{ license.activatedByUserEmail || '-' }}</td>
              <td class="whitespace-nowrap text-sm px-6 py-4">
                <button v-if="license.licenseStatus === 'Active' || license.licenseStatus === 'InActive'"
                  @click="openModal(license)" class="text-blue-500 hover:text-blue-700 font-medium">
                  Edit
                </button>
              </td>
              <td class="whitespace-nowrap text-sm px-6 py-4">
                <button v-if="license.licenseStatus === 'InActive'" @click="deleteLicense(license.id)"
                  class="text-yellow-500 hover:text-yellow-700 font-medium">
                  Delete
                </button>
                <button v-if="license.licenseStatus === 'Active'" @click="revokeLicense(license.id)"
                  class="text-red-500 hover:text-red-700 font-medium">
                  Revoke
                </button>
              </td>
            </tr>
            <tr v-if="licenses.length === 0">
              <td :colspan=tableHeaders.length class="text-sm text-gray-500 text-center px-6 py-4 ">No licenses
                available.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>

    <!-- License Modal -->
    <div v-if="showModal" class="fixed inset-0 flex justify-center items-center">
      <Section title="" class="max-w-md w-full">
        <form @submit.prevent="updateLicense()">
          <div class="mb-4">
            <label for="expirationDate" class="block mb-2">Expiration Date</label>
            <input v-model="license.expirationDate" type="date" id="expirationDate"
              class="border rounded border-gray-300 w-full px-3 py-2" required />
          </div>
          <div class="flex justify-end">
            <button @click="closeModal()" type="button"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">
              Cancel
            </button>
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">save
            </button>
          </div>
        </form>
      </Section>
    </div>

  </div>
</template>

<script setup>
import Section from '@/components/Section.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ExtensionService } from '@/services/extensions';
import { LicenseService } from '@/services/licenses';

const route = useRoute();
const router = useRouter();
const extensionId = ref(-1);
const mode = computed(() => extensionId.value !== -1 ? 'Edit' : 'Create');
const showModal = ref(false);
const errorMessage = ref('')

const imageFile = ref(null);
const extension = ref({});
const licenses = ref([]);
const license = ref({
  id: '',
  licenseKey: '',
  activationDate: '',
  expirationDate: '',
  licenseStatus: '',
  extensionId: '',
  activatedByUserEmail: ''
});
const tableHeaders = ['License Key', 'Status', 'Expiration Date', 'Activation Date', 'Activated By', 'Edit', 'Action'];

onMounted(async () => {
  if (route.params.id) {
    extensionId.value = route.params.id;
    extension.value = await ExtensionService.fetchExtensionById(extensionId.value) || {};
    licenses.value = await LicenseService.fetchLicensesByExtensionId(extensionId.value) || [];
  }
});
//Extension logic
const updateExtension = async () => {
  try {
    const imageUrl = await uploadImage();
    extension.value.imageUrl = imageUrl || extension.value.imageUrl;

    if (extensionId.value !== -1) {
      await ExtensionService.updateExtension(extensionId.value, extension.value);
    } else {
      await ExtensionService.createExtension(extension.value);
    }
    router.push({ name: 'admin-extensions' })
  } catch (error) {
    errorMessage.value = 'Unable to create extension. Please try again.';
  }
}

const handleImageFile = (event) => {
  imageFile.value = event.target.files[0];
}

const uploadImage = async () => {
  if (!imageFile.value) return;
  const formData = new FormData();
  formData.append('file', imageFile.value);
  const ImageUrl = await ExtensionService.uploadImage(formData);
  return ImageUrl;
}

const deleteExtension = async () => {
  const isConfirmed = window.confirm('Are you sure you want to delete this extension?');
  if (!isConfirmed) return;
  await ExtensionService.deleteExtension(extensionId.value);
  router.push({ name: 'admin-extensions' });
};

//License logic
const updateLicense = async () => {
  if (license.value.id) {
    await LicenseService.updateLicense(license.value.id, license.value);
  } else {
    await LicenseService.createLicense({ expirationDate: license.value.expirationDate, extensionId: extensionId.value });
  }
  licenses.value = await LicenseService.fetchLicensesByExtensionId(extensionId.value);
  closeModal();
};

const deleteLicense = async (licenseId) => {
  await LicenseService.deleteLicense(licenseId);
  licenses.value = await LicenseService.fetchLicensesByExtensionId(extensionId.value);
};

const revokeLicense = async (licenseId) => {
  const isConfirmed = window.confirm('Are you sure you want to revoke this license?');
  if (!isConfirmed) return;
  await LicenseService.deactivateLicense(licenseId);
  licenses.value = await LicenseService.fetchLicensesByExtensionId(extensionId.value);
};

const openModal = (selectedLicense = null) => {
  license.value = selectedLicense;
  showModal.value = true;
};
const closeModal = () => {
  license.value = {
    id: '',
    licenseKey: '',
    activationDate: '',
    expirationDate: '',
    licenseStatus: '',
    extensionId: '',
    activatedByUserEmail: ''
  };
  showModal.value = false;
}

const formatDate = (date) => date ? new Date(date).toLocaleDateString() : '-';
const formatActivationDate = (date) => date && date !== '0001-01-01T00:00:00' ? formatDate(date) : '-';

const statusClass = (status) => ({
  'InActive': 'text-gray-500',
  'Active': 'text-green-500',
  'Expired': 'text-orange-500',
  'Revoked': 'text-red-500'
}[status] || 'text-gray-500');

</script>
