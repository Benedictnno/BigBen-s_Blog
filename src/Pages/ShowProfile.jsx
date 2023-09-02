import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeletePostImage, deletePost, fetchImageUrls } from "../Hooks";
import { Link, useNavigate } from "react-router-dom";
import { ProfilePageStyles } from "../Styles/ProfilePageStyles";
import { getProfilePost, profilePost } from "../Helpers/getProfilePost";
import MainCard from "../Components/MainCard";
import { getAuthorProfile } from "../Helpers/GetSinglePost";

const ShowProfile = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const {
    userData,
    userAuth,
  } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { getProfilePostData } = useSelector((store) => store.post);
  const {
    author,
    ProfileData: { fullName, Gender, Date, Bio, image },
  } = useSelector((store) => store.profile);

  useEffect(()=>{

    profilePost(author, dispatch);
    getAuthorProfile(getProfilePostData[0]?.uid, dispatch);
  },[])
 
  const navigate = useNavigate();
  return (
    <ProfilePageStyles key={getProfilePostData}>
      <div className="Profile_Container">
        <div>
          {image && <img src={image} alt="" className="BigPhotoUrl" />}
          <span>{fullName}</span>
        </div>
        <div className="authorDetails">
          <article>Bio : {Bio}</article>
          <h4>Gender: {Gender}</h4>
          <h4>Age: {Date}</h4>
        </div>
        {
          userAuth&&
        <button type="button" className="lightBtn links CreatePost">
          <Link to={"/CreatePost"}> Create Post</Link>
        </button>}
      </div>

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
