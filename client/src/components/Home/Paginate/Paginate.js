import React from "react";
import './Paginate.css';

export default function Paginate(props) {
    const pageNumbers = [1];

    if (props.countries > 9) {
        for (let i = 1; i <= Math.ceil(props.countries / 10); i++) {
            pageNumbers.push(i+1);
        };
    };

    return (
      <nav>
        <div className="pagination">
          <button id="btnPrev" onClick={() => props.prevPage(props.currentPage - 1)}>prev</button>
        {
            pageNumbers?.map(number => 
                <button key={number} id="paginateBtn" className="pageBtn" onClick={() => props.paginate(number)} href="/#"> {number} </button>
            )
        }
          <button id="btnNext" value={pageNumbers[pageNumbers.length - 1]} onClick={() => props.nextPage(props.currentPage + 1)}>next</button>
        </div>
      </nav>
    );
};