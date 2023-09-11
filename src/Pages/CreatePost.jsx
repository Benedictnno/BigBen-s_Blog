import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  clearValues,
  postData,
  setLoading,
  setPage,
} from "../Slices/postSlice";
import { UploadImage } from "../Hooks";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import Loading from "../Components/Loading";
import { CreatePostStyles } from "../Styles/CreatePostStyles";
import { updatePostDataEdit } from "../Slices/updateSlice";
import { updatePost } from "../Helpers/UpdateDoc";
import moment from "moment";
import { userProfilePost } from "../Helpers/userProfilePost";
import { fetchSingleUrls } from "../Helpers/SingleImageProcessing";
import { AiOutlineClose } from "react-icons/ai";
const Profile = () => {
  const {
    userData: { photoURL, displayName, uid },
    userAuth,
  } = useSelector((store) => store.auth);

  const {
    post: { paragraphs, subtitle, title, category, image, imageBucket },
    isLoading,
  } = useSelector((store) => store.post);
  const { update, isEditing } = useSelector((store) => store.update);

  const form = [
    { name: "title", value: title || update.title },
    { name: "subtitle", value: subtitle || update.subtitle },
  ];

  const postCollectionRef = collection(db, "blog-posts");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [OpenForm, setOpenForm] = useState(true);

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    if (isEditing) {
      dispatch(updatePostDataEdit({ name, value }));
    } else {
      dispatch(postData({ name, value }));
    }
  }

  function handleFileChange(e) {
    if (e.target.files[0]) {
      let value = e.target.files[0];
      let name = e.target.name;
      dispatch(postData({ name, value }));
    }
  }

  async function CreatePost() {
    if (image) {
      try {
        dispatch(setPage(false));

        const bucket = await UploadImage(image, uid, dispatch);
        await addDoc(postCollectionRef, {
          author: displayName,
          category,
          comments: [],
          likes: 0,
          paragraphs,
          subtitle,
          title,
          imageBucket: bucket,
          author_image: photoURL,
          view: 0,
          created_at: new Date(),
          uid,
        });
        toast.success("Post added successfully");
        navigate("/");
        dispatch(setLoading(false));
        dispatch(setPage(true));
        dispatch(clearValues());
      } catch (error) {
        console.log(error.message);
        toast.error("Post error");
      }
    } else {
      toast.error(" Please add an image");
    }
  }

  useEffect(() => {
    if (!userAuth) {
      navigate("/Login");
    }
  }, [userAuth]);

  if (isLoading) {
    return <Loading />;
  }
  console.log(OpenForm);
  return (
    <CreatePostStyles>
      <div className="top_btn_container">

      <button
        type="button"
        className="darkBtn "
        onClick={() => setOpenForm(!OpenForm)}
      >
        {OpenForm ? "Close Form " : "Open Form"}
      </button>
      <a
        href="https://benmarkdown-app.netlify.app/"
        className="lightBtn"
        target="_blank"
      >
        View Example web page
      </a>
      </div>
      <section className="markdown">
        {OpenForm && (
          <form className="createPost_form">
            <div className="title_container">
              {form.map(({ name, value }) => {
                return (
                  <div className="">
                    <h4 htmlFor="">{name}</h4>
                    <input
                      key={name}
                      name={name}
                      value={value}
                      onChange={handleChange}
                      className="fullName"
                    />
                  </div>
                );
              })}
              <div>
                <h4>Categories</h4>
                <select name="category" id="" onChange={handleChange}>
                  <option value="News">News</option>
                  <option value="Sports">Sports</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Music">Music</option>
                  <option value="Movies">Movies</option>
                </select>
              </div>
              <div>
                <h4>add main image</h4>

                <input
                  type="file"
                  accept="image"
                  name="image"
                  required
                  onChange={handleFileChange}
                />
              </div>

            </div>
              <button
                type="button"
                className="button"
                onClick={() => setOpenForm(false)}
              >
                <AiOutlineClose />
              </button>
              

            <textarea
              className="input"
              name={"paragraphs"}
              value={paragraphs || update.paragraphs}
              onChange={handleChange}
            ></textarea>
            {isEditing ? (
              <button
                type="button"
                onClick={() => {
                  updatePost(update.id, update);
                }}
                className="createPostSubmit"
              >
                Submit Edited Post
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  CreatePost(),
                    userProfilePost(image, dispatch, {
                      displayName,
                      category,
                      paragraphs,
                      subtitle,
                      title,
                      uid,
                    });
                }}
                className="createPostSubmit"
              >
                Submit Post
              </button>
            )}
          </form>
        )}
        <div className="Markdown_container">
          <img src={image?.name || update.image} alt="" />
          <h1>{title || update.title}</h1>
          <h4>{subtitle || update.subtitle}</h4>
          <ReactMarkdown className="markDown_text">
            {paragraphs || update.paragraphs}
          </ReactMarkdown>
        </div>
      </section>
    </CreatePostStyles>
  );
};

export default Profile;
