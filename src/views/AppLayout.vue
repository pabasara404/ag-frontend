<template>
  <n-space vertical>
    <n-layout>
      <n-layout-header :inverted="inverted" bordered class="h-20">
        <div class="flex w-full justify-between">
          <div class="flex w-full">
            <div>
              <img
                style="
                  display: inline;
                  padding: 10px 10px 10px 15px;
                  width: 60px;
                "
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Emblem_of_Sri_Lanka.svg/150px-Emblem_of_Sri_Lanka.svg.png"
              />
            </div>
            <div class="flex flex-col py-3">
              <div class="font-bold">
                Permits, License and Welfare Fund Request Management System
              </div>
              <div class="font-bold">Divisional Secretariat - Katana</div>
            </div>
          </div>
          <div class="flex w-full flex-col p-3">
            <div class="flex justify-end">
              <div class="pr-2">
                <n-avatar
                  round
                  size="medium"
                  src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                />
              </div>
              <div>
                <n-button
                  strong
                  secondary
                  round
                  type="primary"
                  size="small"
                  @click="logout"
                >
                  Log out
                </n-button>
              </div>
            </div>
            <div>
              <n-space
                style="
                  padding-right: 8px;
                  display: flex;
                  justify-content: flex-end;
                  gap: 8px 12px;
                "
              >
                <n-switch v-model:value="inverted" size="medium"
                  ><template #checked-icon
                    ><n-icon :component="MoonIcon" /></template
                  ><template #unchecked-icon
                    ><n-icon
                      :component="MoonOutlineIcon" /></template></n-switch
              ></n-space>
            </div>
          </div>
        </div>
      </n-layout-header>
      <n-layout has-sider>
        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="350"
          :native-scrollbar="false"
          :inverted="inverted"
          class="h-[calc(100vh-80px-24px)]"
        >
          <n-menu
            :inverted="inverted"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
          />
        </n-layout-sider>
        <n-layout class="h-[calc(100vh-80px-24px)]">
          <router-view />
        </n-layout>
      </n-layout>
      <n-layout-footer :inverted="inverted" bordered align="center" class="h-6">
        Copyright © 2023 Divisional Secretariat - Katana. All Rights Reserved.
      </n-layout-footer>
    </n-layout>
  </n-space>
</template>

<script setup>
import { h, ref } from "vue";
import { NIcon } from "naive-ui";
import { RouterLink } from "vue-router";
import {
  BookOutline as BookIcon,
  Business as BusinessIcon,
  Car as CarIcon,
  Cart as CartIcon,
  Construct as ConstructIcon,
  Diamond as DiamondIcon,
  Document as DocumentIcon,
  Leaf as LeafIcon,
  LogoBitcoin as LogoBitcoinIcon,
  Map as MapIcon,
  Person as PersonIcon,
  WineOutline as WineIcon,
  Moon as MoonIcon,
  MoonOutline as MoonOutlineIcon,
  // PersonCircle as PersonCircleIcon,
} from "@vicons/ionicons5";
import Http from "@/services/Http";
import { useStore } from "vuex";
import router from "@/router";

const store = useStore();

const inverted = ref(false);

const menuOptions = [
  {
    label: "User Details Management",
    key: "userDetailsManagement",
    icon: renderIcon(PersonIcon),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "employee",
              },
            },
            { default: () => "Employee Details Management" }
          ),
        key: "employeeDetailsManagement",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "home",
              },
            },
            { default: () => "Grama Niladhari Details Management" }
          ),
        key: "gramaNiladhariDetails",
      },
      {
        label: "Citizen Details Management",
        key: "citizenDetailsManagement",
      },
      {
        label: "Field Officer Details Management",
        key: "fieldOfficerDetailsManagement",
      },
    ],
  },
  {
    label: "Grama Niladari Division Details Management",
    key: "gramaNiladariDivisionDetailsManagement",
    icon: renderIcon(MapIcon),
  },
  {
    label: "Timber Cutting Process and Permits",
    key: "timberCuttingProcessAndPermits",
    icon: renderIcon(LeafIcon),
  },
  {
    label: "Timber Transportation Process and Permits",
    key: "timberTransportationProcessAndPermits",
    icon: renderIcon(CarIcon),
  },
  {
    label: "Business Registration Certificates",
    key: "businessRegistrationCertificates",
    icon: renderIcon(BusinessIcon),
  },
  {
    label: "Requesting & Issuing Income Certificates",
    key: "requestingAndIssuingIncomeCertificates",
    icon: renderIcon(BusinessIcon),
  },
  {
    label: "Welfare Information Verification",
    key: "welfareInformationVerification",
    icon: renderIcon(LogoBitcoinIcon),
    children: [
      {
        label: "Grade 5 Scholarship Information Verification",
        key: "grade5",
      },
      {
        label: "Agrahara Information Verification",
        key: "agrahara",
      },
      {
        label: "President Fund Information Verification",
        key: "presidentFund",
      },
      {
        label: "Mahapola Application Processing",
        key: "mahapola",
      },
    ],
  },
  {
    label: "Animal Transportation Permit",
    key: "animalTransportationPermit",
    icon: renderIcon(CartIcon),
  },
  {
    label: "Pawning Licensing",
    key: "pawningLicensing",
    icon: renderIcon(DiamondIcon),
  },
  {
    label: "Excise Licensing",
    key: "exciseLicensing",
    icon: renderIcon(WineIcon),
  },
  {
    label: "Excavation Licensing",
    key: "excavationLicensing",
    icon: renderIcon(ConstructIcon),
  },
  {
    label: "Valuation Report Issuing",
    key: "valuationReportIssuing",
    icon: renderIcon(DocumentIcon),
  },
  {
    label: "Payment Management",
    key: "paymentManagement",
    icon: renderIcon(BookIcon),
  },
];
const signOut = () => store.dispatch("auth/logout");
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

function logout() {
  Http.get("logout").then(async () => {
    await signOut();
    await router.push({ name: "login" });
  });
}
</script>

<style scoped>
.n-layout-header {
  //padding: 10px 0px 10px 0px;
}
</style>
