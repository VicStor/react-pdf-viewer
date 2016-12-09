import React from 'react';
import { MenuButtonDark } from '../helpers';
// import ClosePreviewLink from '../links/close_preview_link';
import LoadBar from '../helpers/loadbar';

function renderLoader(loadingProgress) {
  if (loadingProgress < 100) return <LoadBar loadingProgress={loadingProgress} />;
  return null;
}

const PreviewTopMenu = ({
  previewTitle,
  fullScreenHandler,
  closePreview,
  loadingProgress
}) => (
  <div className='top-nenu container m_b-5 h-40 fn frn jcb aic'>
    <div className='fn'>
      <span className='cat-name'>{previewTitle}</span>
    </div>
    <div className='fn' />
    <div className='win-block fn frn aic'>
      {renderLoader(loadingProgress)}
      <MenuButtonDark
        type='fit-window'
        onClick={fullScreenHandler}
      />
      <MenuButtonDark
        type='close'
        onClick={closePreview}
      />
    </div>
  </div>
);
export default PreviewTopMenu;
