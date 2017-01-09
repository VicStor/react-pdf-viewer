import React from 'react';

export default function ({ pageIndex, onClick }) {
  return (
    <button
      className='pick-page button rounded-button active df aic jcc'
      onClick={onClick}
    >
      <span className='u_s-none'>{pageIndex}</span>
    </button>
  );
}
