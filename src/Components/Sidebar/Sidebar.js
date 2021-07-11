import React, { Component } from "react";
import "./Sidebar.css";
import logo from "../../Assets/logo.png";
import { FaHome, FaUserTie } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { BiDish, BiListCheck } from "react-icons/bi";
import { GoChecklist } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import { IoNotificationsSharp } from "react-icons/io5";
import NavItem from "./NavItem";

class Sidebar extends Component {
  state = { active: false };

  componentDidMount() {
    const expanded = localStorage.getItem("expanded");
    if (expanded) {
      expanded === "true"
        ? this.setState({ active: true })
        : this.setState({ active: false });
    }
  }
  logout = () => {
    const logout = window.confirm("Are you sure you want to logout?");
    if (logout) {
      localStorage.removeItem("admin");
      window.location.replace("/");
    }
  };

  handleActive = () => {
    this.setState({
      active: !this.state.active,
    });
    localStorage.setItem("expanded", !this.state.active);
  };

  render() {
    return (
      <div className={this.state.active ? "wrapper active" : "wrapper"}>
        <div className="main_body">
          <div className="sidebar_menu">
            <div className="inner__sidebar_menu">
              <ul>
                <div className="main_logo">
                  <img src={logo} alt="" />
                  <h4>Food Delivery</h4>
                </div>
                <NavItem path="/" exact Icon={FaHome} label="Dashboard" />
                <NavItem
                  path="/restaurant-owners"
                  Icon={FaUserTie}
                  label="Restaurant Owners"
                />
                <NavItem path="/orders" Icon={GoChecklist} label="Orders" />
                <NavItem
                  path="/restaurants"
                  Icon={MdRestaurantMenu}
                  label="Restaurants"
                />
                <NavItem path="/dishes" Icon={BiDish} label="Dishes" />
                <NavItem
                  exact
                  path="/categories"
                  Icon={BiListCheck}
                  label="Categories"
                />
                <NavItem
                  exact
                  path="/notifications"
                  Icon={IoNotificationsSharp}
                  label="Notifications"
                />

                <li>
                  <div onClick={this.logout}>
                    <span className="icon">
                      <FiLogOut />
                    </span>
                    <span className="list">Logout</span>
                  </div>
                </li>
              </ul>

              <div className="hamburger" onClick={this.handleActive}>
                <div className="inner_hamburger">
                  <span className="arrow">
                    <i className="fas fa-long-arrow-alt-left"></i>
                    <i className="fas fa-long-arrow-alt-right"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="container">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
