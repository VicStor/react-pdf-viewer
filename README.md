#react-pdf-viewer

Usage
-----

$ git clone https://github.com/VictorQD/react-pdf-viewer.git

$ cd react-pdf-viewer

$ npm install

$ npm start

go to http://localhost:4040/ in your browser

Should work like that
-----
```js
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
          getPdfViewer={this.getViewer}
          docLink='link to pdfDocument'
        />
      </App>
    );
  }
}
```
pdfViewer instance
-----
getPdfViewer property to be set to function which receives instance of pdfViewer as single argument.
So later you can use its methods in your app as shown above
```js
this.pdfViewer.switchViewMode(viewMode);
this.pdfViewer.currentPage();
this.pdfViewer.showThumbnails(true || false);
this.pdfViewer.onLoadingProgress((progress) => {...});
// and others
```
Think of pdfViewer as actual instance of pdfDocument.
So
```js
this.pdfViewer.onLoad(() => {})
```
is the same as
```js
this.pdfViewer.pdfDocument.onLoad(() => {})
```
and
```js
this.pdfViewer.page(pageNumber).onLoad((page) => {...});
```
is the same as
```js
this.pdfViewer.pdfDocument.page(pageNumber).onLoad((page) => {...});
```
Styling
-----
There are some instances need to be styled
- document container
- page container
- page number
- thumbnails container
- thumbnail
- bookmarks container
- bookmark

Demo
-----
Demo version should be placed at [GitHub pages](https://pages.github.com/)
