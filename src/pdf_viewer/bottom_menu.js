import React from 'react';
import { MenuButtonDark } from '../helpers';


const PreviewBottomMenu = ({
  numPages,
  fitWidth,
  showThumbnailsHandler,
  showThumbnails,
  fitWidthHandler,
  currentPage,
  setCurrentPage,
  scrollToPage
}) => {
  const inputPageHandler = (e) => {
    console.log('Input: ', parseInt(e.target.value));
    if (parseInt(e.target.value)) {
      setCurrentPage(parseInt(e.target.value));
    }
  };
  return (
    <div className='bottom-menu container m_t-5 h-40 fn frn jcb aic'>
      <div className='view-block fn frn'>
        <MenuButtonDark
          type='show-pages'
          active={showThumbnails}
          onClick={showThumbnailsHandler}
        />
        <MenuButtonDark
          type='fit-width'
          active={fitWidth}
          onClick={fitWidthHandler}
        />
        <MenuButtonDark
          type='fit-page'
          active={!fitWidth}
          onClick={fitWidthHandler}
        />
      </div>
      <div className='paging-block fn frn'>
        <MenuButtonDark
          type='page-up'
          active={false}
          onClick={() => { scrollToPage(currentPage - 1); }}
        />
        <MenuButtonDark
          type='page-down'
          active={false}
          onClick={() => { scrollToPage(currentPage + 1); }}
        />
      </div>
      <div className='fn frn aic'>
        <div className='scale-block fn frn m_r-10'>
          <MenuButtonDark
            type='bigger'
            active={false}
            onClick={false}
          />
          <MenuButtonDark
            type='smaller'
            active={false}
            onClick={false}
          />
        </div>
        <span className='pageNumber fn'>
          <input
            id='pageNumber'
            value={currentPage}
            onChange={inputPageHandler}
          />
          <span id='totalPages'> / {numPages}</span>
        </span>
      </div>
    </div>
  );
};
export default PreviewBottomMenu;
