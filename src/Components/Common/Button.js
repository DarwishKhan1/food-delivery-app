import React from "react";

const Button = ({ Icon = null, label, ...rest }) => {
  return (
    <button {...rest}>
      {Icon && (
        <span style={{ fontSize: "25px" }}>
          <Icon />
        </span>
      )}
      <span className="ml-1">{label}</span>
    </button>
  );
};

export default Button;
