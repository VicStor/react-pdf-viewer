import React from 'react';
import { MenuButtonDark } from '../helpers';

function renderBookmarks(bookmarks, setCurrentPage) {
  return bookmarks.map(pageIndex => (
    <button
      className='button rounded-button bookmark d_f a_i-center j_c-center'
      onClick={() => { setCurrentPage(pageIndex); }}
    >
      <span className='u_s-none'>{pageIndex}</span>
    </button>
  ));
}

export default function ({ bookmarks, deleteBookmark, setCurrentPage }) {
  return (
    <div className='select-page w-40 m_r-5 container flex-none f-col-now a_i-center j_c-between'>
      <div className='flex-max selected-page-wrapper'>
        <div className='f-col-now a_i-center selected-page-container'>
          {renderBookmarks(bookmarks, setCurrentPage)}
        </div>
      </div>
      {/* <MenuButtonDark
        type='filter'
        onClick={deleteBookmark()}
      /> */}
      <MenuButtonDark
        type='delete-all-pages'
        onClick={deleteBookmark()}
      />
    </div>
  );
}
