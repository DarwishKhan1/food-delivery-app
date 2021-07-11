import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { withRouter } from "react-router-dom";
import Spinner from "../Common/Spinner";
import Rating from "../Common/Rating";
import { GoInfo } from "react-icons/go";
import { IoRestaurantOutline } from "react-icons/io5";
import { MdAttachMoney, MdCall } from "react-icons/md";
import Ingradients from "../../Assets/vegetarian.svg";
import { getDish, getDishUserReviews, getRestaurant } from "../Common/Firebase";

class Dish extends Component {
  state = { dish: null, loading: true, user_reviews: [], restaurant: null };
  async componentDidMount() {
    const dishId = this.props.match.params.id;
    try {
      const dish = await getDish(dishId);
      const user_reviews = await getDishUserReviews(dishId);
      const restaurant = await getRestaurant(dish.restaurant);
      this.setState({
        dish,
        loading: false,
        user_reviews,
        restaurant,
      });
    } catch (err) {
      this.setState({ loading: false });
      alert(err.message);
    }
  }

  getRating = () => {
    let totalRating = 0;
    let totalprdrating = 0;
    const { user_reviews } = this.state;
    user_reviews.length > 0 &&
      user_reviews.map((rat, i) => {
        totalprdrating = i + 1;
        return (totalRating = totalRating + parseFloat(rat.stars));
      });

    if ((totalRating / totalprdrating).toString() === "NaN") {
      return 0;
    } else {
      return totalRating / totalprdrating;
    }
  };

  rendorReviews = () => {
    const { user_reviews } = this.state;
    return user_reviews.length > 0 ? (
      user_reviews.map((rev) => (
        <div className="singal__review">
          <img src={rev.user_image} className="rounded-circle" alt=""/>
          <div className="pl-2 pt-3">
            <div className="d-flex align-items-center">
              <h6 className="font-weight-bold pt-2 pr-2">{rev.user_name}</h6>
              <span>
                <i style={{ color: "#f0ad4e" }} className="fa fa-star pr-2"></i>
                {rev.stars}
              </span>
            </div>

            <p>{rev.review}</p>
          </div>
        </div>
      ))
    ) : (
      <h5 className="d-flex justify-content-center align-items-center">
        <span>There is no reviews</span>
      </h5>
    );
  };

  rendorIngredients = (ingredient) => {
    const ingredientArray = ingredient.split(",");
    return ingredientArray.map((ing, index) => {
      return (
        <li key={index} className="pl-5">
          {ing}
        </li>
      );
    });
  };
  render() {
    const { loading, dish, restaurant } = this.state;
    return (
      <Sidebar>
        {loading ? (
          <Spinner />
        ) : (
          <div className="singal__restaurant mb-5">
            <img src={dish.image} alt=""/>

            <div className="pl-4  pt-4">
              <div className="d-flex align-items-center">
                <span style={{ fontSize: "30px" }}>
                  <IoRestaurantOutline />
                </span>
                <h3 className="pt-3 pl-2">{dish.name}</h3>
              </div>
              <div className="d-flex align-items-center pt-2">
                <p>
                  <span className="font-weight-bold pr-2"> Category Name:</span>
                  {dish.menu}
                </p>
              </div>

              <div className="d-flex align-items-center">
                <p>
                  <span className="font-weight-bold pr-2">
                    Restaurant Name:
                  </span>
                  {restaurant ? restaurant.name : "Restaurant Deleted"}
                </p>
              </div>

              <p className="text-muted">{dish.description}</p>
              <p>
                <span style={{ fontSize: "25px" }}>
                  <MdAttachMoney />
                </span>
                {dish.price}
              </p>

              <hr />

              <Rating
                productRating={this.getRating()}
                totalReviews={this.state.user_reviews.length}
              />

              <hr />

              <div className="d-flex align-items-center">
                <img
                  src={Ingradients}
                  style={{ width: "30px", height: "30px" }}
                  alt=""
                />
                <h5 className="pl-3 pt-2 font-weight-bold">Ingredients</h5>
              </div>
              <ul className="list-group">
                {this.rendorIngredients(dish.ingredient)}
              </ul>
              <hr />

              <div className="d-flex align-items-center mb-2">
                <span style={{ fontSize: "30px" }}>
                  <GoInfo />
                </span>
                <h5 className="pl-3 pt-3 font-weight-bold">
                  Contact Information
                </h5>
              </div>
              <div className="text-muted">
                <p>
                  <span style={{ fontSize: "25px", marginRight: "10px" }}>
                    <MdCall />
                  </span>
                  {restaurant.mobile_phone}
                </p>
                <p>
                  <span style={{ fontSize: "25px", marginRight: "10px" }}>
                    <MdCall />
                  </span>
                  {restaurant.mobile_phone}
                </p>
              </div>

              <hr />

              <div className="d-flex align-items-center">
                <h4 className="pt-1 font-weight-bold">Reviews</h4>
              </div>

              {this.rendorReviews()}
            </div>
          </div>
        )}
      </Sidebar>
    );
  }
}

export default withRouter(Dish);