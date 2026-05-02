import React from "react";

//style
import css from "./Orders.module.css";

//child components
import OrdersPieChart from "../OrdersPieChart/OrdersPieChart";

const Orders = ({ orders }) => {
  const totalItems = orders.reduce((sum, item) => sum + Number(item.items || 0), 0);

  return (
    <div className={`${css.container} theme-container`}>
      <div className={css.head}>
        <img src="./logo.png" alt="Logo" />
        <span>Orders today</span>
      </div>

      <div className={`grey-container  ${css.stat}`}>
        <span>Amount</span>
        <span>${totalItems.toLocaleString()}</span>
      </div>

      <div className={css.orders}>
        {orders.map((order) => (
          <div key={order.name} className={css.order}>
            <div>
              <span>{order.name}</span>
              <span>{order.change}</span>
            </div>

            <div>
              <span>{order.type}</span>
              <span>{order.items}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={css.orderChars}>
        <span>Split by orders</span>
        <OrdersPieChart orders={orders} />
      </div>
    </div>
  );
};

export default Orders;
