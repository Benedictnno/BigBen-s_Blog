import React, { useEffect, useState } from "react";
import { DeletePostImage, deletePost, fetchImageUrls } from "../Hooks";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartStyle } from "../Styles/CartStyle";
import { FaRegEye, FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import moment from "moment/moment";
import { updatePostDatas } from "../Helpers/UpdateDoc";
import { getSinglePage } from "../Helpers/GetSinglePost";
import { profilePost } from "../Helpers/getProfilePost";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { authorName } from "../Slices/ProfileSlice";
import { urlArr } from "../utils";

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

  const { userData, userAuth } = useSelector((store) => store.auth);

  return (
    <CartStyle>
      <section className="post-card">
        <div className="profile_container" onClick={() => profilePost(author)}>
          <div className="profile">
            <img src={author_image} className="avatar" />
            {/* <img src={photoUrl} alt="" /> */}
            <span
              className="profile_name"
              onClick={() => dispatch(authorName(author))}
            >
              <Link to={"/Profile"}>
                {" "}
                <p>{author}</p>
              </Link>
            </span>
          </div>
          <span>{moment(created_at.nanoseconds).format("LLLL")}</span>
        </div>
        <Link to={`/Detailed`} className="title">
          <p
            onClick={() => {
              getSinglePage(id, dispatch);
            }}
          >
            {title}
          </p>
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
          <span>
            <span className={ifLiked & "LikeBtn"}>
              <FaRegHeart />
            </span>

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
        {userAuth && userData.uid === uid && (
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
        )}
      </section>
    </CartStyle>
  );
};

export default MainCard;
