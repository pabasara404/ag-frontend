<template>
  <n-modal
    v-model:show="isShowing"
    preset="card"
    style="width: 800px"
    :on-update:show="(value) => emit('close', value)"
  >
    <n-layout style="padding-left: 8px">
      <n-page-header>
        <div class="flex justify-between ...">
          <n-h2>Timber Cutting Permit Application</n-h2>
        </div>
      </n-page-header>

      <n-form ref="formRef" :model="formValue">
        <n-form-item label="Name of the Applicant" path="user.name">
          <n-input
            v-model:value="formValue.name"
            placeholder="Enter Name of the Applicant"
          />
        </n-form-item>
        <n-form-item label="Address of the Applicant" path="address">
          <n-input
            v-model:value="formValue.address"
            placeholder="Address of the Applicant"
          /> </n-form-item
        ><n-form-item label="Telephone No." path="phone">
          <n-input
            v-model:value="formValue.contact_number"
            placeholder="Telephone Number" /></n-form-item
        ><n-form-item label="Are you a Timber seller?" path="timberSeller">
          <n-radio
            :checked="timber_seller_checked_value === 'Yes'"
            value="Yes"
            name="timberSeller"
            v-model:value="formValue.timber_seller_checked_value"
            @change="handleChange('timberSeller', $event)"
          >
            Yes
          </n-radio>
          <n-radio
            :checked="timber_seller_checked_value === 'No'"
            value="No"
            name="timberSeller"
            v-model:value="formValue.timber_seller_checked_value"
            @change="handleChange('timberSeller', $event)"
          >
            No
          </n-radio> </n-form-item
        ><n-form-item
          label="Are you cutting trees for non-commercial use?"
          path="timberSeller"
        >
          <n-radio
            :checked="non_commercial_use_checked_value === 'Yes'"
            value="Yes"
            v-model:value="formValue.non_commercial_use_checked_value"
            name="nonCommercialUse"
            @change="handleChange('nonCommercialUse', $event)"
          >
            Yes
          </n-radio>
          <n-radio
            :checked="non_commercial_use_checked_value === 'No'"
            value="No"
            v-model:value="formValue.non_commercial_use_checked_value"
            name="nonCommercialUse"
            @change="handleChange('nonCommercialUse', $event)"
          >
            No
          </n-radio>
        </n-form-item>
        <n-form-item
          label="Grama Niladari Division"
          path="grama_niladari_division"
        >
          <n-dropdown
            trigger="hover"
            placement="bottom-start"
            :options="options"
            @select="handleSelect"
          >
            <n-button
              >Grama Niladari Division
              <n-icon><ArrowDropDownRoundIcon /></n-icon>
            </n-button>
          </n-dropdown>
        </n-form-item>
        <n-form-item label="Land Deed Number" path="land_deed_number">
          <n-input
            v-model:value="formValue.land_deed_number"
            placeholder="Land Deed Number"
          />
        </n-form-item>
        <n-form-item label="Land deed date" path="land_deed_date">
          <n-date-picker v-model:value="selectedDeedDate" type="date" />
        </n-form-item>
        <n-form-item label="Ownership of land" path="ownershipOfLand">
          <n-radio
            :checked="
              ownership_of_land_checked_value === 'Freehold(Sinnakkara)'
            "
            value="Freehold(Sinnakkara)"
            name="ownershipOfLand"
            v-model:value="formValue.ownership_of_land_checked_value"
            @change="handleChange('ownershipOfLand', $event)"
          >
            Freehold (Sinnakkara)
          </n-radio>
          <n-radio
            :checked="ownership_of_land_checked_value === 'Co-owner'"
            value="Co-owner"
            name="ownershipOfLand"
            v-model:value="formValue.ownership_of_land_checked_value"
            @change="handleChange('ownershipOfLand', $event)"
          >
            Co-owner
          </n-radio>
          <n-radio
            :checked="
              ownership_of_land_checked_value ===
              'Granted by Government(Swarnabhumi)'
            "
            value="Granted by Government(Swarnabhumi)"
            name="ownershipOfLand"
            v-model:value="formValue.ownership_of_land_checked_value"
            @change="handleChange('ownershipOfLand', $event)"
          >
            Granted by Government (Swarnabhumi)
          </n-radio>
        </n-form-item>
        <n-form-item label="Land Name" path="land_name">
          <n-input
            v-model:value="formValue.land_name"
            placeholder="Land Name"
          />
        </n-form-item>
        <n-form-item label="Land Size in perches" path="land_size">
          <n-input
            v-model:value="formValue.land_size"
            placeholder="Land Size in perches"
          />
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-icon><InformationCircleOutlineIcon /></n-icon>
            </template>
            <span>1 Acre = 160 Perches = 4 Roods = 4,000 Sqm</span>
          </n-tooltip>
        </n-form-item>
        <n-form-item label="Plan No." path="plan_number">
          <n-input
            v-model:value="formValue.plan_number"
            placeholder="Plan No."
          />
        </n-form-item>
        <n-form-item label="Plan Date" path="plan_date">
          <n-date-picker v-model:value="selectedPlanDate" type="date" />
        </n-form-item>
        <n-form-item label="Plan plot No." path="plan_plot_no">
          <n-input
            v-model:value="formValue.plan_plot_no"
            placeholder="Plan plot No."
          />
        </n-form-item>
        <n-form-item label="Boundaries:" path="boundaries">
          <n-input v-model:value="formValue.north" placeholder="To North" />
          <n-input v-model:value="formValue.south" placeholder="To South" />
          <n-input v-model:value="formValue.east" placeholder="To East" />
          <n-input v-model:value="formValue.west" placeholder="To West" />
        </n-form-item>
        <n-form-item
          label="Number of trees currently on this plot:"
          path="no_of_trees"
        >
          <n-input
            v-model:value="formValue.jackfruit"
            placeholder="Jackfruit"
          />
          <n-input
            v-model:value="formValue.breadfruit"
            placeholder="Breadfruit"
          />
          <n-input v-model:value="formValue.coconut" placeholder="Coconut" />
          <n-input v-model:value="formValue.palmyra" placeholder="Palmyra" />
        </n-form-item>
        <n-form-item label="Details of trees requested to be cut">
          <n-button @click="addEmptyRow"
            ><n-icon><plus-outlined-icon /></n-icon>Add Row</n-button
          >
        </n-form-item>
        <n-form-item>
          <n-data-table :columns="columns" :data="data">
            <template #action="{ row }">
              <n-button type="error" @click="removeRow(row)">Remove</n-button>
            </template>
          </n-data-table>
        </n-form-item>

        <n-form-item label="Reasons for cutting down tree/trees:">
          <n-checkbox-group v-model="selectedValues">
            <n-grid :y-gap="8" :cols="2">
              <n-gi>
                <n-checkbox
                  value="to a common developmental need"
                  label="to a common developmental need"
                />
              </n-gi>
              <n-gi>
                <n-checkbox
                  value="Because it's dangerous"
                  label="Because it's dangerous"
                />
              </n-gi>
              <n-gi>
                <n-checkbox
                  value="To build the house intended to be built"
                  label="To build the house intended to be built"
                />
              </n-gi>
              <n-gi>
                <n-checkbox
                  value="Due to a decision of the court or arbitration panel"
                  label="Due to a decision of the court or arbitration panel"
                />
              </n-gi>
              <n-gi>
                <n-checkbox
                  value="Due to death due to natural causes"
                  label="Due to death due to natural causes"
                />
              </n-gi>
              <n-gi>
                <n-checkbox
                  value=" Because it does not bear fruit"
                  label=" Because it does not bear fruit"
                />
              </n-gi>
              <n-gi>
                <n-checkbox
                  value="Because the Electricity Board has asked to cut it off"
                  label="Because the Electricity Board has asked to cut it off"
                />
              </n-gi>
            </n-grid>
          </n-checkbox-group>
        </n-form-item>
        <n-form-item
          label="Have jackfruit, coconut, breadfruit and female palm trees been cut on this land before?"
        >
          <n-input
            v-model:value="formValue.cutted_other_tree_count"
            placeholder="If any, that number"
          />
        </n-form-item>
        <n-form-item
          label="How many trees of that type are planted to replace the trees that are asked to be cut down?"
        >
          <n-input
            v-model:value="formValue.planted_tree_count"
            placeholder="How many trees of that type are planted to replace the trees that are asked to be cut down?"
          />
        </n-form-item>
        <n-form-item
          label="Briefly mention the road signs from the Divisional Secretariat to the land"
        >
          <n-input
            type="textarea"
            v-model:value="formValue.road_to_land"
            placeholder="Briefly mention the road signs from the Divisional Secretariat to the land"
          />
        </n-form-item>
        <n-p
          >Upload following documents:<n-ul>
            <n-li>Duly Filled application</n-li>
            <n-li>
              Copy of the deed of the relevant land (Should've certified by the
              Grama Niladhari)
            </n-li>
            <n-li
              >Copy of the plan (Should've certified by the Grama Niladhari )
            </n-li>
            <n-li> Extract for the relevant deed issued within a week. </n-li>
            <n-li>
              If the deed has life interest owner/ owners, a letter of consent
              regarding timber cutting ( Should've certified by the Grama
              Niladhari )
            </n-li>
            <n-li>
              If the life interest owner/owners have died applicant should
              present certified copy of the death certificate.
            </n-li>
            <n-li>
              If you are presenting a deed of declaration, it should submit with
              a grama niladhari report stating the clear holding of the land.
            </n-li>
          </n-ul>
        </n-p>
        <n-form-item>
          <n-upload
            multiple
            directory-dnd
            action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
            :max="5"
          >
            <n-upload-dragger>
              <div style="margin-bottom: 12px">
                <n-icon size="48" :depth="3">
                  <archive-icon />
                </n-icon>
              </div>
              <n-text style="font-size: 16px">
                Click or drag a file to this area to upload
              </n-text>
              <n-p depth="3" style="margin: 8px 0 0 0">
                Strictly prohibit from uploading sensitive information. For
                example, your bank card PIN or your credit card expiry date.
              </n-p>
            </n-upload-dragger>
          </n-upload>
        </n-form-item>
        <n-p
          >I certify that I have the legal right to the land related to felling
          of trees and that there is no dispute, that the above information is
          true and that I will take full responsibility if any problem
          arises.</n-p
        >
        <div class="flex justify-end">
          <n-form-item>
            <n-button @click="certifyAndSubmit()">
              Certify and Submit
            </n-button>
          </n-form-item>
        </div>
      </n-form>
    </n-layout>
    <template #footer></template>
  </n-modal>
  <n-back-top :right="100" />
</template>

<script setup>
import { computed, ref, watch, h } from "vue";
import { NButton, useMessage } from "naive-ui";
import {
  ArchiveOutline as ArchiveIcon,
  InformationCircleOutline as InformationCircleOutlineIcon,
} from "@vicons/ionicons5";
import {
  ArrowDropDownRound as ArrowDropDownRoundIcon,
  PlusOutlined as PlusOutlinedIcon,
} from "@vicons/material";
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
const non_commercial_use_checked_value = ref(null);
const timber_seller_checked_value = ref(null);
const ownership_of_land_checked_value = ref(null);
const selectedValues = ref([]);
// const GNDivisionOptions from gndivision table
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
  timber_seller_checked_value: "",
  non_commercial_use_checked_value: "",
  grama_niladari_division: "",
  land_deed_number: "",
  land_deed_date: "",
  ownership_of_land_checked_value: "",
  land_name: "",
  land_size: "",
  plan_number: "",
  plan_date: "",
  plan_plot_number: "",
  north: "",
  south: "",
  east: "",
  west: "",
  breadfruit: "",
  coconut: "",
  jackfriut: "",
  palmyra: "",
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
const certifyAndSubmit = () => {
  console.log(formValue.value);
};
const selectedDeedDate = computed({
  get: () => {
    return moment(formValue.value.land_deed_date).valueOf();
  },
  set: (epoch) => {
    formValue.value.land_deed_date = moment
      .unix(epoch / 1000)
      .format("YYYY-MM-DD");
  },
});
const selectedPlanDate = computed({
  get: () => {
    return moment(formValue.value.plan_date).valueOf();
  },
  set: (epoch) => {
    formValue.value.plan_date = moment.unix(epoch / 1000).format("YYYY-MM-DD");
  },
});

const isNewTimberApplication = computed(() => {
  return !formValue.value.id;
});

async function save() {
  if (isNewTimberApplication.value) {
    await Http.post(`newTimberApplication`, formValue.value);
    emit("save");

    return;
  }
}

const handleSelect = (value) => {
  formValue.value.grama_niladari_division = value;
};
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
// function handleChange(e) {
//   checkedValueRef.value = e.target.value;
//   console.log(`Selected value: ${checkedValueRef.value}`);
// }
function handleChange(group, e) {
  if (group === "nonCommercialUse") {
    non_commercial_use_checked_value.value = e.target.value;
    console.log(
      `Selected non-commercial use value: ${non_commercial_use_checked_value.value}`
    );
  } else if (group === "timberSeller") {
    timber_seller_checked_value.value = e.target.value;
    console.log(
      `Selected timber seller value: ${timber_seller_checked_value.value}`
    );
  } else if (group === "ownershipOfLand") {
    ownership_of_land_checked_value.value = e.target.value;
    console.log(
      `Selected timber seller value: ${ownership_of_land_checked_value.value}`
    );
  }
}

const createColumns = () => {
  return [
    {
      title: "Sub no",
      key: "subNo",
      render: (row, column) =>
        h("n-input", { value: row[column.key], type: "text" }),
    },
    {
      title: "Type",
      key: "type",
      render: (row, column) => h("n-input", { value: row[column.key] }),
    },
    {
      title: "Height (feets)",
      key: "height",
      render: (row, column) => h("n-input", { value: row[column.key] }),
    },
    {
      title: "Girth (feets)",
      key: "girth",
      render: (row, column) => h("n-input", { value: row[column.key] }),
    },
    {
      title: "Fruit status",
      key: "fruitStatus",
      render: (row, column) => h("n-input", { value: row[column.key] }),
    },
    {
      title: "Age",
      key: "age",
      render: (row, column) => h("n-input", { value: row[column.key] }),
    },
    {
      title: "Action",
      key: "action",
      render: (row, column) => {
        return h(
          NButton,
          {
            round: true,
            type: "error",
            strong: true,
            secondary: true,
            size: "small",
            onClick: () => {
              removeRow(column.index);
            },
          },
          "Remove"
        );
      },
    },
  ];
};
const data = ref([]);
const columns = createColumns();

const addEmptyRow = () => {
  const emptyRow = {};
  columns.forEach((column) => {
    emptyRow[column.key] = "";
  });
  data.value.push(emptyRow);
};

const removeRow = (index) => {
  data.value.splice(index, 1);
};
</script>

<style scoped></style>
