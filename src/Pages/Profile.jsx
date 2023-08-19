import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { clearValues, postData, setLoading } from "../Slices/postSlice";
import { UploadImage } from "../Hooks";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import Loading from "../Components/Loading";

const Profile = () => {
  const {
    userData: { photoURL, displayName, uid },
    userAuth,
  } = useSelector((store) => store.auth);

  const {
    post: { paragraphs, subtitle, title, category, image, imageBucket },
    isLoading,
  } = useSelector((store) => store.post);

  const form = [
    { name: "subtitle", value: subtitle },
    { name: "title", value: title },
  ];
  const postCollectionRef = collection(db, "blog-posts");
  let navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    dispatch(postData({ name, value }));
  }
  function handleFileChange(e) {
    if (e.target.files[0]) {
      let value = e.target.files[0];
      let name = e.target.name;
      dispatch(postData({ name, value }));
    }
  }

  async function CreatePost() {
    try {
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
        uid,
      });
      toast.success("Post added successfully");
      navigate("/");
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error.message);
      toast.error("Post error");
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
  return (
    <main>
      <section className="markdown">
        <img src={photoURL} alt="" />

        <span>{displayName}</span>

        <form action="">
          {form.map(({ name, value }) => {
            return (
              <input
                key={name}
                name={name}
                value={value}
                onChange={handleChange}
              />
            );
          })}

          <select name="category" id="" onChange={handleChange}>
            <option value="News">News</option>
            <option value="Sports">Sports</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Music">Music</option>
            <option value="Movies">Movies</option>
          </select>

          <input
            type="file"
            accept="image"
            name="image"
            onChange={handleFileChange}
          />

          <textarea
            className="input"
            name={"paragraphs"}
            value={paragraphs}
            onChange={handleChange}
          ></textarea>
          <article className="result">
            <ReactMarkdown>{paragraphs}</ReactMarkdown>
          </article>
          <button
            type="button"
            onClick={() => {
              CreatePost();
            }}
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default Profile;
