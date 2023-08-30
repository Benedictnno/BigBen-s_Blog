import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { SinglePageStyles } from "../Styles/SinglePageStyles";
import { getProfilePost } from "../Helpers/getProfilePost";
import { Link } from "react-router-dom";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { motion, useScroll } from "framer-motion";
import { fetchSingleUrls } from "../Helpers/SingleImageProcessing";

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
      author_image,
    },
  } = useSelector((store) => store.post);
  const [ifViewed, setIfViewed] = useState(false);
  const [userView, setUserView] = useState(views);
  const { scrollYProgress } = useScroll();
  const [SingleImage, setImageUrl] = useState("");
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

  // console.log(ifViewed);
  // console.log(userView);
  // useEffect(() => {
  //   Viewed();
  // }, []);
  useEffect(() => {
   setImageUrl("");
    fetchSingleUrls(imageBucket, setImageUrl);
    // return () => {
    //   setImageUrl('');
    // };
  }, []);
  const { userAuth, userData } = useSelector((store) => store.auth);
  console.log(SingleImage);
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
        <img src={SingleImage} alt={author} className="single_page_img" />
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
        <textarea name="" id="" cols="50" rows="20"></textarea>
        <button type="button">Submit</button>
      </div>
    </SinglePageStyles>
  );
};

export default SinglePage;
