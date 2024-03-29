import React from "react";
import "../styles/Pagination.css";

export default function Pagination({ currentPage, handlePageClick }) {
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
      <p>{currentPage}</p>
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

- Left and right button which minuses 1 or adds 1 depending on whether the user wants to go back or forward

*/
