import React, { Component } from "react";
import Spinner from "../Common/Spinner";
import {
  deleteRestaurant,
  getLimitedRestaurants,
  getMoreRestaurants,
} from "../Common/Firebase";
import Sidebar from "../Sidebar/Sidebar";
import { withRouter, Link } from "react-router-dom";
import { FiChevronsRight } from "react-icons/fi";
import { VscFoldDown } from "react-icons/vsc";
import AddRestaurant from "../../Assets/restauranticon.png";

class Restaurants extends Component {
  state = { restaurents: [], loading: true, limit: 5, lastRestaurant: 0 };

  async componentDidMount() {
    try {
      const result = await getLimitedRestaurants(this.state.limit);
      this.setState({
        restaurents: result.restaurants,
        loading: false,
        lastRestaurant: result.lastRestaurant,
      });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  }

  restaurantClicked = (id) => {
    this.props.history.push(`/restaurants/${id}`);
  };

  editRestaurant = (id) => {
    this.props.history.push(`/restaurants/edit_restaurant/${id}`);
  };

  delete = async (id) => {
    try {
      this.setState({
        loading: true,
      });
      await deleteRestaurant(id);
      const restaurents = this.state.restaurents.filter(
        (rest) => rest.restaurant_id !== id
      );
      this.setState({
        loading: false,
        restaurents,
      });
    } catch (error) {
      this.setState({
        loading: false,
      });
      alert(error.message);
    }
  };

  fetchMore = async () => {
    try {
      const result = await getMoreRestaurants(
        this.state.limit,
        this.state.lastRestaurant
      );
      const oldRestaurants = [...this.state.restaurents];
      this.setState({
        restaurents: [...oldRestaurants, ...result.restaurants],
        loading: false,
        lastRestaurant: result.lastRestaurant,
      });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  };
  render() {
    return (
      <Sidebar>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <table className="responsive__table mb-2">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.restaurents.map((restaurant) => {
                  return (
                    <tr
                      className="table-list-item"
                      key={restaurant.restaurant_id}
                    >
                      <td data-label="Image">
                        <img
                          style={{
                            width: 100,
                            height: 70,
                            borderRadius: 5,
                            objectFit: "cover",
                          }}
                          src={restaurant.image}
                          alt=""
                        ></img>
                      </td>
                      <td data-label="Name">{restaurant.name}</td>
                      <td data-label="Address" className="control-text">
                        {restaurant.address}
                      </td>
                      <td data-label="Phone" className="control-text">
                        {restaurant.phone}
                      </td>
                      <td data-label="Edit">
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            this.editRestaurant(restaurant.restaurant_id)
                          }
                        >
                          Edit
                        </button>
                      </td>

                      <td data-label="Delete">
                        <button
                          className="btn bg-orange"
                          onClick={() => this.delete(restaurant.restaurant_id)}
                        >
                          Delete
                        </button>
                      </td>
                      <td
                        data-label="Details"
                        style={{ fontSize: "25px" }}
                        onClick={() =>
                          this.restaurantClicked(restaurant.restaurant_id)
                        }
                      >
                        <FiChevronsRight />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Link
              to="/restaurants/new_restaurant/add"
              className="add__restaurant__button"
            >
              <img src={AddRestaurant} alt=""/>
            </Link>

            <div className="text-center pb-3">
              <button onClick={this.fetchMore} className="btn btn-primary px-3">
                <VscFoldDown />
              </button>
            </div>
          </div>
        )}
      </Sidebar>
    );
  }
}

export default withRouter(Restaurants);
