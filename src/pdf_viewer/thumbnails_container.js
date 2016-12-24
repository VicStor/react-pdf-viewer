import React, { Children } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SmartScroll from '../smart_scroll';

import optimize from '../helpers/optimize_component';

const ThumbnailsContainer = ({ scrollToItem, currentPage, children }) => {
  const renderThumbs = () => {
    const pageSize = { width: 164, height: 114 };

    console.log('%c Render pdf thumbs!!!', 'color: orange;');
    return Children.map(children, (page, index) => (
      <button
        className={`pdfThumb${currentPage === index ? ' active' : ''}`}
        onClick={() => { scrollToItem(index); }}
      >
        {React.cloneElement(page, { pageSize })}
      </button>
    ));
  };
  return (
    <ReactCSSTransitionGroup
      transitionName='fade-right'
      transitionEnterTimeout={1300}
      transitionLeaveTimeout={1300}
      transitionAppear={true}
      transitionAppearTimeout={1300}
    >
      <div className='thumbs-wrapper m_r-5 fn fcn'>
        <SmartScroll
          itemClassName='pdfThumb'
          speed={0.8}
          className='scroll-wrapper fm ofh'
        >
          <div className='thumbs-container fcn ais jcc m_r-10'>
            <ReactCSSTransitionGroup
              transitionName='fade-right'
              transitionEnterTimeout={1300}
              transitionLeaveTimeout={1300}
              transitionAppear={true}
              transitionAppearTimeout={1300}
            >
              {renderThumbs()}
            </ReactCSSTransitionGroup>
          </div>
        </SmartScroll>
      </div>
    </ReactCSSTransitionGroup>
  );
};
export default optimize(ThumbnailsContainer);
