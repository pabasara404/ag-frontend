<template>
  <n-layout class="pl-2">
    <PageHeader title="Timber Cutting Permit Request" />
    <n-p
      >Any citizen should obtain a permit to cut tree types such as Jackfruit,
      coconut, breadfruit, and palmyra. Required documents to obtain the timber
      cutting permit :</n-p
    >
    <n-ul>
      <n-li>Duly Filled application</n-li>
      <n-li>
        Copy of the deed of the relevant land (Should've certified by the Grama
        Niladhari)
      </n-li>
      <n-li
        >Copy of the plan (Should've certified by the Grama Niladhari )
      </n-li>
      <n-li> Extract for the relevant deed issued within a week. </n-li>
      <n-li>
        If the deed has life interest owner/ owners, a letter of consent
        regarding timber cutting ( Should've certified by the Grama Niladhari )
      </n-li>
      <n-li>
        If the life interest owner/owners have died applicant should present
        certified copy of the death certificate.
      </n-li>
      <n-li>
        If you are presenting a deed of declaration, it should submit with a
        grama niladhari report stating the clear holding of the land.
      </n-li>
    </n-ul>
    <div class="flex justify-center ... p-8">
      <n-button
        @click="isShowingTimberCuttingPermitApplicationModal = true"
        type="warning"
        secondary
        bordered
      >
        Apply to Obtain a Timber Cutting Permit
      </n-button>
    </div>
    <timber-cutting-permit-application-modal
      :application="application"
      :is-showing="isShowingTimberCuttingPermitApplicationModal"
      @close="isShowingTimberCuttingPermitApplicationModal = $event"
    />
  </n-layout>
</template>

<script setup>
import PageHeader from "@/components/PageHeader.vue";
import { onMounted, ref } from "vue";
import TimberCuttingPermitApplicationModal from "@/components/TimberCuttingPermitApplicationModal.vue";
import Http from "@/services/Http";

const isShowingTimberCuttingPermitApplicationModal = ref(false);
const application = ref({
  id: "",
  name: "",
  address: "",
  contact_number: "",
  timber_seller_checked_value: "",
  non_commercial_use_checked_value: "",
  grama_niladari_division: "",
  deed_details: {
    land_deed_number: "",
    land_deed_date: "",
  },
  ownership_of_land_checked_value: "",
  land_details: {
    land_name: "",
    land_size: "",
    plan_number: "",
    plan_date: "",
    plan_plot_number: "",
  },
  boundaries: {
    north: "",
    south: "",
    east: "",
    west: "",
  },
  tree_count: {
    breadfruit: "",
    coconut: "",
    jackfriut: "",
    palmyra: "",
  },
  tree_details: [
    {
      sub_no: "",
      type: "",
      height: "",
      girth: "",
      fruit_status: "",
      age: "",
    },
  ],
  reason_to_cut_trees: [],
  cutted_other_tree_count: "",
  planted_tree_count: "",
  road_to_land: "",
});
const timberCuttingPermitApplications = ref([]);
onMounted(() => {
  fetchTimberCuttingPermitApplicationModal();
});
async function fetchTimberCuttingPermitApplicationModal() {
  const { data } = await Http.get("timberCuttingPermitApplication");
  timberCuttingPermitApplications.value = data.data;
}
</script>

<style scoped></style>
