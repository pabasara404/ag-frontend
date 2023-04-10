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
            v-if="!hasOnlyOneSideBarItem"
            :inverted="inverted"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="authUserSideBarItems"
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
import { computed, h, ref } from "vue";
import { NIcon } from "naive-ui";
import { RouterLink } from "vue-router";
import {
  BookOutline as BookIcon,
  Business as BusinessIcon,
  Car as CarIcon,
  Cart as CartIcon,
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
    authorizedBy: ["Admin"],
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
        authorizedBy: ["Employeee", "Admin"],
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
        authorizedBy: ["Employeee", "Admin"],
      },
      {
        label: "Citizen Details Management",
        key: "citizenDetailsManagement",
        authorizedBy: ["Employeee", "Admin"],
      },
      {
        label: "Field Officer Details Management",
        key: "fieldOfficerDetailsManagement",
        authorizedBy: ["Employeee", "Admin"],
      },
    ],
  },
  {
    label: "Grama Niladari Division Details Management",
    key: "gramaNiladariDivisionDetailsManagement",
    authorizedBy: ["Employeee", "Admin"],
    icon: renderIcon(MapIcon),
  },

  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "timberCutting",
          },
        },
        { default: () => "Timber Cutting Process Management" }
      ),
    key: "timberCuttingManagement",
    authorizedBy: ["Employeee", "Admin"],
    icon: renderIcon(LeafIcon),
  },

  {
    label: "Timber Transportation Process and Permits",
    key: "timberTransportationProcessAndPermits",
    authorizedBy: ["Employeee", "Admin"],
    icon: renderIcon(CarIcon),
  },
  {
    label: "Business Registration Certificates",
    key: "businessRegistrationCertificates",
    authorizedBy: ["Employeee", "Admin"],
    icon: renderIcon(BusinessIcon),
  },
  {
    label: "Requesting & Issuing Income Certificates",
    key: "requestingAndIssuingIncomeCertificates",
    authorizedBy: ["Employeee", "Admin"],
    icon: renderIcon(BusinessIcon),
  },
  {
    label: "Welfare Information Verification",
    key: "welfareInformationVerification",
    authorizedBy: ["Employeee", "Admin"],
    icon: renderIcon(LogoBitcoinIcon),
    children: [
      {
        label: "Grade 5 Scholarship Information Verification",
        key: "grade5",
        authorizedBy: ["Employeee", "Admin"],
      },
      {
        label: "Agrahara Information Verification",
        key: "agrahara",
        authorizedBy: ["Employeee", "Admin"],
      },
      {
        label: "President Fund Information Verification",
        key: "presidentFund",
        authorizedBy: ["Employeee", "Admin"],
      },
      {
        label: "Mahapola Application Processing",
        key: "mahapola",
        authorizedBy: ["Employeee", "Admin"],
      },
    ],
  },
  {
    label: "Animal Transportation Permit",
    key: "animalTransportationPermit",
    authorizedBy: ["Client", "Admin"],
    icon: renderIcon(CartIcon),
  },
  {
    label: "Pawning Licensing",
    key: "pawningLicensing",
    authorizedBy: ["Employeee", "Admin"],
    icon: renderIcon(DiamondIcon),
  },
  {
    label: "Excise Licensing",
    key: "exciseLicensing",
    authorizedBy: ["Employeee", "Admin"],
    icon: renderIcon(WineIcon),
  },
  {
    label: "Valuation Report Issuing",
    key: "valuationReportIssuing",
    authorizedBy: ["Employeee", "Admin"],
    icon: renderIcon(DocumentIcon),
  },
  {
    label: "Payment Management",
    key: "paymentManagement",
    authorizedBy: ["Employeee", "Admin"],
    icon: renderIcon(BookIcon),
  },
];
const signOut = () => store.dispatch("auth/logout");

const authUserSideBarItems = computed(() => {
  const authUserRole = store.state.auth.user.role;

  return menuOptions.filter((option) => {
    return option.authorizedBy.includes(authUserRole);
  });
});

const hasOnlyOneSideBarItem = authUserSideBarItems.value.length === 1;
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

<style scoped></style>
