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
    <div className='bookmarks-wrapper w-40 padding-5 fn fcn aic jcb'>
      <div className='fm selected-page-wrapper'>
        <div className='fcn aic selected-page-container'>
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
