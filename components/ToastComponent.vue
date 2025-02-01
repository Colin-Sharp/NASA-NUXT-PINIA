<script setup>
const props = defineProps({
  statusCode: "",
  message: "",
  show: false,
  maxWidth: "unset",
});

const show = computed(() => props.show);

const apodStore = useApodStore();

watch(
  () => show.value,
  (show) => {
    if (show) {
      state.show = true;
      setTimeHideToast();
    }
  }
);

const toastMaxWith = computed(() =>
  props.maxWidth ? props.maxWidth : "unset"
);

const state = reactive({
  show: false,
});

function setTimeHideToast() {
  setTimeout(() => {
    state.show = false;
    setTimeout(() => {
      apodStore.clearError();
    }, 1500);
  }, 3000);
}
</script>

<template>
  <section
    :style="{ maxWidth: toastMaxWith }"
    :class="['toast', { show: state.show }]"
  >
    <div class="content-wrapper">
      <h3 class="title">Woops something is not right {{ statusCode }}</h3>
      <p class="content">Houston we have a problem: {{ message }}</p>
    </div>
  </section>
</template>
