import React from "react";

const Select = ({ name, label, restaurants: data, ...rest }) => {
  return (
    <div className="form-group row">
      <label
        htmlFor={name}
        className="col-sm-2 col-form-label font-weight-bold"
      >
        {label}
      </label>
      <div className="col-sm-10">
        <select name={name} {...rest} className="form-control">
          <option>Search {label}</option>
          {data.map((e, i) => (
            <option key={i} value={e.uid}>
              {e.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
