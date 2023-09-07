import React, { useMemo } from "react";
import { search, searchValues } from "../Slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";

const SearchComponent = () => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector((store) => store.post);

  function debounce() {
    let timeOutId;
    return (e) => {
      dispatch(searchValues(e.target.value));
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        dispatch(search());
      }, 1000);
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
