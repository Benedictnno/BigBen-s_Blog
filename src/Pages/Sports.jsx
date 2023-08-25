import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainCard from "../Components/MainCard";
import { filterPostData } from "../Slices/postSlice";

const Sports = () => {
  const { filteredPostDatas } = useSelector((store) => store.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filterPostData("Sports"));
  }, []);

  return (
    <div className="card_container">
      {filteredPostDatas.map((details) => {
        return <MainCard {...details} />;
      })}
    </div>
  );
};

export default Sports;
