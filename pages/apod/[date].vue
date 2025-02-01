<script setup>
import { format } from "date-fns";
const { date } = useRoute().params;

const apodStore = useApodStore();
const loading = computed(() => apodStore.returnLoading);
const error = computed(() => apodStore.returnError);
const currentApod = computed(() => apodStore.returnCurrentApod);

watch(
  () => error.value,
  (error) => {
    if (error) {
      clearError({ redirect: "/" });
    }
  }
);

onMounted(async () => {
  await apodStore.getApodItem(date);
});

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
  <div class="sm:mx-10">
    <article v-if="!loading && currentApod">
      <section>
        <h1 class="text-2xl font-bold">{{ currentApod.title }}</h1>
        <p class="my-4 text-sm">{{ returnFormatDate(currentApod.date) }}</p>
      </section>
      <section class="flex flex-col items-center">
        <NuxtImg
          v-if="currentApod.media_type === 'image'"
          fit="cover"
          class="my-4 max-w-93 sm:max-w-lg"
          :src="currentApod?.url"
          format="webp"

          :alt="currentApod.title"
          loading="lazy"
          placeholder="/images/fallbackImage.svg"
        />
        <div v-if="currentApod.media_type === 'video'">
          <ScriptYouTubePlayer
            :video-id="getYoutubeId(currentApod?.url)"
            style="width: 300px;"
            class="relative sm:hidden !aspect-video [&>img]:aspect-video [&>img]:object-cover [&>div]:aspect-video !rounded-lg overflow-hidden"
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
            :video-id="getYoutubeId(currentApod?.url)"
            style="width: 600px;"
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
        </div>
        <p class="mt-8">{{ currentApod.explanation }}</p>
      </section>
      <section>
        <p>Copyright {{ currentApod.copyright }}</p>
      </section>
    </article>
    <section class="mt-16" v-if="loading">
      <LoadingComponent></LoadingComponent>
    </section>
  </div>
</template>
