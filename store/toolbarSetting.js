import { defineStore } from "pinia";
import { reactive, computed } from "vue";

export const useToolbarSettingStore = defineStore("toolbarSetting", () => {
    const state = reactive({
        mode: "date",
        collection: "APOD",
        date: new Date(),
        range: initRange(),
    });
 
    const returnMode = computed(() => state.mode);
    const returnCollection = computed(() => state.collection);
    const returnDate = computed(() => state.date);
    const returnRange = computed(() => state.range);

    function initRange() {
        const date7DayAgo = new Date();
        date7DayAgo.setDate(date7DayAgo.getDate() - 7);
        return [date7DayAgo, new Date()];
    }
    const changeMode = (mode) => {
        state.mode = mode;
    };

    const changeDate = (date) => {
        state.date = date;
    };

    const changeRange = (range) => {
        state.range = range;
    };

    const changeCollection = (collection) => {
        state.collection = collection;
    };

    return {
        changeMode,
        changeCollection,
        returnMode,
        returnCollection,
        returnDate,
        returnRange,
    };
});