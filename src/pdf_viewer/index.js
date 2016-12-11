import React, { Component } from 'react';

import PdfViewer from './pdf_viewer';

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fitWidth: true,
      isFullScreen: false,
      showThumbnails: false,
      currentIndex: 0,
      numPages: null
    };
    this.PdfViewer = {
      switchViewMode: this.switchViewMode,
      showThumbnails: this.showThumbnails,
      currentPage: this.currentPage,
      numPages: this.numPages,
      onProgress: this.onProgress,
      onLoad: this.onLoad,
      onPageFlipp: this.onPageFlipp,
      scrollToPage: this.scrollToPage
    };
    props.getViewer(this.PdfViewer);
  }
  onProgress = (callback) => {
    if (typeof callback === 'function') {
      this.onProgress = callback;
    }
  }
  onLoad = (callback) => {
    this.onLoad = (pdfDocument) => {
      if (typeof callback === 'function') {
        callback(pdfDocument);
      }
      this.setNumPages(pdfDocument.numPages);
    };
  }
  onPageFlipp = (callback) => {
    this.onPageFlipp = (pageIndex) => {
      if (typeof callback === 'function') {
        callback(pageIndex);
      }
      this.setCurrentPage(pageIndex);
    };
  }
  scrollToPage = (pageIndex) => {
    this.scrollToItem(pageIndex);
  }
  scrollToItem = (scrollToItem) => {
    if (typeof scrollToItem === 'function') {
      this.scrollToItem = scrollToItem;
    }
  }
  setNumPages = (numPages) => {
    this.setState({ numPages });
  }
  setCurrentPage = (pageIndex) => {
    const { numPages } = this.state;
    if (pageIndex >= 0 && pageIndex < numPages) {
      this.setState({ currentIndex: pageIndex });
    }
  }
  numPages = () => {
    return this.state.numPages;
  }
  currentPage = () => {
    return this.state.currentIndex;
  }
  showThumbnails = (switcher) => {
    const { showThumbnails } = this.state;
    if (switcher !== undefined) {
      this.setState({ showThumbnails: switcher });
    }
    return switcher || showThumbnails;
  }
  switchViewMode = (switcher) => {
    const { fitWidth } = this.state;
    this.setState({ fitWidth: switcher || !fitWidth });
    // viewMode 'fitPage' || 'fitWidth'
    if (fitWidth) {
      return 'fitWidth';
    }
    return 'fitPage';
  }

  render() {
    const { onLoad, onProgress, onPageFlipp, scrollToItem } = this;
    const { fitWidth, showThumbnails } = this.state;
    return (
      <PdfViewer
        docLink={this.props.docLink}
        loadingProgress={onProgress}
        fitWidth={fitWidth}
        onLoad={onLoad}
        showThumbnails={showThumbnails}
        setCurrentPageHandler={onPageFlipp}
        getScrollToItem={scrollToItem}
      />
    );
  }
}
export default Viewer;
