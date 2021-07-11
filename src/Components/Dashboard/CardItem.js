import React from "react";

const CardItem = ({ title, value, bgcolor }) => {
  return (
    <div className="col-md-6">
      <div className={`dash__card ${bgcolor}`}>
        <p className="font-weight-bold">{value}</p>
        <span className="font-weight-bold">{title}</span>
      </div>
    </div>
  );
};

export default CardItem;
