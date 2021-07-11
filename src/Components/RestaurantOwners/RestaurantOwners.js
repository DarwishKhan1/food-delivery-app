import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Spinner from "../Common/Spinner";
import Sidebar from "../Sidebar/Sidebar";
import { getRestaurantOwners } from "./../Common/Firebase";
import { BiUserPlus } from "react-icons/bi";
import Button from "../Common/Button";
import Input from "../Common/Input";

class RestaurantOwners extends Component {
  state = { loading: false, firstName: "", owners: [] };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    try {
      const restaurantOwners = await getRestaurantOwners();
      this.setState({
        loading: false,
        owners: restaurantOwners,
      });
    } catch (error) {
      this.setState({
        loading: false,
      });
      alert(error.message);
    }
  }

  createRestaurantOwner = () => {
    this.props.history.push("/restaurant-owners/add");
  };
  render() {
    const { loading, owners, firstName } = this.state;
    let filterRestaurantOwners = owners;

    if (firstName !== "") {
      filterRestaurantOwners = owners.filter(
        (owner) =>
          owner.first_name &&
          owner.first_name
            .toLowerCase()
            .includes(this.state.firstName.toLowerCase(), 0)
      );
    }
    return (
      <Sidebar>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="row">
              <div className="col-md-8 mt-2">
                <Input
                  label="Search Owner:"
                  name="firstname"
                  placeholder="Search Owner By First Name"
                  onChange={(e) => this.setState({ firstName: e.target.value })}
                />
              </div>
              <div className="col-md-4">
                <Button
                  Icon={BiUserPlus}
                  label={" Create Restaurant Owner"}
                  className="btn btn-outline-primary btn-block mb-3"
                  onClick={this.createRestaurantOwner}
                />
              </div>
            </div>
            <table className="responsive__table mb-5">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {filterRestaurantOwners.map((owner) => {
                  return (
                    <tr className="table-list-item" key={owner.user_id}>
                      <td data-label="Image">
                        <img
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 50,
                            objectFit: "cover",
                          }}
                          src={owner.profile_image}
                          alt=""
                        ></img>
                      </td>
                      <td data-label="Name">
                        {owner.first_name + " " + owner.last_name}
                      </td>
                      <td data-label="Email" className="control-text">
                        {owner.email}
                      </td>
                      <td data-label="Email" className="control-text">
                        {owner.phone}
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

export default withRouter(RestaurantOwners);
