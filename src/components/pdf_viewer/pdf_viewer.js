import React, { Component } from 'react';
import { range, isEqual } from 'lodash';

import SmartScroll from '../smart_scroll';
import PdfPage from './pdf_page';
// import SvgPage from './svg_page';
import PageNumber from './page_number';
import Loader from '../helpers/loader';
import ThumbnailsContainer from './thumbnails_container';

import Bookmarks from './bookmarks';

import cancelablePromise from '../helpers/preview_helpers';
import { getInnerSize } from '../helpers';

function asc(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

// docLink
// fitWidth
// currentPage
// loadingProgress
// getNumPages
// showThumbnails
// setCurrentPageHandler
// getScrollToPage

// bookmarks


class PdfViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfDocument: null,
      viewSize: {
        width: null,
        height: null
      },
      // temp
      bookmarks: []
    };

    this.documentPromise = null;
    this.scroll = null;
    // console.log('PreviewDocument constructor currentIndex: ', props.currentIndex);
  }
  componentWillMount() {
    if (this.documentPromise !== null) {
      this.documentPromise.cancel();
    }
    // global.PDFJS.disableWebGL = false;

    this.documentPromise =
      cancelablePromise(global.PDFJS.getDocument(this.props.docLink).promise);

    this.documentPromise
      .then((pdfDocument) => {
        pdfDocument.loadingTask.onProgress = this.props.loadingProgress;
        this.props.onLoad(pdfDocument);
        this.setState({ pdfDocument });
      })
      .catch((err) => {
        console.error('Error in document promise\n', err);
        this.componentWillUnmount();
      });
  }
  componentDidMount() {
    global.addEventListener('resize', this.setViewSize);
  }
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.currentIndex !== nextProps.currentIndex) {
  //     console.log('PdfViewer === === ===> should scroll');
  //     // this.goToPage(nextProps.currentIndex);
  //   }
  // }
  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(this.state.viewSize, nextState.viewSize)) return true;
    if (this.props.fitWidth !== nextProps.fitWidth) return true;
    if (this.props.showThumbnails !== nextProps.showThumbnails) return true;
    if (this.state.pdfDocument === null && nextState.pdfDocument !== null) return true;
    if (this.state.bookmarks.length === 0 && nextState.bookmarks.length > 0) return true;
    if (this.state.bookmarks.length > 0 && nextState.bookmarks.length === 0) return true;
    return false;
  }
  componentDidUpdate() {
    console.log('PdfViewer === ===> componentDidUpdate');
    this.setViewSize();
  }
  componentWillUnmount() {
    if (this.documentPromise !== null) {
      this.documentPromise.cancel();
    }
    if (this.state.pdfDocument !== null) {
      this.state.pdfDocument.destroy();
    }
    global.removeEventListener('resize', this.setViewSize);
  }
  addBookmark = pageIndex => () => {
    const bookmarks = [...this.state.bookmarks, pageIndex].sort(asc);
    this.setState({ bookmarks });
  }
  deleteBookmark = pageIndex => () => {
    if (pageIndex) {
      const bookmarks = this.state.bookmarks.filter(bookmark => pageIndex !== bookmark);
      this.setState({ bookmarks });
      return;
    }
    this.setState({ bookmarks: [] });
  }
  // goToPage(pageIndex) {
  //   console.log('PdfViewer === === ===> goToPage');
  //   this.scroll.scrollToItem(pageIndex);
  // }

  getScroll = (smartScroll) => {
    if (!smartScroll) return;
    console.log('PdfViewer ===> getScroll');
    this.scroll = smartScroll;
    this.props.getScrollToItem(this.scroll.scrollToItem);
    this.setViewSize();
  }
  setViewSize = () => {
    if (!this.scroll) return;
    const containerNode = this.scroll.refs.container;
    const docNode = containerNode.querySelector('.doc');
    const { height } = getInnerSize(containerNode);
    const { width } = getInnerSize(docNode);
    const viewSize = { width, height };
    if (!isEqual(this.state.viewSize, viewSize)) {
      console.log('PdfViewer ===> setting new state.viewSize');
      this.setState({ viewSize });
    }
  }
  renderDocument() {
    const { setCurrentPageHandler } = this.props;
    const { getScroll } = this;
    // if (fitWidth) {
    //   return (
    //     <div className='fm ofh rel fcn'>
    //       <SmartScroll
    //         getScroll={getScroll}
    //         itemClassName='page'
    //         speed={0.8}
    //         className='scroll-wrapper fm ofh'
    //         setCurrentItem={setCurrentPageHandler}
    //       >
    //         <div className='doc fcn aic m_r-10' >
    //           {this.renderPages()}
    //         </div>
    //       </SmartScroll>
    //     </div>
    //   );
    // }
    // return (
    //   <div className='fm ofh rel fcn'>
    //     <div className='doc fcn aic m_r-10' >
    //       {this.renderPages()}
    //     </div>
    //   </div>
    // );
    return (
      <div className='fm ofh rel fcn'>
        <SmartScroll
          getScroll={getScroll}
          itemClassName='page'
          speed={0.8}
          className='scroll-wrapper fm ofh'
          setCurrentItem={setCurrentPageHandler}
        >
          <div className='doc fcn aic m_r-10' >
            {this.renderPages()}
          </div>
        </SmartScroll>
      </div>
    );
  }

  renderPages() {
    console.log('%c Render pdf pages!!!', 'color: red;');
    const { fitWidth, svg } = this.props;
    const { pdfDocument, viewSize } = this.state;
    const { addBookmark } = this;
    return range(pdfDocument.numPages).map(pageIndex => (
      <PdfPage
        pageIndex={pageIndex}
        pdfDocument={pdfDocument}
        pageSize={viewSize}
        fitWidth={fitWidth}
        svg={svg}
      >
        <PageNumber
          pageIndex={pageIndex}
          onClick={addBookmark(pageIndex)}
        />
      </PdfPage>
    ));
  }
  renderThumbnails() {
    const { pdfDocument } = this.state;
    const { currentPage } = this.props;
    return (
      <ThumbnailsContainer
        scrollToItem={this.scroll.scrollToItem}
        currentPage={currentPage}
      >
        {range(pdfDocument.numPages).map(pageIndex => (
          <PdfPage
            pageIndex={pageIndex}
            pdfDocument={pdfDocument}
          />))
        }
      </ThumbnailsContainer>
    );
  }
  renderBookmarks() {
    const { bookmarks } = this.state;
    // const { bookmarks } = this.props;
    const { deleteBookmark, setCurrentPage } = this;
    return (
      <Bookmarks
        bookmarks={bookmarks}
        deleteBookmark={deleteBookmark}
        setCurrentPage={setCurrentPage}
      />
    );
  }
  render() {
    const { showThumbnails } = this.props;
    const { pdfDocument, bookmarks } = this.state;
    // const { bookmarks } = this.props;
    return (
      <div className='preview-body fm rel frn'>
        {showThumbnails && pdfDocument &&
          this.renderThumbnails()
        }
        {bookmarks.length > 0 &&
          this.renderBookmarks()
        }
        {pdfDocument
          ? this.renderDocument()
          : <Loader />
        }
      </div>
    );
  }
}
export default PdfViewer;
