<script setup>
const favoritesStore = useFavoritesStore();
const apodStore = useApodStore();
const apodError = computed(() => apodStore.returnError);

onMounted(() => {
  favoritesStore.loadFavorites();
  window.scrollTo(0, 0, { behavior: "smooth" });
});
</script>
<template>
  <div>
    <div class="wrapper">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <header>
        <nav
          class="flex justify-between p-4 border-b border-l-rose-200 text-white"
        >
          <NuxtLink to="/">NASA</NuxtLink>
          <ul class="flex space-x-4">
            <li>
              <NuxtLink to="/">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/favorites">Favorites</NuxtLink>
            </li>
          </ul>
        </nav>
      </header>
      <main class="px-4 my-8 max-w-screen-lg mx-auto">
        <slot />
      </main>
      <ToastComponent
        :show="!!apodError"
        :statusCode="apodError?.statusCode"
        :message="apodError?.statusMessage"
      ></ToastComponent>
    </div>
  </div>
</template>

<style>
.router-link-exact-active {
  font-weight: bold;
  color: #f6e84c;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
