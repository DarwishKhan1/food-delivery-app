import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Order from "./Components/Orders/Order";
import Orders from "./Components/Orders/Orders";
import Restaurant from "./Components/Restaurants/Restaurant";
import Restaurants from "./Components/Restaurants/Restaurants";
import AddRestaurant from "./Components/Restaurants/AddRestaurant";
import EditRestaurant from "./Components/Restaurants/EditRestaurant";
import Dishes from "./Components/Dishes/Dishes";
import Dish from "./Components/Dishes/Dish";
import Categories from "./Components/Categories/Categories";
import AddDish from "./Components/Dishes/AddDish";
import EditDish from "./Components/Dishes/EditDish";
import Dashboard from "./Components/Dashboard/Dashboard";
import Notifications from "./Components/Notifications/Notifications";
import RestaurantOwners from "./Components/RestaurantOwners/RestaurantOwners";
import AddRestaurantOwner from "./Components/RestaurantOwners/AddRestaurantOwner";

class App extends Component {
  state = { admin: null };
  componentDidMount() {
    const admin = localStorage.getItem("admin");
    if (admin !== "undefined") {
      this.setState({ admin });
    }
  }
  render() {
    return this.state.admin ? (
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard></Dashboard>
          </Route>
          <Route exact path="/restaurant-owners">
            <RestaurantOwners></RestaurantOwners>
          </Route>
          <Route exact path="/restaurant-owners/add">
            <AddRestaurantOwner></AddRestaurantOwner>
          </Route>
          <Route exact path="/orders">
            <Orders></Orders>
          </Route>
          <Route exact path="/orders/:id">
            <Order></Order>
          </Route>
          <Route exact path="/restaurants">
            <Restaurants></Restaurants>
          </Route>
          <Route exact path="/restaurants/edit_restaurant/:id">
            <EditRestaurant></EditRestaurant>
          </Route>
          <Route exact path="/restaurants/:id">
            <Restaurant></Restaurant>
          </Route>
          <Route exact path="/restaurants/new_restaurant/add">
            <AddRestaurant></AddRestaurant>
          </Route>
          <Route exact path="/dishes">
            <Dishes></Dishes>
          </Route>
          <Route exact path="/dishes/:id">
            <Dish></Dish>
          </Route>
          <Route exact path="/dishes/new_dish/add">
            <AddDish></AddDish>
          </Route>
          <Route exact path="/dishes/edit_dish/:id">
            <EditDish></EditDish>
          </Route>
          <Route exact path="/categories">
            <Categories></Categories>
          </Route>
          <Route exact path="/notifications">
            <Notifications></Notifications>
          </Route>
        </Switch>
      </Router>
    ) : (
      <Fragment>
        <Login />
      </Fragment>
    );
  }
}

export default App;
