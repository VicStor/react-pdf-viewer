import React, { Component } from 'react';
import { isEqual } from 'lodash';

export default function (WrappedComponent) {
  class WrapperComponent extends Component {
    shouldComponentUpdate(nextProps) {
      return !isEqual(nextProps, this.props);
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return WrapperComponent;
}
