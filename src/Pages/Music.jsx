import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainCard from "../Components/MainCard";
import { filterPostData } from "../Slices/postSlice";

const Music = () => {
  const { filteredPostDatas } = useSelector((store) => store.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filterPostData("Music"));
  }, []);

  return (
    <div>
      {filteredPostDatas.map((details) => {
        return <MainCard key={details.id} {...details} />;
      })}
    </div>
  );
};

export default Music;
