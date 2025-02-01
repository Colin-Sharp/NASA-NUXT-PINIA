<script setup>
const toolbarStore = useToolbarSettingStore();

const state = reactive({
  collection: toolbarStore.returnCollection,
  mode: toolbarStore.returnMode,
});

const date = defineModel("date");
const range = defineModel("range");
</script>

<template>
  <aside
    class="toolbar flex flex-col sm:flex-row items-center sm:justify-between gap-2 p-4 border rounded my-4 mx-2 border-l-rose-200 text-white"
  >
    <section class="flex space-4 flex-col">
      <div class="radio-wrapper sm:mx-2 my-2 sm:my-0 gap-4">
        <label class="flex gap-2 form-control" for="date">
          <input
            type="radio"
            v-model="state.mode"
            name="mode"
            v-on:change="toolbarStore.changeMode('date')"
            value="date"
            id="date"
          />
          Date Mode
        </label>
        <label class="flex gap-2 form-control" for="range">
          <input
            type="radio"
            v-model="state.mode"
            name="mode"
            v-on:change="toolbarStore.changeMode('range')"
            value="range"
            id="range"
          />
          Range Mode
        </label>
      </div>
    </section>

    <DatePicker
      class="min-w-32 w-full sm:w-36"
      v-show="state.mode === 'date'"
      v-model="date"
      :maxDate="new Date()"
      :manualInput="false"
    />
    <DatePicker
      class="min-w-56 w-full sm:w-72"
      v-show="state.mode === 'range'"
      v-model="range"
      :maxDate="new Date()"
      selectionMode="range"
      :manualInput="false"
    />
  </aside>
</template>
