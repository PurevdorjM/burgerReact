import React from "react";
import css from "./style.module.css";

const Order = (props) => {
  return (
    <div className={css.Order}>
      <h2>ЗАХИАЛАГЧИЙН НЭР: {props.order.hayg.name}</h2>
      <p>
        Орц: Гахайн мах: {props.order.orts.bacon}, Салад:
        {props.order.orts.salad}, Үхрийн мах: {props.order.orts.meat}, Бяслаг:
        {props.order.orts.cheese}
      </p>
      <p>
        Хаяг: {props.order.hayg.city} {props.order.hayg.address}
      </p>
      <p>
        Үнийн дүн: <strong>{props.order.price}₮</strong>
      </p>
    </div>
  );
};

export default Order;
