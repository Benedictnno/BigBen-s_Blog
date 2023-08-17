import React from "react";

const MainCard = ({
  subtitle,
  category,
  author,
  paragraphs,
  comments,
  title,
  imageBucket
}) => {
  return (
    <article>
      <h1>{title}</h1>
      <h4>{subtitle}</h4>
      <img src={imageBucket} alt={author} />
    </article>
  );
};

export default MainCard;
