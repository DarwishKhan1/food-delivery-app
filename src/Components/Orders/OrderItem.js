import React from "react";
import { withRouter } from "react-router-dom";

const OrderItem = ({ order, history }) => {
  const orderClicked = (id) => {
    history.push(`/orders/${id}`);
  };
  return (
    <div
      key={order.uid}
      className="orders__list__item"
      onClick={() => orderClicked(order.uid)}
    >
      <div className="row justify-content-between">
        <div>
          <span className="font-weight-bold">Order Id#</span>
          <span className="ml-2">{order.uid.substring(0, 4)}</span>
        </div>
        <div className="text-orange">
          <span className="font-weight-bold"> Price: $</span>
          <span className="strong">{order.total_price}</span>
        </div>
      </div>
      <div className="row justify-content-between">
        <div>
          <span className="font-weight-bold">Time: </span>
          <span className="strong">{order.time}</span>
        </div>
        <div>
          <span className="strong">{order.delivery_type}</span>
        </div>
      </div>
      <div className="row">
        <div>
          <span className="font-weight-bold">Customer Name: </span>
          <span className="strong">{order.customer_name}</span>
        </div>
      </div>
      <div className="row">
        <div>
          <i className="fa fa-map-marker-alt pr-2"></i>
          <span className="strong">{order.address}</span>
        </div>
      </div>
      <div className="row">
        <div>
          <span className="font-weight-bold">Status: </span>{" "}
          <span className="strong">{order.status}</span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(OrderItem);
