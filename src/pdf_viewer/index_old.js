import React, { Component } from 'react';

import {
  TopMenu,
  BottomMenu
} from '../controls';
import Loader from '../helpers/loader';
import PdfViewer from './pdf_viewer';

class App extends Component {
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
    // this.pdfViewer.showThumbnails(true/false);
    // this.pdfViewer.hideThumbnails();
    this.setState({ showThumbnails: !this.state.showThumbnails });
  }
  // currentIndex() => {
  //   const pageIndex = this.pdfViewer.currentIndex();
  //   this.setState({ currentIndex: pageIndex });
  // }
  fitWidthHandler = () => {
    // this.pdfViewer.switchViewMode();
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
    // this.pdfViewer.fullScreen(true/false);
    this.setState({ isFullScreen: !this.state.fullScreen });
  }
  getViewer = (pdfViewer) => {
    this.pdfViewer = pdfViewer;
    pdfViewer.onProgress((progress) => {
      const loadingProgress = Math.floor((100 * progress.loaded) / progress.total);
      this.setState({ loadingProgress });
    });
  }
  renderDocument() {
    const { currentIndex, showThumbnails, fitWidth, isFetching } = this.state;
    const {
      loadingProgress, getNumPages,
      setCurrentPageHandler, getScrollToItem
    } = this;
    if (isFetching) {
      return <Loader />;
    }
    return (
      <PdfViewer
        ref={this.getViewer}
        docLink='https://dl.dropboxusercontent.com/u/30395115/In%20The%20Wood%202015.pdf'
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

export default App;
