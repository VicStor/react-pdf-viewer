import React, { Component } from 'react';
import { isEqual } from 'lodash';
import Page from './page';

function pageStyle(pageSize, fitWidth) {
  if (!pageSize) return null;
  const { width, height } = pageSize;
  const pageStyle
    = fitWidth ? { width: `${width}px` } : { width: `${width}px`, height: `${height}px` };
  return pageStyle;
}

class PdfPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfPage: null
    };
    this.pageNode = null;
    this.renderTask = null;
  }
  componentWillMount() {
    const { pageIndex, pdfDocument } = this.props;
    pdfDocument.getPage(pageIndex + 1).then((pdfPage) => {
      this.setState({ pdfPage });
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(this.props.pageSize, nextProps.pageSize)) return true;
    if (nextState.pdfPage !== null) return true;
    return false;
  }
  // componentWillUpdate() {
  //   this.cleanupPage();
  // }
  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.props.pageSize, prevProps.pageSize)) {
      this.renderPage();
      return;
    }
    if (prevState.pdfPage === null && this.state.pdfPage !== null) {
      this.renderPage();
      return;
    }
  }
  componentWillUnmount() {
    this.cleanupPage();
  }
  getPage = (pageRef) => {
    if (!pageRef) return;
    // console.log('PdfPage === ==== === ===> getPage pageRef: ', pageRef);
    this.pageNode = pageRef;
    this.pageNode.classList.add('hidden');
  }
  cleanupPage() {
    if (this.state.pdfPage !== null) {
      console.log('PdfPage === ===> cleanupPage');
      this.state.pdfPage.cleanup();
    }
  }
  renderPage() {
    const { pageSize, fitWidth } = this.props;
    const { height, width } = pageSize;
    const { pageNode } = this;
    const { pdfPage } = this.state;

    if (!height || !width) return;
    if (!pageNode) return;
    if (!pdfPage) return;

    // console.log('PdfPage === ===> renderPage');
    // console.log('pageIndex: ', this.props.pageIndex);
    // console.log('pageNode: ', pageNode);
    // console.log('pageSize: ', pageSize);
    // console.log('pdfPage: ', pdfPage);

    let canvas = pageNode.querySelector('.pdf-canvas');
    if (canvas) {
      canvas.classList.add('hide');
    } else {
      canvas = global.document.createElement('canvas');
      canvas.className = 'pdf-canvas hide';
      pageNode.appendChild(canvas);
    }
    const canvasContext = canvas.getContext('2d');
    let viewport = pdfPage.getViewport(1);
    const scaleW = width / viewport.width;
    const scaleH = height / viewport.height;
    viewport = pdfPage.getViewport(Math.min(scaleW, scaleH));
    viewport = fitWidth
      ? pdfPage.getViewport(scaleW)
      : pdfPage.getViewport(Math.min(scaleW, scaleH));
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    if (this.renderTask !== null) {
      console.log('pageIndex: %o renderTask: %o', this.props.pageIndex, this.renderTask);
      this.renderTask.cancel();
      this.renderTask = null;
    }
    this.renderTask =
      pdfPage.render({ canvasContext, viewport });

    // this.renderTask.onContinue = (goOn) => {
    //   // console.log('onContinue ', this.props.pageIndex);
    //   canvas.classList.remove('hide');
    //   this.pageNode.classList.remove('hidden');
    //   // this.renderTask = null;
    //   goOn();
    // };

    this.renderTask.promise
      .then(() => {
        // console.log('then ', this.props.pageIndex);
        canvas.classList.remove('hide');
        this.pageNode.classList.remove('hidden');
        this.renderTask = null;
      }, () => {});
  }

  render() {
    const { pageSize, fitWidth, children } = this.props;
    return (
      <Page style={pageStyle(pageSize, fitWidth)} >
        <div
          className='pdf-page rel'
          ref={this.getPage}
        >
          {this.state.pdfPage && children}
        </div>
      </Page>
    );
  }
}

export default PdfPage;

// const textLayerDiv = global.document.createElement('div');
// textLayerDiv.className = 'textLayer';
// textLayerDiv.setAttribute('style', `height: ${height}px; width:${width}px;`)
// textLayerDiv.offsetTop = canvas.offsetTop;
// textLayerDiv.offsetLeft = canvas.offsetLeft;
// pdfPage.appendChild(textLayerDiv);
