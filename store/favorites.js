import { defineStore } from "pinia";
import { reactive, computed } from "vue";

export const useFavoritesStore = defineStore("favorites", () => {
  const state = reactive({
    favorites: [],
  });

  const returnFavorites = computed(() => state.favorites);

  const addToApodFavorites = (favorite) => {
    if (state.favorites.some((item) => item?.date === favorite.date)) {
      return;
    }
    state.favorites.push(favorite);
    updateLocalStorage();
  };

  const removeFromApodFavorites = (favorite) => {
    const index = state.favorites.findIndex(
      (item) => item?.date === favorite?.date
    );
    state.favorites.splice(index, 1);
    updateLocalStorage();
  };

  const loadFavorites = () => {
    const localStoreFavorites = localStorage.getItem("favorites");
    if (localStoreFavorites) {
      state.favorites = JSON.parse(localStoreFavorites);
    } else {
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    }
  };

  const updateLocalStorage = () => {
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  };

  return {
    addToApodFavorites,
    removeFromApodFavorites,
    returnFavorites,
    loadFavorites,
  };
});
