import React, { useEffect, useState } from "react";
import { fetchImageUrls } from "../Hooks";

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
  const eachPost =[ {
    subtitle,
    category,
    author,
    paragraphs,
    comments,
    title,
    imageBucket,
  }];
  useEffect(() => {
    fetchImageUrls(eachPost, setImageUrls);
  }, []);

  return (
    <article>
      <h1>{title}</h1>
      <h4>{subtitle}</h4>
      <img src={imageUrl} alt={author} />
    </article>
  );
};

export default MainCard;
