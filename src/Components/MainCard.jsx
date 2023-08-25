import React, { useEffect, useState } from "react";
import { fetchImageUrls } from "../Hooks";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { singlePage } from "../Slices/postSlice";
import { urlArr } from "../utils";
import { CartStyle } from "../Styles/CartStyle";
import { FaRegEye, FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import moment from "moment/moment";
const MainCard = (
  {
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
  },
) => {
  const [imageUrl, setImageUrls] = useState("");
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

  return (
    <CartStyle>
      <section
        className="post-card"
        onClick={() =>
          dispatch(
            singlePage({
              subtitle,
              category,
              author,
              paragraphs,
              comments,
              title,
              imageUrl,
            })
          )
        }
      >
        <div>
          <img src={author_image} className="avatar">
            {/* <img src={photoUrl} alt="" /> */}
          </img>
          <span>{author}</span>
          <span>{moment(created_at.seconds).format("LLLL")}</span>
        </div>
        <Link to={`/${urlArr(title)}`} class="title">
          {title}
        </Link>
        <span className="datetime">{category}</span>
        <div className="image-preview">
          <img src={imageUrl} alt={author} />
        </div>
        <div className="comment-like">
          <span>
            <FaRegHeart />
            {likes}
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
