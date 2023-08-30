import React, { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { auth } from "../FirebaseConfig";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, loginAuth } from "../Slices/authSlice";
import { getProfilePost } from "../Helpers/getProfilePost";
import SearchComponent from "./SearchComponent";

const Nav = () => {
  const data = [
    { text: "Latest", link: "/" },
    { text: "News", link: "News" },
    { text: "Sports", link: "Sports" },
    { text: "Entertainment", link: "Entertainment" },
    { text: "Music", link: "Music" },
    { text: "Movies", link: "Movies" },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userAuth, userData } = useSelector((store) => store.auth);

  function LogOut() {
    signOut(auth).then(() => {
      localStorage.clear();
      dispatch(loginAuth(false));
      navigate("/");
    });
  }

  

  
  // console.log(optimizedDebounce);
  // useEffect(() => {
  //   optimizedDebounce()
  // }, []);
  return (
    <section>
      <nav className="Nav">
        <SearchComponent/>
        {!userAuth ? (
          <div>
            <Link to={"Login"} className="lightBtn links">
              <span>
                <BiLogOut />
              </span>
              Log In
            </Link>
            <Link to={"SignUp"} className="darkBtn links">
              <span>
                <BiLogOut />
              </span>
              Sign UP
            </Link>
          </div>
        ) : (
          <div>
            <button type="button" className="lightBtn links" onClick={LogOut}>
              <span>
                <BiLogIn />
              </span>
              Log Out
            </button>
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
      </nav>
      <div className="sections">
        {data.map(({ text, link }) => {
          return (
            <Link to={link} className="links" key={link}>
              {text}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Nav;
