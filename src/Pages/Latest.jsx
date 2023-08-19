import React from "react";
import { useSelector } from "react-redux";
import MainCard from "../Components/MainCard";


const Latest = () => {
  const { filteredPost } = useSelector((store) => store.post);

  return (
    <section>
      {filteredPost.map((details,index) => {
        return <MainCard key={index} {...details} />;
      })}
      <h1>Latest</h1>
    </section>
  );
};

export default Latest;
