import React from "react";
import { useSelector } from "react-redux";
import MainCard from "../Components/MainCard";


const Latest = () => {
  const { filteredPost } = useSelector((store) => store.post);
  // const { userData:{photoUrl} } = useSelector((store) => store.auth);

  return (
    <>
      <h1>Latest</h1>
    <section className='card_container'>
      {filteredPost.map((details,index) => {
        console.log(details);
        return <MainCard key={index} {...details}  />;
      })}
    </section>
    </>
  );
};

export default Latest;
