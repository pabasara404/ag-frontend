<template>
  <n-form ref="formRef" :model="model" :rules="rules">
    <n-form-item path="age" label="Age">
      <n-input v-model:value="form.email" @keydown.enter.prevent />
    </n-form-item>
    <n-form-item path="password" label="Password">
      <n-input v-model:value="form.password" type="password" />
    </n-form-item>

    <n-row>
      <n-col :span="24">
        <div style="display: flex; justify-content: flex-end">
          <n-button round type="primary" @click="login"> Validate </n-button>
        </div>
      </n-col>
    </n-row>
  </n-form>
</template>

<script setup>
import { ref } from "vue";
import Auth from "@/services/Auth";

const form = ref({
  email: "",
  password: "",
});

async function register() {
  this.processing = true;
  await axios.get("/sanctum/csrf-cookie");
  await axios
    .post("/register", this.user)
    .then((response) => {
      this.validationErrors = {};
      this.signIn();
    })
    .catch(({ response }) => {
      if (response.status === 422) {
        this.validationErrors = response.data.errors;
      } else {
        this.validationErrors = {};
        alert(response.data.message);
      }
    })
    .finally(() => {
      this.processing = false;
    });
}
</script>

<style scoped></style>
