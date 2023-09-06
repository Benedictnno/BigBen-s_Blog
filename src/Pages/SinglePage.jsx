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
import { postCollectionRef } from "../FirebaseConfig";
import { getDocs, query, where } from "firebase/firestore";
import { get } from "../Helpers/GetSinglePost";

const SinglePage = () => {
  const {
    singlePageData: {
      data: {
        subtitle,
        author,
        paragraphs,
        title,
        imageUrl,
        imageBucket,
        views,
        likes,
        category,
        author_image,
        comments,
      },
      id,
    },
  } = useSelector((store) => store.post);
  const [ifViewed, setIfViewed] = useState(false);
  const [userView, setUserView] = useState(views);
  const [Similar, setSimilar] = useState([]);
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

  const dispatch = useDispatch();
  const { userAuth, userData } = useSelector((store) => store.auth);
  const { comment } = useSelector((store) => store.mainCard);

  console.log(Similar);

  function handleChange(e) {
    dispatch(
      Comment({
        commentText: e.target.value,
        image: userData.photoURL,
        name: userData.displayName,
      })
    );
  }

  function handleSubmit() {
    if (comment.commentText) {
      updateComment(id, {
        comment,
      });
    }
  }

  async function GetSimilarPost() {
    try {
      const q = query(postCollectionRef, where("category", "==", category));

      let ProfilePostData = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        ProfilePostData.push({ data: doc.data(), id: doc.id });
        setSimilar(ProfilePostData.slice(0, 2));
      });
    } catch (error) {
      console.error(error);
    }
  }
  console.log(Similar);

  useEffect(() => {
    GetSimilarPost();
  }, []);

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
      <section className="SinglePage_Details">
        <hr />
        <h1>{title}</h1>
        <hr />
        <img src={imageBucket} alt={author} className="single_page_img" />
        <h3>{subtitle}</h3>
      </section>
      <ReactMarkdown className="markDown_text">{paragraphs}</ReactMarkdown>
      <div>
        <h3>Author :</h3>
        <div>
          <img src={author_image} alt={author} className="PhotoUrl" />
          <p>{author}</p>
        </div>
      </div>
      <section className="comments-similar">
        <div className="comments_container">
          <div>
            <h4>Leave a comment</h4>
            <textarea
              name=""
              id=""
              cols="50"
              rows="20"
              onChange={handleChange}
            ></textarea>
            <button
              type="button"
              className="createPostSubmit"
              onClick={handleSubmit}
            >
              Submit Comment
            </button>
          </div>
          {comments !== 0 && (
            <div>
              <h2>Comment Section</h2>
              <div>
                {comments?.map(({ image, commentText, name }) => {
                  return (
                    <div key={commentText}>
                      <div className="comments-similar-detail">
                        <img src={image} alt={name} className="PhotoUrl" />
                        <h4>
                          {" "}
                          {name} <span>Says</span>
                        </h4>
                      </div>
                      <p>{commentText}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {Similar !== 0 && (
          <div>
            <h3>Similar Post</h3>

            <div>
              {Similar.map(
                ({
                  data: {
                    subtitle,
                    author,
                    paragraphs,
                    title,
                    imageUrl,
                    imageBucket,
                    views,
                    likes,
                    category,
                    author_image,
                    comments,
                  },
                  id,
                }) => {
                  return (
                    <div className="similar_container">
                      <div className="comments-similar-detail">
                        <img
                          src={author_image}
                          alt=""
                          className="PhotoUrl similar-author"
                        />
                        <h3>{author}</h3>
                      </div>

                      <div className="similar_details">
                        <Link
                          to={`/Details`}
                          className="title "
                          onClick={() => get(id, dispatch)}
                        >
                          {title}
                        </Link>
                        <img
                          src={imageBucket}
                          alt=""
                          className="similar_mainImg"
                        />
                        <p>{category}</p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </section>
    </SinglePageStyles>
  );
};

export default SinglePage;
