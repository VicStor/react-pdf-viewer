import React, { Component } from 'react';

export const previewTypes = ['jpeg', 'jpg', 'pdf', 'png'];

export const getInnerHeight = (node) => {
  const { clientHeight } = node;
  const { paddingTop, paddingBottom } = global.getComputedStyle(node);
  return clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
};

export const getInnerWidth = (node) => {
  const { offsetWidth, clientWidth } = node;
  const scrollWidth = offsetWidth - clientWidth;
  const { paddingLeft, paddingRight } = global.getComputedStyle(node);
  return clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight) - scrollWidth;
};

export const getInnerSize = (node) => {
  const width = getInnerWidth(node);
  const height = getInnerHeight(node);
  return { width, height };
};

export const getNodeSize = (node) => {
  const { clientWidth, clientHeight } = node;
  return { width: clientWidth, height: clientHeight };
};

export const Button = ({
  dest,
  type,
  color,
  active,
  onClick
}) => (
  <button
    className={`button ${dest} ${type}${active ? ' active' : ''}`}
    onClick={
      (e) => {
        e.stopPropagation();
        onClick();
      }}
  >
    <svg viewBox='0 0 42 42' className={`svgbutton ${color} ${type}`}>
      <use xlinkHref={`#${type}`} />
    </svg>
  </button>
);
export const ListButtonDark = ({
  type,
  active,
  onClick
}) => (
  <Button
    dest='list-button'
    color='dark'
    type={type}
    active={active}
    onClick={onClick}
  />
);
export const MenuButtonDark = ({
  type,
  active,
  onClick
}) => (
  <Button
    dest='menu-button'
    color='dark'
    type={type}
    active={active}
    onClick={onClick}
  />
);
export const MenuButtonLight = ({
  type,
  active,
  onClick
}) => (
  <Button
    dest='menu-button'
    color='light'
    type={type}
    active={active}
    onClick={onClick}
  />
);
export const Overlay = ({ className, children }) => (
  <div
    className={['height-max width-max absolute', className].join(' ')}
  >
    {children}
  </div>
);

export class InputButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      input: ''
    };
    this.main = this.props.buttons.main || this.props.buttons.left;
    this.left = this.props.buttons.left;
    this.right = this.props.buttons.right;
  }
  onRightButtonClick(stdFn) {
    !!this.props.onRightClick && this.props.onRightClick();
    !!stdFn && stdFn();
  }
  onLeftButtonClick(stdFn) {
    !!this.props.onLeftClick && this.props.onLeftClick();
    !!stdFn && stdFn();
  }
  onInputChange = (e) => {
    !!this.props.onInputChange && this.props.onInputChange(e.target.value);
  }

  closed() {
    return (
      <Button
        type={this.main}
        dest={this.props.dest}
        color={this.props.color}
        onClick={this.openInput}
      />
    );
  }
  opened() {
    return (
      <div className='input-button flex-none f-row-now a_i-center'>
        {this.left && this.makeButton('left')}
        <input
          type={this.props.input.type}
          placeholder={this.props.input.placeholder}
          maxLength={this.props.input.maxLength}
          className={this.props.input.className}
          onChange={this.onInputChange}
        />
        {this.right && this.makeButton('right')}
      </div>
    );
  }
  openInput = () => {
    this.setState({ isOpen: true });
  }
  closeInput = () => {
    this.setState({ isOpen: false, input: '' });
    this.props.onInputChange('');
  }

  makeButton(type) {
    const fn = this[type] === 'close' && this.closeInput;
    return (
      <Button
        type={this[type]}
        dest={this.props.dest}
        color={this.props.color}
        onClick={() => {
          type === 'left' && this.onLeftButtonClick(fn);
          type === 'right' && this.onRightButtonClick(fn);
        }}
      />
    );
  }

  render() {
    return (
      this.state.isOpen ? this.opened() : this.closed()
    );
  }
}

export const TextButton = ({
  buttonText,
  disabled,
  isWaiting,
  onClick
}) => (
  <button
    className={`text-button d_f a_i-center j_c-center${disabled ? ' disabled' : ''}`}
    onClick={onClick}
  >
    {isWaiting
      ?
        <div className='spinner flex-none f-row-now a_i-center j_c-between'>
          <div className='rect1 flex-none' />
          <div className='rect2 flex-none' />
          <div className='rect3 flex-none' />
          <div className='rect4 flex-none' />
          <div className='rect5 flex-none' />
        </div>
      : <span className='btn-text'>{buttonText}</span>
    }
  </button>
);

export const SoftImg = ({
  containerClassName,
  imageClassName,
  src,
  alt
}) => {
  const imgSrc =
    (min = false) => `http://media.any.furniture/catalogues/thumbnails/thumbnail${min ? '_min' : ''}/${src}.jpg`;

  const addLoaded = e => e.target.classList.add('loaded');

  const className = (str = '') => str;

  return (
    <div className={className(containerClassName)}>
      <img
        className={`${className(imageClassName)} min`}
        alt={alt}
        src={imgSrc(true)}
        onLoad={addLoaded}
      />
      <img
        className={className(imageClassName)}
        alt={alt}
        src={imgSrc()}
        onLoad={addLoaded}
      />
    </div>
  );
};

export const toArray = (str) => {
  if (str) {
    return str
      .split(',')
      .map(elem => parseInt(elem));
  }
  return [];
};
// ------------------------------------------------- изменяем массив без мутаций
export const remove = (array, index) => (
  [
    ...array.slice(0, index),
    ...array.slice(index + 1)
  ]
);
export const modify = (array, index, callback) => (
  [
    ...array.slice(0, index),
    callback(array[index]),
    ...array.slice(index + 1)
  ]
);
// ------------------------------------------------- Ссылки
export const strToLink = str => str.replace(/ /g, '+');
export const linkToStr = link => link.replace(/\+/g, ' ');
// ------------------------------------------------- mapCurrent
export const mapCurrentToProps = ({ current }) => {
  const { headerState, path, makerNews, makerCards, isFetching } = current;
  const maker = path[0];
  return {
    maker,
    path,
    headerState,
    makerNews,
    makerCards,
    isFetching
  };
};
export const timeConverter = (timeStamp) => {
  const a = new Date(timeStamp);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  // const hour = a.getHours();
  // const min = a.getMinutes();
  // const sec = a.getSeconds();
  return `${date} ${month} ${year}`;
};

export function type(typeObj) {
  const type = Object.keys(typeObj)[0];
  return typeof typeObj[type] === type;
}
