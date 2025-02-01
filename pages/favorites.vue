<script setup>
const favoritesStore = useFavoritesStore();
const favorites = computed(() => favoritesStore.returnFavorites);
</script>
<template>
  <div>
    <section v-if="favorites" class="flex flex-wrap">
      <ApodComponent
        class="w-full md:w-6/12 p-2 lg:w-4/12"
        v-for="favorite in favorites"
        :key="favorite?.date"
        :apod="favorite"
      >
      </ApodComponent>
    </section>
    <section class="mt-8" v-if="!favorites">
      <LoadingComponent></LoadingComponent>
    </section>
    <section
      v-if="favorites && !favorites.length"
      class="flex flex-col gap-5 mt-8 justify-center items-center"
    >
      <h1 class="text-center text-3xl font-bold">No favorites right now</h1>
      <NuxtImg
        src="/images/fallbackImage.svg"
        width="200"
        class="rounded-full mb-4"
        placeholder="/images/fallbackImage.svg"
        alt="nasa"
      ></NuxtImg>
      <NuxtLink
        to="/"
        class="text-3xl border hover:bg-slate-200 hover:text-black hover:border-slate-200 transition-all rounded-lg px-4 py-2"
      >
        Go back home
      </NuxtLink>
    </section>
  </div>
</template>
