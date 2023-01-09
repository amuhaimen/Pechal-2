import React from "react";
import { Link } from "react-router-dom";

const AuthenticationLink = ({ className, title, hreftitle, href }) => {
  return (
    <p className={className}>
      {title} <Link to={href}>{hreftitle}</Link>
    </p>
  );
};

export default AuthenticationLink;
