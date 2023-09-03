import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { SinglePageStyles } from "../Styles/SinglePageStyles";
import { getProfilePost } from "../Helpers/getProfilePost";
import { Link } from "react-router-dom";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { motion, useScroll } from "framer-motion";
import { Comment, submitComment } from "../Slices/MainCardSlice";
import { updateComment, updatePost } from "../Helpers/UpdateDoc";

const SinglePage = () => {
  const {
    singlePageData: {
      subtitle,
      author,
      paragraphs,
      title,
      imageUrl,
      imageBucket,
      views,
      id,
      likes,
      category,
      author_image,
    },
  } = useSelector((store) => store.post);
  const [ifViewed, setIfViewed] = useState(false);
  const [userView, setUserView] = useState(views);
  const { scrollYProgress } = useScroll();

  // const q = query(postCollectionRef, where("id", "==", id));
  // console.log(q);
  // function Viewed() {
  //   if (!ifViewed) {
  //     setUserView((prev) => prev + 1);
  //     setIfViewed(true);
  //     updatePost(id, {
  //       subtitle,
  //       category,
  //       author,
  //       paragraphs,
  //       comments,
  //       title,
  //       likes,
  //       views: userView,
  //       imageBucket,
  //       created_at,
  //       author_image,
  //       id,
  //     });
  //   }
  // }

  console.log(id);
  const dispatch = useDispatch();
  const { userAuth, userData } = useSelector((store) => store.auth);
  const { comment } = useSelector((store) => store.mainCard);

  function handleChange(e) {
    dispatch(Comment(e.target.value));
  }

  function handleSubmit() {
    if (comment.commentText) {
      dispatch(
        submitComment({ image: userData.photoURL, name: userData.displayName })
      );
      updateComment(id, {
        comment,
      });
    }
  }

  return (
    <SinglePageStyles>
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="SinglePage_nav">
        <h1>BigBen's Blog</h1>

        {userAuth ? (
          <Link
            to="ProfilePage"
            className="darkBtn links"
            onClick={() => getProfilePost(userData.uid, dispatch)}
          >
            {userData?.photoURL && (
              <img src={userData?.photoURL} alt="" className="PhotoUrl" />
            )}
            <span>{userData?.displayName}</span>
          </Link>
        ) : (
          <div>
            <Link to={"/Login"} className="lightBtn links">
              <span>
                <BiLogOut />
              </span>
              Log In
            </Link>
            <Link to={"/SignUp"} className="darkBtn links">
              <span>
                <BiLogOut />
              </span>
              Sign UP
            </Link>
          </div>
        )}
      </div>
      <section>
        <hr />
        <h1>{title}</h1>
        <hr />
        <img src={imageBucket} alt={author} className="single_page_img" />
        <h3>{subtitle}</h3>
      </section>
      <ReactMarkdown className="Single_text">{paragraphs}</ReactMarkdown>
      <div>
        <h3>Author :</h3>
        <div>
          <img src={author_image} alt={author} className="single_page_img" />
          <p>{author}</p>
        </div>
      </div>
      <div>
        <h4>Leave a comment</h4>
        <label htmlFor="">
          Name <input type="text" defaultValue={userData.displayName} />
        </label>
        <textarea
          name=""
          id=""
          cols="50"
          rows="20"
          onChange={handleChange}
        ></textarea>
        <button type="button" onClick={handleSubmit}>
          Submit Comment
        </button>
      </div>
    </SinglePageStyles>
  );
};

export default SinglePage;
