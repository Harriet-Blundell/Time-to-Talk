import React from "react";
import "./Pagination.css";

export default function Pagination(props) {
  const { currentPage, handlePageClick } = props;
  return (
    <div className="button-container">
      <button
        className="button"
        disabled={currentPage === 1}
        onClick={() => {
          handlePageClick(-1);
        }}
      >
        {currentPage === 1 ? (
          <img src="chevron-left.png" alt="left chevron" />
        ) : (
          <img src="chevron-left-active.png" alt="left chevron" />
        )}
      </button>
      <button
        className="button"
        onClick={() => {
          handlePageClick(1);
        }}
      >
        <img src="chevron-right.png" alt="right chevron" />
      </button>
    </div>
  );
}

/*
- The functional component allows you to split the UI into independent and reusable pieces. 
- The RFC is receiving data from the parent component using props

*/
