import React from "react";

const LoginButton = ({ loading, login }) => {
  return (
    <div className="login_button">
      <button onClick={login} type="button" className="btn">
        {loading ? (
          <span className="spinner-grow spinner-grow-sm"></span>
        ) : (
          "Login"
        )}
      </button>
    </div>
  );
};

export default LoginButton;
