import React, { useEffect, useState } from "react";
import { DeletePostImage, deletePost, fetchImageUrls } from "../Hooks";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { urlArr } from "../utils";
import { CartStyle } from "../Styles/CartStyle";
import { FaRegEye, FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import moment from "moment/moment";
import { updatePost, updatePostDatas } from "../Helpers/UpdateDoc";
import { get } from "../Helpers/GetSinglePost";
import { profilePost } from "../Helpers/getProfilePost";
import { LazyLoadImage } from "react-lazy-load-image-component";

const MainCard = ({
  subtitle,
  category,
  author,
  paragraphs,
  comments,
  title,
  likes,
  imageBucket,
  views,
  created_at,
  author_image,
  uid,
  id,
}) => {
  const [imageUrl, setImageUrls] = useState("");
  const [ifLiked, setIfLiked] = useState(false);
  const eachPost = [
    {
      subtitle,
      category,
      author,
      paragraphs,
      comments,
      title,
      imageBucket,
    },
  ];
  useEffect(() => {
    fetchImageUrls(eachPost, setImageUrls);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userLiked, setUserLiked] = useState(likes);
  const {
    // userData: { uid },
    userData,
    userAuth,
  } = useSelector((store) => store.auth);

  // function Viewed() {
  //   if (!ifLiked) {
  //     setUserView((prev) => prev + 1);
  //     setIfViewed(true);
  //     updatePost(id, {
  //       subtitle,
  //       category,
  //       author,
  //       paragraphs,
  //       comments,
  //       title,
  //       likes: userLiked,
  //       views: userView,
  //       imageBucket,

  //       created_at,
  //       author_image,
  //       id,
  //     });
  //   }
  // }
  function liked() {
    if (!ifLiked) {
      setUserLiked((prev) => prev + 1);
      setIfLiked(true);
      updatePost(id, {
        subtitle,
        category,
        author,
        paragraphs,
        comments,
        title,
        likes: userLiked,
        imageBucket,
        views,
        created_at,
        author_image,
        id,
      });
    }
  }
  

  return (
    <CartStyle>
      <section
        className="post-card"
        onClick={() => {
          get(id, dispatch);
        }}
      >
        <div className="profile_container" onClick={() => profilePost(author)}>
          <div className="profile">
            <img src={author_image} className="avatar" />
            {/* <img src={photoUrl} alt="" /> */}
            <span className="profile_name">{author}</span>
          </div>
          <span>{moment(created_at.nanoseconds).format("LLLL")}</span>
        </div>
        <Link to={`/Details`} className="title">
          {title}
        </Link>
        <span className="datetime">{category}</span>
        <div className="image-preview">
          <LazyLoadImage
      alt={author}
      // height={image.height}
      src={imageUrl} // use normal <img> attributes as props
      // width={image.width}
       />
          {/* <img src={imageUrl} alt={author} /> */}
        </div>
        <div className="comment-like">
          <span onClick={() => liked()}>
            <span className={ifLiked & "LikeBtn"}>
              <FaRegHeart />
            </span>

            {userLiked}
          </span>
          <span>
            <FaRegCommentDots />
            {comments.length}
          </span>
          <span>
            <FaRegEye />
            {views}
          </span>
        </div>
        {userAuth && userData.uid === uid ? (
          <div>
            <button
              type="button"
              onClick={() => {
                deletePost(id, "blog-posts"), DeletePostImage(imageBucket);
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
                    imageUrl,
                    category,
                  },
                  dispatch,
                  navigate
                );
              }}
            >
              Edit Post
            </button>
            {/* <p>
              {userData.uid} and {uid}{" "}
            </p> */}
          </div>
        ) : null}
      </section>
    </CartStyle>
  );
};

export default MainCard;
