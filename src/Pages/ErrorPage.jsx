import React from "react";
import Not_found from "../Images/Not_found.svg";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  Link;
  return (
    <div className="ErrorPage_container">
      <div>
        <h1>Page Not Found</h1>
        <button type="button" className="links  lightBtn">
          <Link to={"/"}>Go Back Home</Link>
        </button>
      </div>
      <img src={Not_found} alt="" />
    </div>
  );
};

export default ErrorPage;
