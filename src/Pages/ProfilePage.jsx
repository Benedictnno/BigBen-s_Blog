import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DeletePostImage, deletePost, fetchImageUrls } from "../Hooks";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const {
    userData: { uid },
  } = useSelector((store) => store.auth);

  const { getPostDatas } = useSelector((store) => store.post);
  const filteredPost = getPostDatas.filter((post) => post.uid === uid);
  useEffect(() => {
    fetchImageUrls(filteredPost, setImageUrls);
  }, [filteredPost]);

  function DeleteSinglePost(params) {}
  return (
    <div>
      <button type="button">
        <Link to={"/CreatePost"}> Create Post</Link>
      </button>
      {filteredPost?.map(
        ({ title, id, subtitle, author, imageBucket }, index) => {
          return (
            <div key={id}>
              <h1>{title}</h1>
              <h4>{subtitle}</h4>
              <img src={imageUrls[index]} alt={author} />
              <button
                type="button"
                onClick={() => {
                  deletePost(id), DeletePostImage(imageBucket);
                }}
              >
                Delete Post
              </button>
            </div>
          );
        }
      )}
    </div>
  );
};

export default ProfilePage;
