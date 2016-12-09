import React, { Component } from 'react';

import TopMenu from './top_menu';
import BottomMenu from './bottom_menu';
import Loader from '../helpers/loader';
import PdfViewer from './pdf_viewer';

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fitWidth: true,
      isFullScreen: false,
      showThumbnails: false,
      currentIndex: 0,
      loadingProgress: 0,
      numPages: null,
      scrollToItem: null,
      docName: null
    };
  }
  // componentDidMount() {
  //   if (this.props.dbLink) {
  //     this.props.isPdf
  //     ? this.setPdfPreview(this.props.dbLink)
  //     : this.setImagePreview(this.props.dbLink);
  //   }
  // }
  // componentWillReceiveProps(newProps) {
  //   if (newProps.dbLink !== this.props.dbLink) {
  //     this.setDocument(newProps.dbLink);
  //   }
  // }
  componentWillUnmount() {}

  loadingProgress = (progress) => {
    const loadingProgress = Math.floor((100 * progress.loaded) / progress.total);
    this.setState({ loadingProgress });
  }
  getNumPages = (numPages) => {
    this.setState({ numPages });
  }
  showThumbnailsHandler = () => {
    this.setState({ showThumbnails: !this.state.showThumbnails });
  }
  fitWidthHandler = () => {
    const { fitWidth } = this.state;
    this.setState({ fitWidth: !fitWidth });
  }
  setCurrentPageHandler = (pageIndex) => {
    const { numPages } = this.state;
    if (pageIndex >= 0 && pageIndex < numPages) {
      console.log('Viewer setCurrentPage === ===> pageIndex: ', pageIndex);
      this.setState({ currentIndex: pageIndex });
    }
  }
  getScrollToItem = (scrollToItem) => {
    this.setState({ scrollToItem });
  }
  fullScreenHandler = () => {
    this.setState({ isFullScreen: !this.state.fullScreen });
  }

  renderDocument() {
    const { currentIndex, showThumbnails, fitWidth, isFetching } = this.state;
    const { docLink } = this.props;
    const {
      loadingProgress, getNumPages,
      setCurrentPageHandler, getScrollToItem
    } = this;
    if (isFetching) {
      return <Loader />;
    }
    return (
      <PdfViewer
        docLink={docLink}
        fitWidth={fitWidth}
        currentIndex={currentIndex}
        loadingProgress={loadingProgress}
        getNumPages={getNumPages}
        showThumbnails={showThumbnails}
        setCurrentPageHandler={setCurrentPageHandler}
        getScrollToItem={getScrollToItem}
      />
    );
  }
  render() {
    const {
      isFullScreen, showThumbnails, currentIndex,
      loadingProgress, numPages, scrollToItem,
      fitWidth, docName, closePreviewHandler
    } = this.state;
    const { fullScreenHandler, showThumbnailsHandler,
      fitWidthHandler, setCurrentPageHandler } = this;
    return (
      <div className={`preview fm afh fcn${isFullScreen ? ' fullScreen' : ''}`}>
        <TopMenu
          previewTitle={docName}
          fullScreenHandler={fullScreenHandler}
          closePreview={closePreviewHandler}
          loadingProgress={loadingProgress}
        />
        <div className='content fm frn ofh'>
          {this.renderDocument()}
        </div>
        <BottomMenu
          numPages={numPages}
          fitWidth={fitWidth}
          showThumbnails={showThumbnails}
          showThumbnailsHandler={showThumbnailsHandler}
          fitWidthHandler={fitWidthHandler}
          currentPage={currentIndex}
          setCurrentPage={setCurrentPageHandler}
          scrollToPage={scrollToItem}
        />
      </div>
    );
  }
}

export default Viewer;
