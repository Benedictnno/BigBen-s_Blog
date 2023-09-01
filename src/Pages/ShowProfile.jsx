import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeletePostImage, deletePost, fetchImageUrls } from "../Hooks";
import { Link, useNavigate } from "react-router-dom";
import { ProfilePageStyles } from "../Styles/ProfilePageStyles";
import { getProfilePost, profilePost } from "../Helpers/getProfilePost";
import MainCard from "../Components/MainCard";

const ShowProfile = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const {
    userData: { uid },
    userData,
    userAuth,
  } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { getProfilePostData } = useSelector((store) => store.post);
  const { author } = useSelector((store) => store.profile);

  console.log(getProfilePostData);
  useEffect(() => {
    profilePost(author, dispatch);
    fetchImageUrls(getProfilePostData, setImageUrls);
  }, []);
  const navigate = useNavigate();

  return (
    <ProfilePageStyles key={userData.id}>
      {/* <div className="Profile_Container">
        <div>
          {userData?.photoURL && (
            <img src={userData?.photoURL} alt="" className="BigPhotoUrl" />
          )}
          <span>{userData?.displayName}</span>
        </div>
    

          <button type="button" className="lightBtn links CreatePost">
            <Link to={"/CreatePost"}> Create Post</Link>
          </button>
    
      </div> */}

      <section className="profile_post_container">
        {getProfilePostData.length === 0 && (
          <>
            <h2>You haven't Made a post yet </h2>
            <button type="button" className="lightBtn links">
              <Link to={"/CreatePost"}> Create Post</Link>
            </button>
          </>
        )}
        {getProfilePostData.map((detail, index) => {
          return <MainCard key={index} {...detail} />;
        })}
      </section>
    </ProfilePageStyles>
  );
};

export default ShowProfile;
