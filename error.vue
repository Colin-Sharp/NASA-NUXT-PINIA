<script setup>
defineProps(["error"]);

const handleClearError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="wrapper">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
    <section class="flex flex-col h-lvh items-center justify-center">
      <h1 class="text-4xl font-bold">Woops error {{ error?.statusCode }}</h1>
      <p class="text-2xl my-4">{{ error?.message }}</p>
      <NuxtImg
        src="/images/fallbackImage.svg"
        width="200"
        class="rounded-full mb-4"
        placeholder="/images/fallbackImage.svg"
      ></NuxtImg>
      <button
        class="text-3xl border hover:bg-slate-200 hover:text-black hover:border-slate-200 transition-all rounded-lg px-4 py-2"
        @click="handleClearError"
      >
        Go Home...
      </button>
    </section>
  </div>
</template>
