import { connect as rConnect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { typeOf, someTypeOf } from 'type-check-easy';

export const connect = props => (Component) => {
  const componentProps = Object.keys(props);

  const stateProps = {};
  const dispatchProps = {};
// typeOf({ undefined: props[prop] }) || typeOf({ string: props[prop] })
  componentProps.forEach((prop) => {
    if (someTypeOf({
      undefined: props[prop],
      string: props[prop]
    })) {
      stateProps[prop] =
        typeOf({ string: props[prop] })
        ? props[prop]
        : prop;
      return;
    }
    if (typeOf({ function: props[prop] })) {
      dispatchProps[prop] = props[prop];
    }
  });

  // console.log('stateProps ', stateProps);
  // console.log('dispatchProps ', dispatchProps);

  const mapStateToProps = (state) => {
    const newProps = Object
      .keys(stateProps)
      .reduce((props, prop) => {
        // console.log('props: ', props);
        // console.log('prop: ', prop);
        const newProp = {};
        newProp[prop] = state[prop];
        return Object.assign(props, newProp);
      }, {});

    // console.log('mapStateToProps ', newProps);
    return newProps;
  };


  const mapDispatchToProps = (dispatch) => {
    const newProps = Object
      .keys(dispatchProps)
      .reduce((props, prop) => {
        const newProp = {};
        // console.log('props: ', props);
        // console.log('prop: ', prop);
        // console.log('function: ', dispatchProps[prop]);
        newProp[prop] = dispatchProps[prop];
        return Object.assign(props, newProp);
      }, {});
    // console.log('mapDispatchToProps ', newProps);
    return bindActionCreators(newProps, dispatch);
  };

  return rConnect(mapStateToProps, mapDispatchToProps)(Component);
};
