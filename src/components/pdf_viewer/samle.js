import React, { Component } from 'react';
import PdfViewer from 'react-pdf-viewer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loadingProgress: 0,
    };
  }
  getViewer = (pdfViewer) => {
    this.pdfViewer = pdfViewer;
    pdfViewer.onLoadingProgress((progress) => {
      const loadingProgress = Math.floor((100 * progress.loaded) / progress.total);
      this.setState({ loadingProgress });
    });
  }
  render() {
    return (
      <App>
        <PdfViewer
          getPdfViewer={this.pdfViewer}
          docLink='link to pdfDocument'
        />
      </App>
    );
  }
}

getPdfViewer property to be set to function which receives instance of pdfViewer as single argument. ()
So later you can use its methods in your app as shown above
this.pdfViewer.switchViewMode(viewMode);
this.pdfViewer.currentPage();
this.pdfViewer.showThumbnails(true || false);
this.pdfViewer.onLoadingProgress((progress) => {...});

Think of pdfViewer as actual instance of pdfDocument to be short.
So
this.pdfViewer.onLoad(() => {})
is the same as
this.pdfViewer.pdfDocument.onLoad(() => {})
and
this.pdfViewer.page(pageNumber).onLoad((page) => {...});
is the same as
this.pdfViewer.pdfDocument.page(pageNumber).onLoad((page) => {...});
...
