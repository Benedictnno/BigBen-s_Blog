import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { LogOut } from "../Helpers/Logout";
import { getProfilePost } from "../Helpers/getProfilePost";
import { setBurger } from "../Slices/MainCardSlice";
import { AiOutlineClose } from "react-icons/ai";

const Burger = () => {
  const data = [
    { text: "Latest", link: "/" },
    { text: "News", link: "News" },
    { text: "Sports", link: "Sports" },
    { text: "Entertainment", link: "Entertainment" },
    { text: "Music", link: "Music" },
    { text: "Movies", link: "Movies" },
  ];

  const { userAuth, userData } = useSelector((store) => store.auth);
  const { open } = useSelector((store) => store.mainCard);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="Res_Nav fixed">
      <div className="flex_auth">
        <div className="userAuth_container">
          {!userAuth ? (
            <div>
              <Link to={"Login"} className="lightBtn links">
                <span>
                  <BiLogOut />
                </span>
                Log In / Sign Up
              </Link>
            </div>
          ) : (
            <div className="userAuth">
              <Link
                to="ProfilePage"
                className="darkBtn links"
                onClick={() => getProfilePost(userData.uid, dispatch)}
              >
                {userData?.photoURL && (
                  <img src={userData?.photoURL} alt="" className="PhotoUrl" />
                )}
                <span>{userData?.displayName}</span>
              </Link>
            </div>
          )}
        </div>
        <div
          className="burger close"
          onClick={() => dispatch(setBurger(false))}
        >
          {open && (
            <button type="button" className="button fixed">
              <AiOutlineClose />
            </button>
          )}
        </div>
      </div>

      <div className="Nav_Link ">
        {data.map(({ text, link }) => {
          return (
            <Link
              to={link}
              className="links link"
              key={link}
              onClick={() => dispatch(setBurger(false))}
            >
              {text}
            </Link>
          );
        })}
      </div>

      {userAuth && (
        <button
          type="button"
          className="lightBtn links"
          onClick={() => LogOut(dispatch, navigate)}
        >
          <span>
            <BiLogIn />
          </span>
          Log Out
        </button>
      )}
    </div>
  );
};

export default Burger;
