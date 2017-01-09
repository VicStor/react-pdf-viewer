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

class SvgPage extends Component {
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

    // const canvas = pageNode.querySelector('.pdf-canvas');
    let container = pageNode.querySelector('.svg-container');
    if (container) {
      container.classList.add('hide');
    } else {
      container = global.document.createElement('div');
      container.className = 'svg-container hide';
      pageNode.appendChild(container);
    }
    // const canvasContext = canvas.getContext('2d');
    let viewport = pdfPage.getViewport(1);
    const scaleW = width / viewport.width;
    const scaleH = height / viewport.height;
    viewport = pdfPage.getViewport(Math.min(scaleW, scaleH));
    viewport = fitWidth
      ? pdfPage.getViewport(scaleW)
      : pdfPage.getViewport(Math.min(scaleW, scaleH));
    container.style.width = `${viewport.width}px`;
    container.style.height = `${viewport.height}px`;

    if (this.renderTask !== null) {
      console.log('pageIndex: %o renderTask: %o', this.props.pageIndex, this.renderTask);
      this.renderTask.cancel();
      this.renderTask = null;
    }

    this.renderTask = pdfPage.getOperatorList();
    console.log('pageIndex: %o renderTask: %o', this.props.pageIndex, this.renderTask);
    this.renderTask
      .then((opList) => {
        const svgGfx = new global.PDFJS.SVGGraphics(pdfPage.commonObjs, pdfPage.objs);
        return svgGfx.getSVG(opList, viewport);
      })
      .then((svg) => {
        container.appendChild(svg);
        container.classList.remove('hide');
        this.pageNode.classList.remove('hidden');
        this.renderTask = null;
      });
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

export default SvgPage;

// const textLayerDiv = global.document.createElement('div');
// textLayerDiv.className = 'textLayer';
// textLayerDiv.setAttribute('style', `height: ${height}px; width:${width}px;`)
// textLayerDiv.offsetTop = canvas.offsetTop;
// textLayerDiv.offsetLeft = canvas.offsetLeft;
// pdfPage.appendChild(textLayerDiv);
