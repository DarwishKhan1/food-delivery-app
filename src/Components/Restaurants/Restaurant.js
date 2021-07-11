import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { withRouter } from "react-router-dom";
import Spinner from "../Common/Spinner";
import { firestore } from "../../Firebase/FirebaseConfig";
import Rating from "../Common/Rating";
import { MdCall } from "react-icons/md";
import { GoInfo } from "react-icons/go";
import { GrStatusGood } from "react-icons/gr";
import { getRestaurant, getRestaurantDishes, getRestaurantUserReviews } from "../Common/Firebase";

class Restaurant extends Component {
  state = { restaurant: null, loading: true, user_reviews: [], dishes: [] };
  async componentDidMount() {
    const restaurantId = this.props.match.params.id;
    try {
      const restaurant = await getRestaurant(restaurantId);
      const user_reviews = await getRestaurantUserReviews(restaurantId);
      const dishes = await getRestaurantDishes(restaurantId);

      this.setState({
        loading: false,
        restaurant,
        user_reviews,
        dishes
      })
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

  rendorDishses = () => {
    const dishes = this.state.dishes;

    return (
      <div className="row">
        {dishes.length > 0 ? (
          dishes.map((dish) => {
            return (
              <div className="col-sm-3 pb-2">
                <div className="singal__dish">
                  <img src={dish.image} alt=""/>

                  <div className="d-flex justify-content-between align-items-center px-2 pt-1">
                    <h6>{dish.name}</h6>
                    <h6 style={{ color: "#3d9982" }}>$ {dish.price}</h6>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12">
            <h5 className="d-flex justify-content-center align-items-center">
              <span>There is no dishes</span>
            </h5>
          </div>
        )}
      </div>
    );
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

  restaurantStatusClicked = (status, id) => {
    firestore
      .collection("restaurants")
      .doc(id)
      .update({ status: !status })
      .then((res) => {
        alert("Updated");
        const rest = { ...this.state.restaurant };
        rest.status = !status;
        this.setState({
          restaurant: rest,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  render() {
    const { loading, restaurant } = this.state;
    return (
      <Sidebar>
        {loading ? (
          <Spinner />
        ) : (
          <div className="singal__restaurant mb-5">
            <img src={restaurant.image} alt=""/>

            <div className="pl-4">
              <div className="d-flex align-items-center">
                <h3 className="pt-4">{restaurant.name}</h3>
              </div>

              <p className="text-muted">{restaurant.description}</p>

              <hr />

              <Rating
                productRating={this.getRating()}
                totalReviews={this.state.user_reviews.length}
              />

              <hr />

              <div className="d-flex align-items-center mb-2">
                <span style={{ fontSize: "30px" }}>
                  <GoInfo />
                </span>
                <h6 className="pl-3 pt-3">Restaurant Information</h6>
              </div>

              <div className="text-muted">
                <p>
                  <span style={{ fontSize: "25px", marginRight: "10px" }}>
                    <MdCall />
                  </span>
                  {restaurant.phone}
                </p>
                <p>
                  <span style={{ fontSize: "25px", marginRight: "10px" }}>
                    <MdCall />
                  </span>
                  {restaurant.mobile_phone}
                </p>
              </div>

              <hr />
              <div className="d-flex align-items-center mb-2">
                <span style={{ fontSize: "30px" }}>
                  <GrStatusGood />
                </span>
                <h6 className="pl-3 pt-3">Restaurant Status</h6>
              </div>

              <button
                className={
                  restaurant.status ? "btn success__status" : "btn bg-orange"
                }
                onClick={() =>
                  this.restaurantStatusClicked(
                    restaurant.status,
                    restaurant.uid
                  )
                }
              >
                {restaurant.status ? "Enabled" : "Disabled"}
              </button>

              <hr />
              <div className="d-flex align-items-center">
                <h4 className="pt-1">Dishes</h4>
              </div>

              {this.rendorDishses()}

              <hr />

              <div className="d-flex align-items-center">
                <h4 className="pt-1">Reviews</h4>
              </div>
              {this.rendorReviews()}
            </div>
          </div>
        )}
      </Sidebar>
    );
  }
}

export default withRouter(Restaurant);
