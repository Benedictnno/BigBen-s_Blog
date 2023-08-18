import React from "react";
import { useSelector } from "react-redux";
import MainCard from "../Components/MainCard";


const Latest = () => {
  const { getPostDatas } = useSelector((store) => store.post);

  return (
    <section>
      {getPostDatas.map((details) => {
       
        return <MainCard {...details} />;
      })}
      <h1>Latest</h1>
    </section>
  );
};

export default Latest;
