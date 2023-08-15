import React, {  } from "react";
import { useSelector } from "react-redux";


const Latest = () => {
  const { getPostDatas } = useSelector((store) => store.post);

  return <div>Latest Latest</div>;
};

export default Latest;
