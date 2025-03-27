<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Extension Dashboard</h1>
      <div class="flex space-x-4">
        <button @click="downloadRubyFile"
          class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
          Download Ruby File
        </button>
        <router-link :to="{ name: 'admin-extensions-update', params: { id: route.params.id } }"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Edit Extension
        </router-link>
      </div>
    </div>
    <!-- Extension Information Section -->
    <Section title="Extension Information">
      <div>Name : {{ extension.name }}</div>
      <div>Description : {{ extension.description }}</div>
    </Section>
    <!-- License Summary Section -->
    <Section title="License Summary">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <dashboard-card title="Total Licenses" :value=licenses.length class="bg-blue-100"></dashboard-card>
        <dashboard-card title="Inactive Licenses" :value=inactiveLicenses class="bg-gray-100"></dashboard-card>
        <dashboard-card title="Active Licenses" :value=activeLicenses class="bg-green-100"></dashboard-card>
        <dashboard-card title="Expired Licenses" :value=expiredLicenses class="bg-orange-100"></dashboard-card>
        <dashboard-card title="Revoke Licenses" :value=revokedLicenses class="bg-red-100"></dashboard-card>
      </div>
    </Section>
    <!-- Sende Email Section -->
    <Section title="Send licensekey to email">
      <form @submit.prevent="handleSendEmail">
        <div class="mb-4">
          <label for="" class="block mb-2">Email</label>
          <input v-model="email" type="email" id="" class="border rounded border-gray-300 w-full px-3 py-2"
            placeholder="Email" required />
        </div>
        <div class="mb-4">
          <label for="" class="block mb-2">License Key</label>
          <input v-model="licenseKey" type="text" id="" class="border rounded border-gray-300 w-full px-3 py-2"
            placeholder="License Key" required />
        </div>
        <div class="flex justify-end">
          <button type="submit" class="rounded bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4">
            Submit
          </button>
        </div>
      </form>
    </Section>
    <!-- License Table Section -->
    <Section title="License List">
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
              <td class="whitespace-nowrap text-sm px-6 py-4" :class="statusClass(license.licenseStatus)">{{
                license.licenseStatus }}</td>
              <td class="whitespace-nowrap text-sm px-6 py-4">{{ formatDate(license.expirationDate) }}</td>
              <td class="whitespace-nowrap text-sm px-6 py-4">{{ formatActivationDate(license.activationDate) }}</td>
              <td class="whitespace-nowrap text-sm px-6 py-4">{{ license.activatedByUserEmail || '-' }}</td>
            </tr>
            <tr v-if="licenses.length === 0">
              <td :colspan=tableHeaders.length class="px-6 py-4 text-sm text-gray-500 text-center">No licenses
                available.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  </div>
</template>

<script setup>
import Section from '@/components/Section.vue';
import DashboardCard from '@/components/DashboardCard.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { ExtensionService } from '@/services/extensions';
import { LicenseService } from '@/services/licenses';
import { RubyService } from '@/services/ruby';
import { FileDownloader } from '@/services/utility/filedownloader';

const route = useRoute();
const extensionId = ref(-1)
const extension = ref({});
const licenses = ref([]);
const email = ref('');
const licenseKey = ref('');

const tableHeaders = ['License Key', 'Status', 'Expiration Date', 'Activation Date', 'Activated By'];

onMounted(async () => {
  extensionId.value = route.params.id;
  extension.value = await ExtensionService.fetchExtensionById(extensionId.value) || {};
  licenses.value = await LicenseService.fetchLicensesByExtensionId(extensionId.value) || [];
});

const countLicensesByStatus = (status) => computed(() => licenses.value.filter(license => license.licenseStatus === status).length);

const inactiveLicenses = countLicensesByStatus('InActive');
const activeLicenses = countLicensesByStatus('Active');
const expiredLicenses = countLicensesByStatus('Expired');
const revokedLicenses = countLicensesByStatus('Revoked');

const formatDate = (date) => date ? new Date(date).toLocaleDateString() : '-';
const formatActivationDate = (date) => date && date !== '0001-01-01T00:00:00' ? formatDate(date) : '-';

const statusClass = (status) => ({
  'InActive': 'text-gray-500',
  'Active': 'text-green-500',
  'Expired': 'text-orange-500',
  'Revoked': 'text-red-500'
}[status] || 'text-gray-500');

const handleSendEmail = async () => {
  const emailData = {
    email: email.value,
    licenseKey: licenseKey.value
  };
  try {
    await LicenseService.sendLicenseEmail(emailData);
    alert('Email sent successfully!');
  } catch (error) {
    alert('Failed to send email.');
  }
};

const downloadRubyFile = async () => {
  try {
    const data = await RubyService.downloadRubyFile(extensionId.value);
    FileDownloader.downloadFile(data, 'AiExtensionsCenter.rb');
  } catch (error) {
    alert('Failed to download file.');
  }
};
</script>
