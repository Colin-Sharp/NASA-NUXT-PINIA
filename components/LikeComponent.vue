<script setup>
const props = defineProps({
  apod: Object,
});

const like = defineModel("like", { required: true });

defineEmits(["toggleFavorite"]);
</script>

<template>
  <label class="like-component" :for="`like${apod.date}`">
    <input
      type="checkbox"
      :id="`like${apod.date}`"
      v-model="like"
      @change="$emit('toggleFavorite')"
    />
    <span class="text">Like</span>
  </label>
</template>
