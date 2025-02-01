<script setup>
import { format } from "date-fns";
const apodStore = useApodStore();
const toolbarStore = useToolbarSettingStore();

const state = reactive({
  date: new Date(),
  range: initRange(),
});

const mode = computed(() => toolbarStore.returnMode);
const currentApod = computed(() => apodStore.returnCurrentApod);
const currentApodRange = computed(() => apodStore.returnCurrentRange);
const currentError = computed(() => apodStore.returnError);
const loading = computed(() => apodStore.returnLoading);

function initRange() {
  const date7DayAgo = new Date();
  date7DayAgo.setDate(date7DayAgo.getDate() - 7);
  return [date7DayAgo, new Date()];
}

const getApodRange = async (startDate, endDate) => {
  await apodStore.getApodRange(
    format(startDate, "yyyy-MM-dd"),
    format(endDate, "yyyy-MM-dd")
  );
};

onMounted(async () => {
  if (!currentApod.value) {
    await apodStore.getApodItem(format(state.date, "yyyy-MM-dd"));
  }
  if (!currentApodRange.value?.length) {
    await getApodRange(state.range[0], state.range[1]);
  }
});

watch(
  () => currentError.value,
  (error) => {
    if (error?.data?.message === "Not Found") {
      const dateBefore = new Date(state.date);
      dateBefore.setDate(dateBefore.getDate() - 1);
      state.date = dateBefore;
    }
  }
);

watch(
  () => state.date,
  async () => {
    await apodStore.getApodItem(format(state.date, "yyyy-MM-dd"));
  }
);

watch(
  () => state.range,
  async (range) => {
    if (range.length === 2 && range[0] && range[1]) {
      await getApodRange(range[0], range[1]);
    }
  }
);
</script>

<template>
  <div>
    <ToolBarComponent v-model:date="state.date" v-model:range="state.range" />
    <div
      v-if="!loading && currentApod && mode === 'date'"
      class="my-8 flex justify-center"
    >
      <ApodComponent class="mx-2" :single="true" :apod="currentApod" />
    </div>

    <section
      class="flex flex-wrap"
      v-if="!loading && currentApodRange && mode === 'range'"
    >
      <ApodComponent
        class="w-full sm:w-6/12 p-2 lg:w-4/12"
        v-for="apod in currentApodRange"
        :key="apod.date"
        :apod="apod"
      />
    </section>
    <div class="mt-16" v-if="loading">
      <LoadingComponent></LoadingComponent>
    </div>
  </div>
</template>
