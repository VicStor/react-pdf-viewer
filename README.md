#react-pdf-viewer

##Demo

[Demo version](https://calm-ridge-49297.herokuapp.com/)
Work in fetal stage.

##Usage

$ git clone https://github.com/VicStor/react-pdf-viewer

$ cd react-pdf-viewer

$ npm install

$ npm start

go to http://localhost:4040/ in your browser

##Should work like that

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

##pdfViewer

###Component

There are props to be pass to <PdfViewer /> Component as chown below
if svg prop set to true page renders as svg, otherwise it renders in canvas
```js
render() {
  return (
    <PdfViewer
      getPdfViewer={this.getViewer}
      docLink='link to pdfDocument'
      //svg
    />
  );
}
```
**getPdfViewer**

Example of function shown below. Here `this.pdfViewer` is set to pdfViewer so you can use this object and its methods everywhere in your component.
```js
getViewer = (pdfViewer) => {
  this.pdfViewer = pdfViewer;
  pdfViewer.onLoadingProgress((progress) => {
    const loadingProgress = Math.floor((100 * progress.loaded) / progress.total);
    this.setState({ loadingProgress });
  });
}
```
**docLink**

uri of pdf document

```js
this.pdfViewer.switchViewMode(viewMode);
this.pdfViewer.currentPage();
this.pdfViewer.showThumbnails(true || false);
this.pdfViewer.onLoadingProgress((progress) => {...});
// and others
```

###Instance

| Method | Argument | Description |
|---|---|---|
| .onLoad | (pdfDocument) => {...} | instance of PDFJS pdfDocument passed |
| onPageLoad | (page) => {...} | callback runs on each page load passing PDFJS page instance |
| setCurrentPage | pageIndex | |
| showThumbnails | true / false | |
| switchViewMode | fitWidth / fitPage / custom | |
| onProgress | (progress) => {...} | |
| scalePage | (0.25 - 4) | |
| setThumbnailContainerStyle | {} | style thumbnail container |
| setThumbnailStyle | {} |  style thumbnail |
| setDocumentStyle | {} | style document container, react style object |
| setPageStyle | {} |  react styling object |
| setInpageElemetStyle | {} | used for add bookmark on page |
| setBookmarksContainerStyle | {} |  |
| setBookmark | {} |  |


Think of pdfViewer as actual instance of pdfDocument.
So
```js
this.pdfViewer.onLoad((pdfDocument) => {})
```
is the same as
```js
this.pdfViewer.pdfDocument.onLoad(() => {})
```
and
```js
this.pdfViewer.onPageLoad((page) => {...});
```
is the same as
```js
this.pdfViewer.pdfDocument.onPageLoad((page) => {...});
```

##Styling

There are some instances need to be styled
- document container
- page container
- page number
- thumbnails container
- thumbnail
- bookmarks container
- bookmark
