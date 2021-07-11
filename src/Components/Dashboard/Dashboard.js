import React, { Component } from "react";
import { getDishes, getOrders, getRestaurants } from "../Common/Firebase";
import Spinner from "../Common/Spinner";
import Sidebar from "../Sidebar/Sidebar";
import CardItem from "./CardItem";
import RevenuChart from "./RevenuChart";

class Dashboard extends Component {
  state = {
    loading: false,
    orders: [],
    restaurants: 0,
    dishes: 0,
  };

  getEarnings = (orders) => {
    let total = 0;
    orders.forEach((order) => {
      total = total + parseInt(order.total_price);
    });
    return total;
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const orders = await getOrders();
      const rest = await getRestaurants();
      const dishes = await getDishes();
      this.setState({
        orders,
        restaurants: rest.length,
        dishes: dishes.length,
        loading: false,
      });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  }
  render() {
    return (
      <Sidebar>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="text-center mt-2 mb-3">
              <h3>Dashboard</h3>
            </div>
            <div className="row">
              <CardItem
                title="Total Earnings"
                value={"$" + this.getEarnings(this.state.orders)}
                bgcolor="bg-purple"
              />
              <CardItem
                title="Orders"
                value={this.state.orders.length}
                bgcolor="bg-orange"
              />
            </div>
            <div className="row">
              <CardItem
                title="Total Restaurants"
                value={this.state.restaurants}
                bgcolor="bg-green"
              />
              <CardItem
                title="Total Dishes"
                value={this.state.dishes}
                bgcolor="bg-blue"
              />
            </div>

            <RevenuChart orders={this.state.orders} />
          </div>
        )}
      </Sidebar>
    );
  }
}

export default Dashboard;
