import React from "react";

export default function Pagination(props) {
  const { currentPage, handlePageClick } = props;
  return (
    <div>
      <button
        disabled={currentPage === 1}
        onClick={() => {
          handlePageClick(-1);
        }}
      >
        back
      </button>
      <button
        onClick={() => {
          handlePageClick(1);
        }}
      >
        forward
      </button>
    </div>
  );
}

/*
- The functional component allows you to split the UI into independent and reusable pieces. 
- The RFC is receiving data from the parent component using props

*/
