import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeletePostImage, deletePost, fetchImageUrls } from "../Hooks";
import { Link, useNavigate } from "react-router-dom";
import { ProfilePageStyles } from "../Styles/ProfilePageStyles";
import { updatePost, updatePostDatas } from "../Helpers/UpdateDoc";
import { getProfilePost, profilePost } from "../Helpers/getProfilePost";
import MainCard from "../Components/MainCard";
import { profileData } from "../Slices/ProfileSlice";
import { UploadProfile } from "../Helpers/UploadProfile";

const ProfilePage = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const {
    userData: { uid },
    userData,
    userAuth,
  } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { getProfilePostData } = useSelector((store) => store.post);
  const {
    Profile: { fullName, Gender, Bio, Date },
  } = useSelector((store) => store.profile);
  const author = userData?.displayName;
  useEffect(() => {
    fetchImageUrls(getProfilePostData, setImageUrls);
    profilePost(author, dispatch);
  }, []);
  const navigate = useNavigate();

  const page = sessionStorage.getItem("ProfilePostData");
  const data = JSON.parse(page);

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;

    dispatch(profileData({ name, value }));
  }
  function handleSubmit() {
    UploadProfile(dispatch, navigate, {
      fullName,
      Gender,
      Bio,
      Date,
      uid,
      image: userData.photoURL,
    });
  }

  return (
    <ProfilePageStyles key={userData.id}>
      <div className="Profile_Container">
        <div>
          {userData?.photoURL && (
            <img src={userData?.photoURL} alt="" className="BigPhotoUrl" />
          )}
          <span>{userData?.displayName}</span>
        </div>
        <form action="" className="Profile_Form">
          <div>
            <label htmlFor="">
              FullName :{" "}
              <input
                type="text"
                disabled={userAuth ? false : true}
                name="fullName"
                value={fullName}
                onChange={handleChange}
                className="fullName"
              />
            </label>
            <label htmlFor="">
              Date of Birth :{" "}
              <input
                type="date"
                name="Date"
                value={Date}
                onChange={handleChange}
                disabled={userAuth ? false : true}
              />
            </label>
            <span>Gender : </span>

            <select
              name="Gender"
              onChange={handleChange}
              value={Gender}
              disabled={userAuth ? false : true}
              className="Selector"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              {/* <option value="Rather">Rather Not Say</option> */}
            </select>
          </div>
          <label htmlFor="">
            <span> Bio :</span>{" "}
            <textarea
              name="Bio"
              value={Bio}
              onChange={handleChange}
              cols="30"
              rows="10"
            ></textarea>
          </label>
        </form>

        <div>
          <button
            type="button"
            className="darkBtn links CreatePost"
            onClick={handleSubmit}
          >
            Upload Profile
          </button>

          <button type="button" className="lightBtn links CreatePost">
            <Link to={"/CreatePost"}>Create Post</Link>
          </button>
        </div>
      </div>

      <section className="profile_post_container">
        {data.length === 0 && (
          <>
            <h2>User haven't Made a post yet </h2>
            <button type="button" className="lightBtn links">
              <Link to={"/CreatePost"}> Create Post</Link>
            </button>
          </>
        )}
        <div className="card_container">
          {data.map((detail, index) => {
            return <MainCard key={index} {...detail} />;
          })}
        </div>
      </section>
    </ProfilePageStyles>
  );
};

export default ProfilePage;
