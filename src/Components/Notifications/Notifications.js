import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Notifications.css";
import Input from "../Common/Input";

class Notifications extends Component {
  state = {
    title: "",
    body: "",
  };

  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  sendNotification = () => {};
  render() {
    return (
      <Sidebar>
        <div className="notifcations">
          <div className="notifcation-title">
            <h3 className="font-weight-bold">Notification</h3>
          </div>
          <Input
            name="title"
            label="Title"
            onChange={this.inputHandler}
            type="text"
            placeholder="Enter notification Title"
          />

          <div className="form-group row">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="col-sm-2 font-weight-bold"
            >
              Body
            </label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                placeholder="Enter body of notification..."
                name="body"
                onChange={this.inputHandler}
                rows="6"
              ></textarea>
            </div>
          </div>

          <div className="send-notification">
            <button
              onClick={this.sendNotification}
              className="btn btn-notification"
            >
              Send Notification
            </button>
          </div>
        </div>
      </Sidebar>
    );
  }
}

export default Notifications;
