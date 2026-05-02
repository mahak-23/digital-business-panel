import { createSlice } from "@reduxjs/toolkit";
import { cardsData, ordersData } from "../../data/data";

const slice = createSlice({
  name: "dashboard",
  initialState: {
    cards: cardsData,
    orders: ordersData,
    stats: {
      topItem: "Office comps",
      items: 74000,
      profit: 37000,
      dailyAverage: 57348,
    },
    chart: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [28000, 19000, 32000, 18000, 41000, 30000, 26000],
    },
  },
  reducers: {
    setCards(state, action) {
      state.cards = action.payload;
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setStats(state, action) {
      state.stats = action.payload;
    },
    setChartSeries(state, action) {
      state.chart.series = action.payload;
    },
  },
});

export const { setCards, setOrders, setStats, setChartSeries } = slice.actions;
export default slice.reducer;
