import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db, storage } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { postData } from "../Slices/postSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import moment from "moment/moment";

const Profile = () => {
  const BUCKET_URL = "gs://bigbens-blog.appspot.com";
  const {
    userData: { photoURL, displayName, uid },
    userAuth,
  } = useSelector((store) => store.auth);

  const [specUserPost, setSpecUserPost] = useState([]);

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

  async function UploadImage(image, uid) {
    const formattedData = moment(new Date()).format("MMMM d, YYYY");
    const bucket = `${BUCKET_URL}/${uid}/${formattedData}.jpg`;
    const fileRef = ref(storage, bucket);
    await uploadBytes(fileRef, image)
    alert("Image uploaded");
    return bucket;
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


  function displayImage(params) {

  }

  const { getPostDatas } = useSelector((store) => store.post);

  const filteredPost = getPostDatas.filter((post) => post.uid === uid);
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
            CreatePost();
          }}
        >
          Submit
        </button>
      </form>

      {filteredPost.map(({ title, id, subtitle, imageBucket, author }) => {
        return (
          <div key={id}>
            <h1>{title}</h1>
            <h4>{subtitle}</h4>
            <img src={imageBucket} alt={author} />
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
