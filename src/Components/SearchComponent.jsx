import React, { useMemo, useRef } from "react";
import { search, searchValues } from "../Slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { useEffect } from "react";

const SearchComponent = () => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector((store) => store.post);
  const inputRef= useRef(true)
  function debounce() {
    let timeOutId;
    return (e) => {
      dispatch(searchValues(e.target.value));
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        dispatch(search());
      }, 2000);
    };
  }

  useEffect(() => {}, [searchValue]);
  const optimizedDebounce = useMemo(() => debounce(), []);
  return (
    <section className="search">
      <h2>BigBen's Blog</h2>

      <div className="Search_container">
        <span>
          <BsSearch />
        </span>
        <input
          type="text"
          placeholder="Search"
          className="Search_input"
          ref={inputRef}
          value={searchValue}
          onChange={optimizedDebounce}
        />
      </div>
    </section>
  );
};

export default SearchComponent;
