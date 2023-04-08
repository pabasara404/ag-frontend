<template>
  <PageHeader title="Timber Cutting Permit Services" />
  <div class="flex justify-evenly ... flex-wrap">
    <n-card
      @click="handleCardClick('/timberCuttingApplication')"
      title="Apply to a Timber Cutting Permit"
      hoverable
    >
      <div class="flex justify-center ...">
        <img
          width="200"
          src="src/assets/images/Timber cutting permit req4.jpeg"
        />
      </div>
    </n-card>
    <n-card title="View Timber Cutting Permit Status" hoverable>
      <div class="flex justify-center ...">
        <img
          width="200"
          src="src/assets/images/application status tracking black and white simple clipart.jpeg"
        />
      </div>
    </n-card>
    <n-card title="Permit Renewal Request" hoverable>
      <div class="flex justify-center ...">
        <img width="200" src="src/assets/images/img.png" />
      </div>
    </n-card>
    <n-card title="Review the Applications" hoverable>
      <div class="flex justify-center ...">
        <img width="200" src="src/assets/images/img_1.png" />
      </div>
    </n-card>
    <n-card title="Issue Permits" hoverable>
      <div class="flex justify-center ...">
        <img
          width="200"
          src="src/assets/images/img_2.png"
        />
      </div>
    </n-card>
  </div>
  <router-view />
</template>

<script setup>
import router from "@/router";
import PageHeader from "@/components/PageHeader.vue";

const handleCardClick = (route) => {
  router.push(route);
};
</script>

<style scoped>
.n-card {
  max-width: 350px;
}
</style>
