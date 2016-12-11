import React, { Component } from 'react';

import Viewer from './pdf_viewer';
import {
  TopMenu,
  BottomMenu
} from './controls';
// import Loader from './helpers/loader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fitWidth: true,
      isFullScreen: false,
      showThumbnails: false,
      currentIndex: 0,
      loadingProgress: 0,
      numPages: null
    };
  }
  getNumPages = (numPages) => {
    this.setState({ numPages });
  }
  showThumbnailsHandler = () => {
    this.pdfViewer.showThumbnails(!this.state.showThumbnails);
    this.setState({ showThumbnails: !this.state.showThumbnails });
  }
  fitWidthHandler = () => {
    const { fitWidth } = this.state;
    this.pdfViewer.switchViewMode(!fitWidth);
    this.setState({ fitWidth: !fitWidth });
  }
  setCurrentPage = (pageIndex) => {
    this.setState({ currentIndex: pageIndex });
  }
  scrollToPage = (pageIndex) => {
    this.pdfViewer.scrollToPage(pageIndex);
  }
  fullScreenHandler = () => {
    console.log('fullScreenHandler');
    this.setState({ isFullScreen: !this.state.isFullScreen });
    // this.pdfViewer.fullScreen();
  }
  getViewer = (pdfViewer) => {
    this.pdfViewer = pdfViewer;
    console.log('pdfViewer: ', this.pdfViewer);
    this.pdfViewer.onProgress((progress) => {
      const loadingProgress = Math.floor((100 * progress.loaded) / progress.total);
      this.setState({ loadingProgress });
    });
    this.pdfViewer.onLoad((pdfDocument) => {
      this.setState({ numPages: pdfDocument.numPages });
    });
    this.pdfViewer.onPageFlipp(this.setCurrentPage);
  }
  renderDocument() {
    // const { isFetching } = this.state;
    // if (isFetching) {
    //   return <Loader />;
    // }
    return (
      <Viewer
        getViewer={this.getViewer}
        docLink='https://dl.dropboxusercontent.com/u/30395115/In%20The%20Wood%202015.pdf'
      />
    );
  }
  render() {
    const {
      isFullScreen, showThumbnails, currentIndex,
      loadingProgress, numPages, fitWidth, closePreviewHandler
    } = this.state;
    const { fullScreenHandler, showThumbnailsHandler,
      fitWidthHandler, scrollToPage } = this;
    return (
      <div className={`preview fm afh fcn${isFullScreen ? ' fullScreen' : ''}`}>
        <TopMenu
          previewTitle='Some docName'
          fullScreenHandler={fullScreenHandler}
          closePreview={closePreviewHandler}
          loadingProgress={loadingProgress}
        />
        <div className='fm frn ofh'>
          {this.renderDocument()}
        </div>
        <BottomMenu
          numPages={numPages}
          fitWidth={fitWidth}
          fitWidthHandler={fitWidthHandler}
          showThumbnails={showThumbnails}
          showThumbnailsHandler={showThumbnailsHandler}
          currentPage={currentIndex}
          scrollToPage={scrollToPage}
        />
      </div>
    );
  }
}

export default App;
