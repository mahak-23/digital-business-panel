import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import css from "./Dashboard.module.css";
import Statistics from "../../components/Statistics/Statistics";
import Orders from "../../components/Orders/Orders";

const rangeOptions = {
  week: {
    cards: [
      { title: "Revenue", change: 24, amount: 42056 },
      { title: "Orders", change: -14, amount: 52125.03 },
      { title: "Expenses", change: 18, amount: 1216.5 },
      { title: "Profit", change: 12, amount: 10125.0 },
    ],
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
    orders: [
      { name: "Skateboard", type: "Illustration", items: 58, change: 290 },
      { name: "Language courses", type: "Illustration", items: 12, change: 72 },
      { name: "Office Collaboration", type: "Illustration", items: 7, change: 70 },
      { name: "Robot", type: "Illustration", items: 21, change: 15 },
    ],
  },
  month: {
    cards: [
      { title: "Revenue", change: 32, amount: 132560 },
      { title: "Orders", change: 8, amount: 152125.03 },
      { title: "Expenses", change: 14, amount: 4316.5 },
      { title: "Profit", change: 22, amount: 43125.0 },
    ],
    stats: {
      topItem: "Office comps",
      items: 112000,
      profit: 76000,
      dailyAverage: 62348,
    },
    chart: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      series: [90000, 98000, 110000, 104000],
    },
    orders: [
      { name: "Skateboard", type: "Illustration", items: 112, change: 450 },
      { name: "Language courses", type: "Illustration", items: 32, change: 120 },
      { name: "Office Collaboration", type: "Illustration", items: 14, change: 120 },
      { name: "Robot", type: "Illustration", items: 44, change: 38 },
    ],
  },
  year: {
    cards: [
      { title: "Revenue", change: 68, amount: 820560 },
      { title: "Orders", change: 42, amount: 512125.03 },
      { title: "Expenses", change: 22, amount: 18116.5 },
      { title: "Profit", change: 35, amount: 210125.0 },
    ],
    stats: {
      topItem: "Office comps",
      items: 312000,
      profit: 220000,
      dailyAverage: 72348,
    },
    chart: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      series: [42000, 46000, 52000, 54000, 62000, 68000, 74000, 78000, 82000, 86000, 90000, 94000],
    },
    orders: [
      { name: "Skateboard", type: "Illustration", items: 320, change: 980 },
      { name: "Language courses", type: "Illustration", items: 92, change: 320 },
      { name: "Office Collaboration", type: "Illustration", items: 44, change: 240 },
      { name: "Robot", type: "Illustration", items: 121, change: 110 },
    ],
  },
};

const Dashboard = () => {
  const cards = useSelector((state) => state.dashboard.cards);
  const stats = useSelector((state) => state.dashboard.stats);
  const chart = useSelector((state) => state.dashboard.chart);
  const orders = useSelector((state) => state.dashboard.orders);
  const [range, setRange] = useState("week");

  const rangeData = useMemo(
    () => rangeOptions[range] ?? rangeOptions.week,
    [range]
  );

  return (
    <div className={css.page}>
      <section className={css.hero}>
        <div className={css.heroText}>
          <p className={css.eyebrow}>Overview</p>
          <h1 className={css.title}>Dashboard</h1>
          <p className={css.lede}>
            Revenue, orders, and pipeline metrics at a glance. Period compares to
            last cycle.
          </p>
        </div>
        <div className={css.periodWrap}>
          <label className={css.periodLabel} htmlFor="dash-period">
            Range
          </label>
          <select
            id="dash-period"
            className={css.periodSelect}
            value={range}
            onChange={(event) => setRange(event.target.value)}
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="year">Last 12 months</option>
          </select>
        </div>
      </section>

      <section className={css.kpiGrid}>
        {(rangeData.cards.length ? rangeData.cards : cards).map((card) => (
          <article key={card.title} className={css.kpiCard}>
            <div className={css.kpiHeader}>
              <span className={css.kpiTitle}>{card.title}</span>
              <span
                className={
                  card.change >= 0 ? css.kpiDeltaPos : css.kpiDeltaNeg
                }
              >
                {card.change >= 0 ? "+" : ""}
                {card.change}%
              </span>
            </div>
            <div className={css.kpiAmount}>
              <span className={css.kpiCurrency}>$</span>
              <span>{card.amount.toLocaleString()}</span>
            </div>
          </article>
        ))}
      </section>

      <div className={css.lower}>
        <div className={css.statsColumn}>
          <Statistics stats={rangeData.stats || stats} chart={rangeData.chart || chart} />
        </div>
        <aside className={css.ordersColumn}>
          <Orders orders={rangeData.orders || orders} />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
