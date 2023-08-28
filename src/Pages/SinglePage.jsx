import React, { useEffect, useState } from "react";
import SinglePageComponent from "../Components/SinglePageComponent";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { updatePost } from "../Helpers/UpdateDoc";

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
      views,
      id,
      imageBucket,
      likes,
      created_at,
      author_image,
    },
  } = useSelector((store) => store.post);
  const [ifViewed, setIfViewed] = useState(false);
  const [userView, setUserView] = useState(views);

  function Viewed() {
    if (!ifViewed) {
      setUserView((prev) => prev + 1);
      setIfViewed(true);
      updatePost(id, {
        subtitle,
        category,
        author,
        paragraphs,
        comments,
        title,
        likes,
        views: userView,
        imageBucket,
        created_at,
        author_image,
        id,
      });
     
    }
  }

  console.log(ifViewed);
  console.log(userView);
  useEffect(() => {
    Viewed();
  }, []);

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
