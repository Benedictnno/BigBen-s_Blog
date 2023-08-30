import React, { useMemo } from "react";
import { search, searchValues } from "../Slices/postSlice";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";

const SearchComponent = () => {
  const { searchValue } = useSelector((store) => store.post);
  // function handleSearch(e) {
  //   dispatch(searchValues(e.target.value));
  //   dispatch(search());
  // }
  

  function debounce() {
    let timeOutId;
    return (e) => {
      dispatch(searchValues(e.target.value));
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        dispatch(search());
      }, 1500);
    };
  }

  const optimizedDebounce = useMemo(() => debounce(), []);
  return (
    <>
      <h2>BigBen's Blog</h2>

      <div className="Search_container">
        <span>
          <BsSearch />
        </span>
        <input
          type="text"
          placeholder="Search"
          className="Search_input"
          value={searchValue}
          onChange={optimizedDebounce}
        />
      </div>
    </>
  );
};

export default SearchComponent;
