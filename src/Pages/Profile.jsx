import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { postData } from "../Slices/postSlice";
import { ref, uploadBytes } from "firebase/storage";

const Profile = () => {
  const {
    userData: { photoURL, displayName, uuid },
    userAuth,
  } = useSelector((store) => store.auth);

  const {
    post: { paragraphs, subtitle, title, category, image },
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

  const handleUpload = () => {
    if (image) {
      const fileRef = ref(storage, `images/${image.name + uuid}`);
      const metadata = {
        contentType: "image/jpeg",
      };

      const uploadTask = uploadBytes(fileRef, image, metadata).then(
        (snapshot) => {
          console.log("Uploaded a blob or file!");
        }
      );
      console.log(uploadTask);
    }
  };

  async function CreatePost() {
    try {
      await addDoc(postCollectionRef, {
        author: displayName,
        category,
        comments: [],
        likes: 0,
        paragraphs,
        subtitle,
        title,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // acts as a prodected route for users who aren't signed in but want to access the createpost route
    if (!userAuth) {
      navigate("/Login");
    }
  }, [userAuth]);

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

        <input type="file" name="image" onChange={handleFileChange} />
        <button
          type="button"
          onClick={() => {
            CreatePost(), handleUpload();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Profile;
