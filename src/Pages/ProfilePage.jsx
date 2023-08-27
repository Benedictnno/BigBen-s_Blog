import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeletePostImage, deletePost, fetchImageUrls } from "../Hooks";
import { Link, useNavigate } from "react-router-dom";
import { ProfilePageStyles } from "../Styles/ProfilePageStyles";
import { updatePost, updatePostDatas } from "../Helpers/UpdateDoc";
import { getProfilePost } from "../Helpers/getProfilePost";

const ProfilePage = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const {
    userData: { uid },
    userData,
  } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { getProfilePostData } = useSelector((store) => store.post);

  // const filteredPost = getPostDatas.filter(+(post) => post.uid === uid);

  useEffect(() => {
    fetchImageUrls(getProfilePostData, setImageUrls);
    getProfilePost(uid, dispatch);
  }, []);
  const navigate = useNavigate();

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
      {getProfilePostData.map(
        (
          { title, id, subtitle, author, paragraphs, imageBucket, category },
          index
        ) => {
          return (
            <div key={id} className="singlePostDetail_container">
              <img src={imageUrls[index]} alt={author} />
              <div className="singlePostDetail">
                <h3>{title}</h3>
                <h4>{subtitle}</h4>
                <button
                  type="button"
                  onClick={() => {
                    deletePost(id, "blog-posts"),
                      deletePost(id, "blog-posts"),
                      DeletePostImage(imageBucket);
                  }}
                  className="darkBtn"
                >
                  Delete Post
                </button>
                <button
                  type="button"
                  className="lightBtn"
                  onClick={() => {
                    updatePostDatas(
                      {
                        title,
                        id,
                        subtitle,
                        paragraphs,
                        imageUrls,
                        category,
                      },
                      dispatch,
                      navigate
                    );
                  }}
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
