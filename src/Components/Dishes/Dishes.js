import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { withRouter, Link } from "react-router-dom";
import Spinner from "../Common/Spinner";
import { deleteDish, getDishes, getRestaurants } from "../Common/Firebase";
import AddDish from "../../Assets/adddish.svg";
import { FiChevronsRight } from "react-icons/fi";
import Select from "../Common/Select";
import Input from "../Common/Input";

class Dishes extends Component {
  state = {
    dishes: [],
    restaurents: [],
    restaurent: null,
    loading: true,
    name: "",
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const restaurents = await getRestaurants();
      const dishes = await getDishes();
      this.setState({
        dishes,
        restaurents,
        loading: false,
      });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  }

  handleChange = (e) => {
    this.setState({
      restaurent: e.target.value,
    });
  };

  dishClicked = (id) => {
    this.props.history.push(`/dishes/${id}`);
  };
  delete = async (id) => {
    this.setState({ loading: true });

    try {
      await deleteDish(id);
      const dishes = this.state.dishes.filter((dish) => dish.id !== id);
      this.setState({
        dishes,
        loading: false,
      });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  };

  editDish = (id) => {
    this.props.history.push(`/dishes/edit_dish/${id}`);
  };

  render() {
    const { dishes: allDishes, restaurent, name } = this.state;

    let filterdDishes = allDishes;
    if (restaurent) {
      filterdDishes = allDishes.filter(
        (dish) => dish.restaurant === restaurent
      );
    }

    if (name) {
      const searchedDishes = filterdDishes.filter(
        (dish) =>
          dish.name &&
          dish.name.toLowerCase().includes(this.state.name.toLowerCase(), 0)
      );
      filterdDishes = searchedDishes;
    }

    return (
      <Sidebar>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <Link to="/dishes/new_dish/add" className="add__restaurant__button">
              <img src={AddDish} alt=""/>
            </Link>
            <div className="mt-3 px-2">
              <Select
                label="Select Resturant:"
                name="restaurent"
                restaurants={this.state.restaurents}
                onChange={this.handleChange}
              />
            </div>
            <div className=" mt-3 px-2">
              <Input
                label="Search Dish:"
                name="dish"
                placeholder="Search Dish By Name"
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <table className="responsive__table mb-2">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filterdDishes.map((dish) => {
                  return (
                    <tr className="table-list-item" key={dish.id}>
                      <td data-label="Image">
                        <img
                          style={{
                            width: 100,
                            height: 70,
                            borderRadius: 5,
                            objectFit: "cover",
                          }}
                          src={dish.image}
                          alt=""
                        ></img>
                      </td>
                      <td data-label="Name">{dish.name}</td>
                      <td data-label="Description">
                        {dish.description.length > 20
                          ? dish.description.substring(0, 20) + "..."
                          : dish.description.substring(0, 20)}
                      </td>
                      <td data-label="Price" className="control-text">
                        {dish.price}
                      </td>
                      <td data-label="Edit">
                        <button
                          className="btn btn-success"
                          onClick={() => this.editDish(dish.id)}
                        >
                          Edit
                        </button>
                      </td>

                      <td data-label="Delete">
                        <button
                          className="btn bg-orange"
                          onClick={() => this.delete(dish.id)}
                        >
                          Delete
                        </button>
                      </td>
                      <td
                        data-label="Details"
                        style={{ fontSize: "25px" }}
                        onClick={() => this.dishClicked(dish.id)}
                      >
                        <FiChevronsRight />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Sidebar>
    );
  }
}

export default withRouter(Dishes);
