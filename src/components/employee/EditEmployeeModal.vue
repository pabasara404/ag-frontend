<template>
  <n-modal
    v-model:show="isShowing"
    :on-update:show="(value) => emit('close', value)"
  >
    <n-card
      style="width: 600px"
      title="Modal"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra> Edit Employee </template>
      <n-layout style="padding-left: 8px">
        <n-page-header
          ><n-icon size="50"><arrow-back-outline-icon /></n-icon
          ><n-h2 v-if="!isNewEmployee">Edit Employee</n-h2>
          <n-h2 v-else>Add New Employee</n-h2>
        </n-page-header>
        <n-form ref="formRef" :model="formValue">
          <n-form-item label="First Name" path="user.firstName">
            <n-input v-model:value="formValue.name" placeholder="Enter Name" />
          </n-form-item>
          <!--          <n-form-item label="Birthday">-->
          <!--            <n-date-picker-->
          <!--              v-model:value="formValue.date_of_birth"-->
          <!--            />-->
          <!--          </n-form-item>-->
          <n-form-item label="Phone" path="phone">
            <n-input
              v-model:value="formValue.contact_number"
              placeholder="Phone Number"
            />
          </n-form-item>
          <n-form-item label="Role" path="role">
            <n-dropdown
              trigger="hover"
              placement="bottom-start"
              :options="options"
              @select="handleSelect"
            >
              <n-button>Role</n-button>
            </n-dropdown>
          </n-form-item>
          <n-form-item label="Address">
            <n-input
              type="textarea"
              v-model:value="formValue.address"
              maxlength="100"
              show-count
            />
          </n-form-item>
          <n-form-item>
            <n-date-picker type="date" />
          </n-form-item>
          <n-form-item>
            <n-upload
              action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
              :headers="{
                'naive-info': 'hello!',
              }"
              :data="{
                'naive-data': 'cool! naive!',
              }"
            >
              <n-button>Upload Profile Picture</n-button>
            </n-upload>
          </n-form-item>
          <n-form-item>
            <n-button @click="save">
              {{ isNewEmployee ? "Add Employee" : "Update Employee" }}
            </n-button>
          </n-form-item>
        </n-form>
      </n-layout>
      <template #footer> Footer </template>
    </n-card>
  </n-modal>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useMessage } from "naive-ui";
import { ArrowBackOutline as ArrowBackOutlineIcon } from "@vicons/ionicons5";
import Http from "@/services/Http";
import moment from "moment";

const formRef = ref(null);
const message = useMessage();
const isShowing = ref(false);
const emit = defineEmits(["close", "save"]);
const props = defineProps({
  isShowing: Boolean,
  employee: Object,
});
watch(
  () => props.isShowing,
  (newValue) => {
    isShowing.value = newValue;
    formValue.value = { ...props.employee };
  }
);
const formValue = ref({
  id: "",
  name: "",
  address: "",
  contact_number: "",
  role: "",
  date_of_birth: "",
});

const rules = {
  user: {
    firstName: {
      required: true,
      message: "Please input your name",
      trigger: "blur",
    },
    age: {
      required: true,
      message: "Please input your age",
      trigger: ["input", "blur"],
    },
  },
  phone: {
    required: true,
    message: "Please input your number",
    trigger: ["input"],
  },
};
const timestamp = ref(118313526e4);
const options = [
  {
    label: "Marina Bay Sands",
    key: "Marina Bay Sands",
  },
  {
    label: "Brown's Hotel, London",
    key: "Brown's Hotel, London",
  },
  {
    label: "Atlantis Bahamas, Nassau",
    key: "Atlantis Bahamas, Nassau",
  },
  {
    label: "The Beverly Hills Hotel, Los Angeles",
    key: "The Beverly Hills Hotel, Los Angeles",
  },
];
const selectedDOB = computed({
  get: () => {
    return moment(formValue.value.date_of_birth).valueOf();
  },
  set: (epoch) => {
    formValue.value.date_of_birth = moment.unix(epoch).format("YYYY-MM-DD");
  },
});

const isNewEmployee = computed(() => {
  return !formValue.value.id;
});

async function save() {
  if (isNewEmployee.value) {
    await Http.post(`employee`, formValue.value);
    emit("save");

    return;
  }

  await Http.put(`employee/${formValue.value.id}`, formValue.value);
  emit("save");
}
function handleSelect(key) {
  message.info(String(key));
}
function handleValidateClick(e) {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success("Valid");
    } else {
      console.log(errors);
      message.error("Invalid");
    }
  });
}
</script>

<style scoped></style>
