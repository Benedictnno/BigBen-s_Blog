import React, { useEffect, useState } from "react";
import { fetchImageUrls } from "../Hooks";
import { Link } from "react-router-dom";
import SinglePageComponent from "./SinglePageComponent";

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

  function setPage(
    subtitle,
    category,
    author,
    paragraphs,
    comments,
    title,
    imageUrl
  ) {
   
    return <SinglePageComponent subtitle={subtitle}
      category={category}
      author={author}
      paragraphs={paragraphs}
      comments={comments}
      title={title}
      imageUrl/>
  }

  return (
    <article
      onClick={() =>
        setPage(
          subtitle,
          category,
          author,
          paragraphs,
          comments,
          title,
          imageUrl
        )
      }
    >
      <Link to={"SinglePage"}>
        <h1>{title}</h1>
        <h4>{subtitle}</h4>
        <img src={imageUrl} alt={author} />
      </Link>
    </article>
  );
};

export default MainCard;
