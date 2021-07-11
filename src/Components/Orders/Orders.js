import React, { Component } from "react";
import { firestore } from "../../Firebase/FirebaseConfig";
import Sidebar from "../Sidebar/Sidebar";
import { withRouter } from "react-router-dom";
import Spinner from "../Common/Spinner";
import Select from "../Common/Select";
import OrderItem from "./OrderItem";

class Orders extends Component {
  state = { orders: [], restaurents: [], restaurent: null, loading: true };

  componentDidMount() {
    firestore
      .collection("orders")
      .get()
      .then((snapshot) => {
        if (snapshot.docs.length > 0) {
          let orders = [];
          snapshot.docs.forEach((order) => {
            orders.push({ uid: order.id, ...order.data() });
          });
          this.setState({ orders });
        }
        firestore
          .collection("restaurants")
          .get()
          .then((snapshot) => {
            let restaurents = [];
            snapshot.docs.forEach((rest) => {
              restaurents.push({ uid: rest.id, ...rest.data() });
            });
            this.setState({ restaurents, loading: false });
          })
          .catch((err) => {
            this.setState({ loading: false });
            alert(err.message);
          });
      })
      .catch((err) => {
        this.setState({ loading: false });
        alert(err.message);
      });
  }

  handleChange = (e) => {
    this.setState({
      restaurent: e.target.value,
    });
  };

  render() {
    const { orders: allOrders, restaurent, loading } = this.state;

    let filterdOrders = allOrders;
    if (restaurent) {
      filterdOrders = allOrders.filter(
        (order) => order.restaurant_id === restaurent
      );
    }
    return (
      <Sidebar>
        {loading ? (
          <Spinner />
        ) : (
          <div className="orders__list mb-5">
            <div className="mt-3 px-2">
              <Select
                name="restaurent"
                label="Select Resturant:"
                restaurants={this.state.restaurents}
                onChange={this.handleChange}
              />
            </div>
            {filterdOrders.map((order) => (
              <OrderItem order={order} key={order.uid} />
            ))}
          </div>
        )}
      </Sidebar>
    );
  }
}

export default withRouter(Orders);
