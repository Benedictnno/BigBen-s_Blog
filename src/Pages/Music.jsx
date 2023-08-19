import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainCard from "../Components/MainCard";
import { filterPostData } from "../Slices/postSlice";

const Music = () => {
  const { filteredPost } = useSelector((store) => store.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filterPostData("Music"));
  }, []);

  return (
    <div>
      {filteredPost.map((details) => {
        return <MainCard key={details.id} {...details} />;
      })}
    </div>
  );
};

export default Music;
