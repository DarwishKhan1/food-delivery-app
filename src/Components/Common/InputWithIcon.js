import React from "react";

const InputWithIcon = ({ Icon, name, label, ...rest }) => {
  return (
    <div className="input-group">
      <span>
        <Icon />
      </span>
      <div className="input-group-inner">
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          {...rest}
        />
      </div>
    </div>
  );
};

export default InputWithIcon;
