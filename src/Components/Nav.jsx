import { Link, useNavigate } from "react-router-dom";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getProfilePost } from "../Helpers/getProfilePost";
import SearchComponent from "./SearchComponent";
import { AiOutlineMenu } from "react-icons/ai";
import { setBurger } from "../Slices/MainCardSlice";
import Burger from "./Burger";
import { LogOut } from "../Helpers/Logout";

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
  const { open } = useSelector((store) => store.mainCard);

  return (
    <section>
      <nav className="Nav">
        <SearchComponent />

        {open && <Burger />}

        <div className="burger" onClick={() => dispatch(setBurger(true))}>
          {!open && <AiOutlineMenu />}
        </div>
        <div className="hamburger">
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
            <div>
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
      </nav>
      <div className="sections hamburger">
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
