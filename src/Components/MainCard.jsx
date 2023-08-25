import React, { useEffect, useState } from "react";
import { fetchImageUrls } from "../Hooks";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { singlePage } from "../Slices/postSlice";
import { urlArr } from "../utils";
import { CartStyle } from "../Styles/CartStyle";
import { FaRegEye, FaRegHeart, FaRegCommentDots } from "react-icons/fa";
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
  },
  { photoUrl }
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
      <Link
        to={`/${urlArr(title)}`}
        class="post-card"
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
          <div class="avatar">{/* <img src={photoUrl} alt="" /> */}</div>
          <span>{author}</span>
        </div>
        <a href="#" class="title">
          {title}
        </a>
        <span class="datetime">{category}</span>
        <div class="image-preview">
          <img src={imageUrl} alt={author} />
        </div>
        <div class="comment-like">
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
      </Link>
    </CartStyle>
  );
};

export default MainCard;
