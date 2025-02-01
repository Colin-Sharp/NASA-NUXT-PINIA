<script setup>
import { format } from "date-fns";
const props = defineProps({
  apod: Object,
  single: false,
});

const favoritesStore = useFavoritesStore();

const state = reactive({
  liked: favoritesStore.returnFavorites.some(
    (favorite) => favorite?.date === props.apod?.date
  ),
});

const toggleFavorite = () => {
  if (state.liked) {
    favoritesStore.addToApodFavorites(props.apod);
  } else {
    favoritesStore.removeFromApodFavorites(props.apod);
  }
};

const returnFormatDate = (date) => {
  return format(new Date(date), "MM/dd/yyyy");
};

const getYoutubeId = (url) => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
};
</script>

<template>
  <article v-if="apod">
    <div
      :class="[
        'apod-item h-full rounded border p-4 sm:p-6',
        { 'sm:p-8': single },
      ]"
    >
      <section class="text-white header">
        <h2 class="text-2xl font-bold">{{ apod.title }}</h2>
        <p>{{ returnFormatDate(apod.date) }}</p>
      </section>
      <section
        v-if="apod.media_type === 'image'"
        :class="{ 'flex flex-wrap justify-center items-center': single }"
      >
        <NuxtImg
          :src="apod.url"
          :class="['my-4 image', { 'sm:w-4/12': single }]"
          format="webp"
          loading="lazy"
          placeholder="/images/fallbackImage.svg"
          :alt="apod.title"
        />
        <p class="sm:w-8/12 pl-4" v-if="single">{{ apod.explanation }}</p>
      </section>
      <section class="flex justify-center" v-if="apod.media_type === 'video'">
        <ScriptYouTubePlayer
          :video-id="getYoutubeId(apod?.url)"
          style="width: 250px"
          :class="[
            'relative  !aspect-video [&>img]:aspect-video [&>img]:object-cover [&>div]:aspect-video !rounded-lg overflow-hidden',
            { 'sm:hidden': single },
          ]"
        >
          <template #awaitingLoad>
            <div
              class="bg-red-500 text-white rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 py-2"
            >
              Play
            </div>
          </template>
        </ScriptYouTubePlayer>
        <ScriptYouTubePlayer
          v-if="single"
          :video-id="getYoutubeId(apod?.url)"
          style="width: 600px"
          class="relative hidden sm:block !aspect-video [&>img]:aspect-video [&>img]:object-cover [&>div]:aspect-video !rounded-lg overflow-hidden"
        >
          <template #awaitingLoad>
            <div
              class="bg-red-500 text-white rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 py-2"
            >
              Play
            </div>
          </template>
        </ScriptYouTubePlayer>
      </section>
      <section class="footer">
        <NuxtLink
          :to="`/apod/${apod.date}`"
          class="border hover:bg-slate-200 hover:text-black hover:border-slate-200 transition-all rounded-lg px-4 py-2"
          >Details</NuxtLink
        >
        <LikeComponent
          :apod="apod"
          v-model:like="state.liked"
          @toggleFavorite="toggleFavorite"
        />
      </section>
    </div>
  </article>
</template>
