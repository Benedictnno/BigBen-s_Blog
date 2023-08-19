import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { postData } from "../Slices/postSlice";
import { UploadImage, fetchImageUrls } from "../Hooks";

const Profile = () => {
  const {
    userData: { photoURL, displayName, uid },
    userAuth,
  } = useSelector((store) => store.auth);

  const [imageUrls, setImageUrls] = useState([]);
  const {
    post: { paragraphs, subtitle, title, category, image, imageBucket },
  } = useSelector((store) => store.post);

  const form = [
    { name: "paragraphs", value: paragraphs },
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
      const bucket = await UploadImage(image, uid);
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
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (!userAuth) {
      navigate("/Login");
    }
  }, [userAuth]);
  const { getPostDatas } = useSelector((store) => store.post);
  const filteredPost = getPostDatas.filter((post) => post.uid === uid);

  useEffect(() => {
    fetchImageUrls(filteredPost, setImageUrls);
  }, [filteredPost]);

  return (
    <div>
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
        <button
          type="button"
          onClick={() => {
            CreatePost();
          }}
        >
          Submit
        </button>
      </form>

      {filteredPost.map(({ title, id, subtitle, author }, index) => {
        return (
          <div key={id}>
            <h1>{title}</h1>
            <h4>{subtitle}</h4>
            <img src={imageUrls[index]} alt={author} />
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
