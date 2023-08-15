import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { postData } from "../Slices/postSlice";

const Profile = () => {
  const {
    userData: { photoURL, displayName },
    userAuth,
  } = useSelector((store) => store.auth);

  const {
    post: { paragraphs, subtitle, title, category },
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
    }
      
    catch (error) {
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

        <button type="button" onClick={CreatePost}>Submit</button>
      </form>
    </div>
  );
};

export default Profile;
