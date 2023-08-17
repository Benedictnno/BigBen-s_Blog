import React from "react";
import { useSelector } from "react-redux";
import MainCard from "../Components/MainCard";
import { getDownloadImageURL } from "../Hooks";

const Latest = () => {
  const { getPostDatas } = useSelector((store) => store.post);

  return (
    <section>
      {getPostDatas.map((details) => {
       async function displayImages(params) {
          getDownloadImageURL(details.imageBucket)
        }
        return <MainCard {...details} />;
      })}
      <h1>Latest</h1>
    </section>
  );
};

export default Latest;
