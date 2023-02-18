<template>
  <n-layout style="height: 540px" has-sider>
    <n-layout style="padding-left: 8px" :inverted="inverted">
      <n-page-header>
        <template #title> Employee Details Management </template>
        <template #header>
          <n-breadcrumb>
            <n-breadcrumb-item>Podcast</n-breadcrumb-item>
            <n-breadcrumb-item>Best Collection</n-breadcrumb-item>
            <n-breadcrumb-item>Ultimate Best Collection</n-breadcrumb-item>
            <n-breadcrumb-item>Anyway.FM</n-breadcrumb-item>
          </n-breadcrumb>
        </template>
        <template #extra>
          <n-space>
            <n-button @click="addNewEmployee">
              <template #icon
                ><n-icon><add-icon /></n-icon></template
              >Add New Employee</n-button
            >
            <n-dropdown :options="options" placement="bottom-start">
              <n-button :bordered="false" style="padding: 0 4px">
                ···
              </n-button>
            </n-dropdown>
          </n-space>
        </template>

        <n-divider />
      </n-page-header>
      <n-space vertical>
        <n-data-table
          :loading="isLoading"
          :columns="columns"
          :data="employees"
          :bordered="false"
        />
      </n-space>
    </n-layout>
    <edit-employee-modal
      :employee="selectedEmployee"
      :is-showing="isShowingEditEmployeeModal"
      @close="isShowingEditEmployeeModal = $event"
      @save="fetchEmployee"
    />
  </n-layout>
</template>

<script setup>
import { h, onMounted, ref } from "vue";
import {
  PencilSharp as PencilIcon,
  Add as AddIcon,
  TrashBin as TrashBinIcon,
  Eye as EyeIcon,
} from "@vicons/ionicons5";
import Http from "@/services/Http";
import { NButton } from "naive-ui";
import EditEmployeeModal from "@/components/employee/EditEmployeeModal.vue";

const isShowingEditEmployeeModal = ref(false);
const selectedEmployee = ref(false);
const inverted = ref(false);
const isLoading = ref(false);
const options = [
  {
    label: "Sort By Recently Added",
    key: "1",
  },
  {
    label: "Sort By Oldest Added",
    key: "2",
  },
];
const employees = ref([]);
const columns = [
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Address",
    key: "address",
  },
  {
    title: "Contact Number",
    key: "contact_number",
  },
  {
    title: "Role",
    key: "role",
  },
  {
    title: "DOB",
    key: "date_of_birth",
  },
  {
    title: "",
    key: "actions",
    render(row) {
      return h(
        NButton,
        {
          round: true,
          type: "info",
          strong: true,
          secondary: true,
          size: "small",
          onClick: () => {
            selectedEmployee.value = row;
            isShowingEditEmployeeModal.value = true;
          },
        },
        { default: () => "View" }
      );
    },
  },
  {
    title: "",
    key: "actions",
    render(row) {
      return h(
        NButton,
        {
          round: true,
          type: "info",
          strong: true,
          secondary: true,
          size: "small",
          onClick: async () => {
            await deleteEmployee(row);
            await fetchEmployee();
          },
        },
        { default: () => "Delete" }
      );
    },
  },
];

onMounted(() => {
  fetchEmployee();
});

function addNewEmployee() {
  selectedEmployee.value = {
    id: "",
    name: "",
    address: "",
    contact_number: "",
    role: "",
    date_of_birth: "2000-12-01",
  };

  isShowingEditEmployeeModal.value = true;
}

async function fetchEmployee() {
  isLoading.value = true;
  const { data } = await Http.get("employee");
  isLoading.value = false;
  employees.value = data.data;
}

async function deleteEmployee(employee) {
  isLoading.value = true;
  await Http.delete(`employee/${employee.id}`);
  isLoading.value = false;
}
</script>
