import { defineStore } from "pinia";
import { reactive } from "vue";

export const useApodStore = defineStore("apod", () => {
  const state = reactive({
    apodCashedList: [],
    currentApod: null,
    currentRange: [],
    error: null,
    loading: false
  });

  const returnCurrentApod = computed(() => state.currentApod);
  const returnCurrentRange = computed(() => state.currentRange);
  const returnError = computed(() => state.error);
  const returnLoading = computed(() => state.loading);

  const addToApodCashedList = (apod) => {
    state.apodCashedList.push(apod);
  };

  const updateLoading = (loading) => {
    state.loading = loading;
  }

  const updateCurrentApod = (apod) => {
    state.currentApod = apod;
  };

  const updateCurrentRange = (range) => {
    state.currentRange = range;
  };

  const updateError = (error) => {
    if (error) {
      updateLoading(false)
    }
    state.error = error;
  }

  const clearError = () => {
    state.error = null;
  }

  const getApodItem = async (date) => { 
    updateLoading(true)
    if (state.apodCashedList.some((item) => item.date === date)) {
      updateCurrentApod(state.apodCashedList.find((item) => item.date === date));
      updateLoading(false)
      return;
    }
    try {
      const apod = await $fetch(`/api/apod?date=${date}`);
      addToApodCashedList(apod);
      updateCurrentApod(apod);
    } catch (error) {
      updateError(error)
    } finally {
      updateLoading(false)
    } 
  };

  const checkIfRangeExists = (startDate, endDate) => {
    const itemsInRange = state.apodCashedList.filter(
      (item) => item.date >= startDate && item.date <= endDate
    );
    const daysInARange = getDaysInARange(startDate, endDate);
    
    return itemsInRange.length === daysInARange ? itemsInRange : false;
  };

  const getApodRange = async (startDate, endDate) => {
    const rangeExists = checkIfRangeExists(startDate, endDate);
    if (rangeExists) {
      updateCurrentRange(rangeExists);
      return;
    }

    try {
      updateLoading(true)
      const apodRange = await $fetch(
        `/api/apod?start_date=${startDate}&end_date=${endDate}`
      );
      
      apodRange.forEach((apod) => {
        if (!state.apodCashedList.some((item) => item.date === apod.date))
          addToApodCashedList(apod);
      });
      updateCurrentRange(apodRange);
    } catch (error) {
      updateError(error)
    } finally {
      updateLoading(false)
    }
  };

  const getDaysInARange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  return {
    getApodItem,
    getApodRange,
    clearError,
    returnCurrentRange,
    returnCurrentApod,
    returnError,
    returnLoading
  };
});
