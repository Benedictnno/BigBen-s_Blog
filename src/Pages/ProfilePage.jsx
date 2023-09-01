import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeletePostImage, deletePost, fetchImageUrls } from "../Hooks";
import { Link, useNavigate } from "react-router-dom";
import { ProfilePageStyles } from "../Styles/ProfilePageStyles";
import { updatePost, updatePostDatas } from "../Helpers/UpdateDoc";
import { getProfilePost, profilePost } from "../Helpers/getProfilePost";
import MainCard from "../Components/MainCard";

const ProfilePage = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const {
    userData: { uid },
    userData,
    userAuth,
  } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { getProfilePostData } = useSelector((store) => store.post);
  const author = userData?.displayName;
  // const filteredPost = getPostDatas.filter(+(post) => post.uid === uid);
  profilePost;
  useEffect(() => {
    fetchImageUrls(getProfilePostData, setImageUrls);
    profilePost(author, dispatch);
  }, [getProfilePostData]);
  const navigate = useNavigate();

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
                className="fullName"
              />
            </label>

            <label htmlFor="">
              Date of Birth :{" "}
              <input type="date" disabled={userAuth ? false : true} />
            </label>
            <span>Gender : </span>
            <select name="" id="" disabled={userAuth ? false : true}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Rather">Rather Not Say</option>
            </select>
          </div>
          <label htmlFor="">
            <span> Bio :</span>{" "}
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </label>
        </form>
        <div>
          <button type="button" className="darkBtn links CreatePost">
            Upload Profile
          </button>

          <button type="button" className="lightBtn links CreatePost">
            <Link to={"/CreatePost"}> Create Post</Link>
          </button>
        </div>
      </div>

      <section className="profile_post_container">
        {getProfilePostData.length === 0 ? (
          <>
            <h2>You haven't Made a post yet </h2>
            <button type="button" className="lightBtn links">
              <Link to={"/CreatePost"}> Create Post</Link>
            </button>
          </>
        ) : // <h2>Your Post</h2>
        null}
        {getProfilePostData.map((detail, index) => {
          return <MainCard key={index} {...detail} />;
        })}
      </section>
    </ProfilePageStyles>
  );
};

export default ProfilePage;
