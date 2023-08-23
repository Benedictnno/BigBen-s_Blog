import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DeletePostImage, deletePost, fetchImageUrls } from "../Hooks";
import { Link } from "react-router-dom";
import { ProfilePageStyles } from "../Styles/ProfilePageStyles";

const ProfilePage = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const {
    userData: { uid },
    userData,
  } = useSelector((store) => store.auth);

  const { getPostDatas } = useSelector((store) => store.post);
  const filteredPost = getPostDatas.filter((post) => post.uid === uid);
  useEffect(() => {
    fetchImageUrls(filteredPost, setImageUrls);
  }, [filteredPost]);
ProfilePageStyles
  return (
    <ProfilePageStyles>
      <button type="button">
        <Link to={"/CreatePost"}> Create Post</Link>
      </button>
      <div>
        {userData?.photoURL && (
          <img src={userData?.photoURL} alt="" className="BigPhotoUrl" />
        )}
        <span>{userData?.displayName}</span>
      </div>

      <h2>Your Post</h2>
      {filteredPost?.map(
        ({ title, id, subtitle, author, imageBucket }, index) => {
          return (
            <div key={id} className="singlePostDetail_container">
              <img src={imageUrls[index]} alt={author} />
              <div className="singlePostDetail">
                <h3>{title}</h3>
                <h4>{subtitle}</h4>
                <button
                  type="button"
                  onClick={() => {
                    deletePost(id), DeletePostImage(imageBucket);
                  }}
                  className="darkBtn"
                  >
                  Delete Post
                </button>
                <button
                  type="button"
                  className="lightBtn"
                  // onClick={() => {
                  //   deletePost(id), DeletePostImage(imageBucket);
                  // }}
                >
                  Edit Post
                </button>
              </div>
            </div>
          );
        }
      )}
    </ProfilePageStyles>
  );
};

export default ProfilePage;
