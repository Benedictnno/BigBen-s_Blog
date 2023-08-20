import React, { useEffect, useState } from "react";
import { fetchImageUrls } from "../Hooks";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { singlePage } from "../Slices/postSlice";
import { urlArr } from "../utils";

const MainCard = ({
  subtitle,
  category,
  author,
  paragraphs,
  comments,
  title,
  imageBucket,
}) => {
  const [imageUrl, setImageUrls] = useState("");
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

  const dispatch = useDispatch();

  
  return (
    <article
      onClick={() =>
        dispatch(
          singlePage({
            subtitle,
            category,
            author,
            paragraphs,
            comments,
            title,
            imageUrl,
          })
        )
      }
    >
      <Link to={`/${urlArr(title)}`}>
        <h1>{title}</h1>
        <h4>{subtitle}</h4>
        <img src={imageUrl} alt={author} />
      </Link>
    </article>
  );
};

export default MainCard;
