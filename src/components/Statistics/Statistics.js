import React from "react";

//style
import css from "./Statistics.module.css";
import { BsArrowUpShort } from "react-icons/bs";

//child components
import StatisticalChart from "../StatisticalChart/StatisticalChart";

const Statistics = ({ stats, chart }) => {
  return (
    <div className={`${css.container} theme-container`}>
      <span className={css.title}>Overview statistics</span>

      <div className={`${css.cards} grey-container`}>
        <div>
          <div className={css.arrowIcon}>
            <BsArrowUpShort />
          </div>

          <div className={css.card}>
            <span>Top item this month</span>
            <span>{stats.topItem}</span>
          </div>
        </div>

        <div className={css.card}>
          <span>Items</span>
          <span>${stats.items.toLocaleString()}</span>
        </div>

        <div className={css.card}>
          <span>Profit</span>
          <span>${stats.profit.toLocaleString()}</span>
        </div>

        <div className={css.card}>
          <span>Daily Average</span>
          <span>${stats.dailyAverage.toLocaleString()}</span>
        </div>
      </div>

      <StatisticalChart categories={chart.categories} series={chart.series} />
    </div>
  );
};

export default Statistics;
