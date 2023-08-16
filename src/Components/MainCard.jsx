import React from "react";

const MainCard = ({
  subtitle,
  category,
  author,
  paragraphs,
  comments,
  title,
}) => {
  return (
    <article>
      <h1>{title}</h1>
      <h4>{subtitle}</h4>
    </article>
  );
};

export default MainCard;
