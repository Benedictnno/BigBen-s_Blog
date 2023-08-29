import React, { useEffect, useState } from "react";
import SinglePageComponent from "../Components/SinglePageComponent";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { updatePost } from "../Helpers/UpdateDoc";
import { SinglePageStyles } from "../Styles/SinglePageStyles";

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
    <SinglePageStyles>
      <section>

      <hr />
      <h1>{title}</h1>
      <hr />
      <img src={imageUrl} alt={author} className="single_page_img" />
      <h3>{subtitle}</h3>
      </section>
      <ReactMarkdown className="Single_text">
        {paragraphs}
        </ReactMarkdown>
    </SinglePageStyles>
  );
};

export default SinglePage;
