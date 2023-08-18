import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainCard from "../Components/MainCard";
import { filterPostData } from "../Slices/postSlice";

const News = () => {
  const { filteredPostDatas } = useSelector((store) => store.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filterPostData("news"));
  }, []);

  return (
    <div>
      {filteredPostDatas.map((details) => {
        return <MainCard {...details} />;
      })}
    </div>
  );
};

export default News;
