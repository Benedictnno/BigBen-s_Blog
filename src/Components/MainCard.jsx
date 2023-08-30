import React, { useEffect, useState } from "react";
import { fetchImageUrls } from "../Hooks";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { urlArr } from "../utils";
import { CartStyle } from "../Styles/CartStyle";
import { FaRegEye, FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import moment from "moment/moment";
import { updatePost } from "../Helpers/UpdateDoc";
import { get } from "../Helpers/GetSinglePost";
import { profilePost } from "../Helpers/getProfilePost";

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

  const dispatch = useDispatch();
  const [userLiked, setUserLiked] = useState(likes);



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
          <img src={imageUrl} alt={author} />
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
      </section>
    </CartStyle>
  );
};

export default MainCard;
