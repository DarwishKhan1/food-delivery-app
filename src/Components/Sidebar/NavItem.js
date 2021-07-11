import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ label, path, Icon, ...rest }) => {
  return (
    <li>
      <NavLink to={path} activeClassName="active" {...rest}>
        <span className="icon">
          <Icon />
        </span>
        <span className="list">{label}</span>
      </NavLink>
    </li>
  );
};

export default NavItem;
