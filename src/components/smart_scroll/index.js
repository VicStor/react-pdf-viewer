import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { range, cloneDeep } from 'lodash'; // isEqual

const offsetBottom = node => node.offsetTop + node.clientHeight;
const offsetTop = node => node.offsetTop;

// itemClassName
// getScroll
// setCurrentItem


class SmartScroll extends Component {
  constructor(props) {
    super(props);
    this.scroll = null;
    this.containerNode = null;
    this.items = [];

    this.topIndex = 0;
    this.bottomIndex = 0;
    this.topRendered = 0;
    this.bottomRendered = 0;
    this.renderedTail = 2;
    this.lastScrollTop = 0;
    this.scrollResponse = 50;

    this.itemClassName = `.${props.itemClassName}`;
  }
  componentDidMount() {
    // console.log('%c SmartScroll ==========> componentDidMount', 'color: red;');
    this.setInitState();
  }
  componentDidUpdate() {
    // console.log('%c SmartScroll ==========> componentDidUpdate', 'color: red;');
    this.setInitState();
  }
  setInitState() {
    console.log('%c SmartScroll === === ===> setInitState', 'color: green; font-weight: bold');
    range(this.items.length).forEach(this.hideItem);
    this.updateItems();
  }
  isVisible(itemIndex) {
    const item = this.items[itemIndex] || this.items[0];
    const { scrollTop, clientHeight } = this.scroll.getValues();
    const scrollBottom = scrollTop + clientHeight;
    const pageTop = offsetTop(item);
    const pageBottom = offsetBottom(item);
    return !(pageTop > scrollBottom || pageBottom < scrollTop);
  }
  topPageLeave() {
    if (!this.isVisible(this.topIndex)) {
      // console.log('%c \ntopPageLeave', 'color: red;');
      this.topIndex += 1;
      return true;
    }
    return false;
  }
  topPageIn() {
    const item = this.items[this.topIndex - 1];
    if (!!item && this.isVisible(this.topIndex - 1)) {
      // console.log('%c \ntopPageIn', 'color: green;');
      this.topIndex -= 1;
      return true;
    }
    return false;
  }

  handleVisibility = ({ scrollTop }) => {
    if (Math.abs(this.lastScrollTop - scrollTop) < this.scrollResponse) return;
    this.lastScrollTop = scrollTop;
    if (this.topPageLeave(scrollTop) || this.topPageIn(scrollTop)) {
      this.updateItems();
      if (typeof this.props.setCurrentItem === 'function') {
        this.setCurrentItem();
      }
    }
  }

  updateItems() {
    const nowVisible = this.getVisibleIndexes();
    const newVisible = this.findIndexes();
    this.setIndexes(newVisible);

    // console.log('nowVisible: ', nowVisible);
    // console.log('newVisible: ', newVisible);
    // console.log('topRenderedNow: %o, bottomRenderedNow: %o', topRendered, bottomRendered);
    if (nowVisible === null) {
      console.log('%c updateItems ===> No visible', 'color: red;');
      range(newVisible.topRendered, newVisible.bottomRendered + 1)
        .forEach(this.showItem);
      return;
    }
    console.log('%c updateItems ===> Update visible', 'color: green;');
    const minTop = Math.min(nowVisible.topRendered, newVisible.topRendered);
    const maxTop = Math.max(nowVisible.topRendered, newVisible.topRendered);
    const minBottom = Math.min(nowVisible.bottomRendered, newVisible.bottomRendered);
    const maxBottom = Math.max(nowVisible.bottomRendered, newVisible.bottomRendered);
    range(minTop, maxBottom + 1).forEach((itemIndex) => {
      if (itemIndex >= maxTop && itemIndex <= minBottom) return; // for overlaping indexes
      if (itemIndex < newVisible.topRendered || itemIndex > newVisible.bottomRendered) {
          // item out of new indexes
        this.hideItem(itemIndex);
        return;
      }
      this.showItem(itemIndex);
    });
  }
  getVisibleIndexes() {
    const nowVisible = [...this.containerNode.querySelectorAll('[data-index]')];
    if (nowVisible.length) {
      const topRendered = parseInt(nowVisible[0].dataset.index);
      const bottomRendered = parseInt(nowVisible[nowVisible.length - 1].dataset.index);
      return { topRendered, bottomRendered };
    }
    return null;
  }
  showItem = (itemIndex) => {
    this.items[itemIndex].setAttribute('data-index', itemIndex);
    this.items[itemIndex].classList.remove('hidden');
  }
  hideItem = (itemIndex) => {
    this.items[itemIndex].removeAttribute('data-index');
    this.items[itemIndex].classList.add('hidden');
  }
  setIndexes(indexes) {
    // console.log('setIndexes === === === ===> indexes');
    const { topIndex, bottomIndex, topRendered, bottomRendered } = indexes;
    this.topRendered = topRendered;
    this.bottomRendered = bottomRendered;
    this.topIndex = topIndex;
    this.bottomIndex = bottomIndex;
    // this.logIndexes();
  }
  findIndexes = () => {
    console.log('\nSmartScroll === ===> findIndexes');
    const { renderedTail, items } = this; // items

    const startIndex = this.topIndex || 0;
    // console.log('findIndexes === ===> startIndex: ', topIndex);
    let newTopIndex = null;
    let newBottomIndex = null;
    let topIndex = null;
    let bottomIndex = null;
    let topRendered = null;
    let bottomRendered = null;

    const newIndexes = () => {
      topIndex = newTopIndex;
      bottomIndex = newBottomIndex || newTopIndex;
      topRendered = (newTopIndex - renderedTail) >= 0
        ? (newTopIndex - renderedTail) : 0;
      bottomRendered = (bottomIndex + renderedTail) < items.length
        ? (bottomIndex + renderedTail) : items.length - 1;
      // console.log('now return new indexes');
      // console.log({ topIndex, bottomIndex, topRendered, bottomRendered });
      return { topIndex, bottomIndex, topRendered, bottomRendered };
    };

    const findVisible = (itemIndex) => {
      // console.log('=== === ===> try index: ', itemIndex);
      if (this.isVisible(itemIndex)) {
        // console.log('visible');
        if (newTopIndex === null) {
          // console.log('newTopIndex: ', itemIndex);
          newTopIndex = itemIndex;
        } else {
          // console.log('newBottomIndex: ', itemIndex);
          newBottomIndex = itemIndex;
        }
      } else if (newTopIndex !== null) {
        return newIndexes();
      }
      if (itemIndex + 1 < items.length && topRendered === null) {
        // console.log('will test next index');
        findVisible(itemIndex + 1);
      }
      return newIndexes();
    };
    return findVisible(startIndex);
  }
  logIndexes() {
    const { topIndex, bottomIndex, topRendered, bottomRendered } = this;
    console.log('%c\nIndexes now', 'color: green; font-weight: bold');
    console.log('%c topIndex: %o, bottomIndex: %o', 'color: green;', topIndex, bottomIndex);
    console.log('%c topRendered: %o, bottomRendered: %o', 'color: red;', topRendered, bottomRendered);
  }
// =================================================================
  findCurrentItem() {
    // return Math.round((this.topIndex + this.bottomIndex) / 2);
    return Math.floor((this.topIndex + this.bottomIndex) / 2);
  }
  setCurrentItem() {
    const { setCurrentItem } = this.props;
    const newCurrentIndex = this.findCurrentItem();
    if (this.currentIndex !== newCurrentIndex) {
      this.currentIndex = newCurrentIndex;
      setCurrentItem(this.currentIndex);
    }
  }
  scrollToItem = (itemIndex) => {
    console.log('SmartScroll === ===> scrollToItem itemIndex: ', itemIndex);
    if (itemIndex >= 0 && itemIndex < this.items.length) {
      const { offsetTop } = this.items[itemIndex];
      this.scroll.scrollTop(offsetTop);
    }
  }
// =================================================================

  getScroll = (scrollRef) => {
    if (!scrollRef) return;
    // console.log('SmartScroll ===> getScroll');
    this.scroll = scrollRef;
    this.containerNode = scrollRef.refs.container;
    this.items = [...this.containerNode.querySelectorAll(this.itemClassName)];
    this.lastIndex = this.items.lendth - 1;
    const scrollToItem = this.scrollToItem;
    const smartScroll = { ...scrollRef, scrollToItem };
    this.props.getScroll && this.props.getScroll(smartScroll);
  }
  clearProps() {
    const scrollProps = cloneDeep(this.props);
    delete scrollProps.getScroll;
    delete scrollProps.itemClassName;
    delete scrollProps.setCurrentItem;
    return scrollProps;
  }
  render() {
    const scrollProps = this.clearProps();
    return (
      <Scrollbars
        ref={this.getScroll}
        onScrollFrame={this.handleVisibility}
        {...scrollProps}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}
export default SmartScroll;
