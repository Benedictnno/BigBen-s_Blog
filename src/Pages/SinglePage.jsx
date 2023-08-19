import React, { useEffect } from "react";
import SinglePageComponent from "../Components/SinglePageComponent";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

const SinglePage = () => {
  const {
    singlePageData: {
      subtitle,
      category,
      author,
      paragraphs,
      comments,
      title,
      imageUrl,
    },
  } = useSelector((store) => store.post);

  return (
    <div>
      <h1>{title}</h1>
      <h4>{subtitle}</h4>
      <img src={imageUrl} alt={author} />
      <ReactMarkdown>{paragraphs}</ReactMarkdown>
    </div>
  );
};

export default SinglePage;
