import React from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

const Nav = () => {
  const data = [
    { text: "Latest", link: "/" },
    { text: "News", link: "News" },
    { text: "Sports", link: "Sports" },
    { text: "Entertainment", link: "Entertainment" },
    { text: "Music", link: "Music" },
    { text: "Movies", link: "Movies" },
  ];

  return (
    <section>
      <nav className="Nav">
        <h2>BigBen's Blog</h2>

        <div className="Search_container">
          <span>
            <BsSearch />
          </span>
          <input type="text" placeholder="Search" className="Search_input" />
        </div>

        <div>
          <button type="button" className="lightBtn">
            <span>
              {" "}
              <BiLogOut />{" "}
            </span>
            Log In
          </button>
          <button type="button" className="darkBtn">
            Sign Up
          </button>
        </div>
      </nav>
      <div className="sections">
        {data.map(({ text, link }) => {
          return (
            <Link to={link} className="links">
              {text}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Nav;
