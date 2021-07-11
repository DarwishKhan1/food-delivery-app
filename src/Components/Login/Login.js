import React, { Component } from "react";
import Logo from "../../Assets/logo.png";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { signInAdmin } from "../Common/Firebase";
import InputWithIcon from "./../Common/InputWithIcon";
import LoginButton from "./LoginButton";
class Login extends Component {
  state = { loading: false, email: "", password: "" };
  
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setLoading = () => {
    this.setState({
      loading: !this.state.loading,
    });
  };

  login = async () => {
    this.setLoading();
    try {
      await signInAdmin(this.state.email, this.state.password);
      window.location.reload("/");
      this.setLoading();
    } catch (error) {
      this.setLoading();
      alert(error.message);
    }
  };
  render() {
    return (
      <div className="login__background">
        <div className="login__container">
          <div>
            <div className="app__logo">
              <img src={Logo} alt=""/>
            </div>
            <form className="login__form">
              <h2>Admin Login</h2>

              <InputWithIcon
                Icon={HiOutlineMail}
                name="email"
                label="Email ID"
                onChange={(e) => this.handleChange(e)}
                type="email"
                placeholder="youremail@gmail.com"
              />
              <InputWithIcon
                Icon={RiLockPasswordLine}
                name="password"
                label="Password"
                onChange={(e) => this.handleChange(e)}
                type="password"
                placeholder="********"
              />

              <LoginButton loading={this.state.loading} login={this.login} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
