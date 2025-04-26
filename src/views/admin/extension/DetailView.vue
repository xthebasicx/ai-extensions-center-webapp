<template>
  <div class="space-y-8">

    <!-- Bottom header -->
    <div class="flex items-center justify-end mb-4">
      <el-button size="large" @click="showDocument = !showDocument" :icon="Document">
        Document
      </el-button>
      <el-button @click="downloadRubyFile" size="large" :icon="Download">
        Download Ruby File
      </el-button>
      <el-button size="large" :tag="'router-link'" :icon="Edit"
        :to="{ name: 'admin-extensions-update', params: { id: route.params.id } }">
        Edit Extension
      </el-button>
    </div>

    <!-- Document -->
    <ExtensionDocument v-if="showDocument" class="mt-6" :module-name="extension.moduleName" />

    <!-- Extension info -->
    <el-card style="border-radius: 15px; box-shadow: var(--el-box-shadow-lighter);">
      <template #header>
        <el-text size="large" tag="b" type="primary">Extension Information</el-text>
      </template>
      <div><el-text>Name: {{ extension.name }}</el-text></div>
      <div><el-text>Module Name: {{ extension.moduleName }}</el-text></div>
      <div><el-text>Description: {{ extension.description }}</el-text></div>
    </el-card>

    <!-- License summary -->
    <el-card style="border-radius: 15px; box-shadow: var(--el-box-shadow-lighter);">
      <template #header>
        <el-text size="large" tag="b" type="primary">License Summary</el-text>
      </template>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
        <el-card shadow="never" style="border-radius: 15px; background-color: var(--el-color-primary-light-8);">
          <div><el-text>{{ licenses.length }}</el-text></div>
          <div><el-text>Total Licenses</el-text></div>
        </el-card>
        <el-card shadow="never" style="border-radius: 15px; background-color: var(--el-color-info-light-8);">
          <div><el-text>{{ inactiveLicenses }}</el-text></div>
          <div><el-text>Inactive Licenses</el-text></div>
        </el-card>
        <el-card shadow="never" style="border-radius: 15px; background-color: var(--el-color-success-light-8);">
          <div><el-text>{{ activeLicenses }}</el-text></div>
          <div><el-text>Active Licenses</el-text></div>
        </el-card>
        <el-card shadow="never" style="border-radius: 15px; background-color: var(--el-color-warning-light-8);">
          <div><el-text>{{ expiredLicenses }}</el-text></div>
          <div><el-text>Expired Licenses</el-text></div>
        </el-card>
        <el-card shadow="never" style="border-radius: 15px; background-color: var(--el-color-danger-light-8);">
          <div><el-text>{{ revokedLicenses }}</el-text></div>
          <div><el-text>Revoked Licenses</el-text></div>
        </el-card>
      </div>
    </el-card>

    <!-- License Table -->
    <el-card>
      <div class="flex items-center justify-between mb-4">
        <el-text size="large" tag="b" type="primary">License List</el-text>
        <el-button @click="openModal()" size="large" :icon="Plus">
          Add License
        </el-button>
      </div>

      <el-table :data="licenses" style="width: 100%; max-height: 400px; overflow-y: auto; border-radius: 10px;"
        height="400" empty-text="No licenses available." border>
        <el-table-column prop="licenseKey" label="License Key" />

        <el-table-column label="Status">
          <template #default="scope">
            <span :class="statusClass(scope.row.licenseStatus)">
              {{ scope.row.licenseStatus }}
            </span>
          </template>
        </el-table-column>

        <el-table-column label="Expiration Date">
          <template #default="scope">
            {{ formatDate(scope.row.expirationDate) }}
          </template>
        </el-table-column>

        <el-table-column label="Activation Date">
          <template #default="scope">
            {{ formatActivationDate(scope.row.activationDate) }}
          </template>
        </el-table-column>

        <el-table-column label="Activated By">
          <template #default="scope">
            {{ scope.row.activatedByUserEmail || '-' }}
          </template>
        </el-table-column>

        <el-table-column label="Edit">
          <template #default="scope">
            <el-button v-if="scope.row.licenseStatus === 'Active' || scope.row.licenseStatus === 'InActive'"
              type="primary" link size="large" :icon="Edit" @click="openModal(scope.row)">
              Edit
            </el-button>
          </template>
        </el-table-column>

        <el-table-column label="Action">
          <template #default="scope">
            <el-button v-if="scope.row.licenseStatus === 'InActive'" type="warning" link size="large" :icon="Delete"
              @click="deleteLicense(scope.row.id)">
              Delete
            </el-button>
            <el-button v-if="scope.row.licenseStatus === 'Active'" type="danger" link size="large" :icon="Close"
              @click="revokeLicense(scope.row.id)">
              Revoke
            </el-button>
          </template>
        </el-table-column>

        <el-table-column label="Send Email">
          <template #default="scope">
            <el-button v-if="scope.row.licenseStatus === 'InActive'" type="success" link size="large" :icon="Message"
              @click="openSendEmailModal(scope.row)">
              Send Email
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- License Modal -->
    <el-dialog v-model="showModal" :title="isEditing ? 'Edit License' : 'Add License'" width="500px" center>
      <el-form @submit.prevent="updateLicense" label-position="top">
        <el-form-item label="Expiration Date" required>
          <el-date-picker v-model="license.expirationDate" type="date" placeholder="Select date" style="width: 100%" />
        </el-form-item>
        <el-form-item>
          <el-button @click="closeModal" type="default">Cancel</el-button>
          <el-button type="primary" @click="updateLicense">Save</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- Sende Email Modal -->
    <el-dialog v-model="showSendEmailModal" title="Send License Key to Email" width="500px" center>
      <el-form @submit.prevent="handleSendEmail" label-position="top">
        <el-form-item label="Email" required>
          <el-input v-model="email" placeholder="Enter email" type="email" />
        </el-form-item>
        <el-form-item label="License Key">
          <el-input v-model="licenseKey" readonly />
        </el-form-item>
        <el-form-item>
          <el-button @click="closeSendEmailModal" type="default">Cancel</el-button>
          <el-button type="primary" @click="handleSendEmail">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { ExtensionService } from '@/services/extensions';
import { LicenseService } from '@/services/licenses';
import { RubyService } from '@/services/ruby';
import { FileDownloader } from '@/services/utility/filedownloader';
import { Download, Document, Edit, Plus, Delete, Close, Message } from '@element-plus/icons-vue'
import ExtensionDocument from '@/components/ExtensionDocument.vue'

const route = useRoute();
const extensionId = ref(-1)
const extension = ref({});
const licenses = ref([]);
const email = ref('');
const licenseKey = ref('');
const showModal = ref(false);
const showSendEmailModal = ref(false);
const selectedLicense = ref(null);
const license = ref({
  id: '',
  licenseKey: '',
  activationDate: '',
  expirationDate: '',
  licenseStatus: '',
  extensionId: '',
  activatedByUserEmail: ''
});
const showDocument = ref(false);
const isEditing = ref(false);

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

const downloadRubyFile = async () => {
  try {
    const data = await RubyService.downloadRubyFile(extensionId.value, extension.value.moduleName);
    FileDownloader.downloadFile(data, 'AIExtensionsCenter.zip');
  } catch (error) {
    alert('Failed to download file.');
  }
};

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
  if (selectedLicense) {
    license.value = selectedLicense;
    isEditing.value = true;
  } else {
    license.value = {
      id: '',
      licenseKey: '',
      activationDate: '',
      expirationDate: '',
      licenseStatus: '',
      extensionId: extensionId.value,
      activatedByUserEmail: ''
    };
    isEditing.value = false;
  }
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

const openSendEmailModal = (license) => {
  selectedLicense.value = license;
  email.value = '';
  licenseKey.value = license.licenseKey;
  showSendEmailModal.value = true;
};
const closeSendEmailModal = () => {
  showSendEmailModal.value = false;
  selectedLicense.value = null;
};
const handleSendEmail = async () => {
  const emailData = {
    email: email.value,
    licenseKey: selectedLicense.value.licenseKey,
  };
  try {
    await LicenseService.sendLicenseEmail(emailData);
    alert('Email sent successfully!');
    closeSendEmailModal();
  } catch (error) {
    alert('Failed to send email.');
  }
};

</script>
