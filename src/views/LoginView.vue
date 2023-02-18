<template class="template">
  <div class="background">
    <n-card>
      <n-h2 style="text-align:center">Login</n-h2>
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="age" label="Username :">
          <n-input v-model:value="form.email" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="password" label="Password :">
          <n-input v-model:value="form.password" type="password" />
        </n-form-item>

        <n-row>
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button
                round
                secondary
                type="info"
                @click="login"
              >
                Login
              </n-button>
            </div>

            <n-label class="text-xs">Don't have an account <router-link style="color:#1E90FF" to="">Sign Up</router-link></n-label>
          </n-col>
        </n-row>
      </n-form>
    </n-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Auth from "@/services/Auth";
import { useStore } from "vuex";
import router from "@/router";

const store = useStore();

const form = ref({
  email: "",
  password: "",
});

const signIn = () => store.dispatch("auth/login");

function login() {
  Auth.login(form.value)
    .then(async (response) => {
      await signIn();
      await router.push({ name: "home" });
    })
    .catch((error) => {
      if (error.response.status === 422) {
        // errors.value = error.response.data.errors;
      }
    });
}
</script>

<style scoped>
.background {
  height: 100%;
  background: rgb(254, 190, 16);
  background: linear-gradient(45deg, rgba(254, 190, 16,1) 0%, rgba(255,255,255,1) 100%);
}
.n-card {
  max-width: 390px;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.18);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.1px);
  -webkit-backdrop-filter: blur(4.1px);
  border: 1px solid rgba(255, 255, 255, 0.17);
}
</style>
