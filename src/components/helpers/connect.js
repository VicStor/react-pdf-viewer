import { connect as rConnect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { type } from './';

// export function type(typeObj) {
//   const type = Object.keys(typeObj)[0];
//   return typeof typeObj[type] === type;
// }

export const connect = props => (Component) => {
  const componentProps = Object.keys(props);

  const stateProps = {};
  const dispatchProps = {};

  componentProps.forEach((prop) => {
    if (type({ undefined: props[prop] }) || type({ string: props[prop] })) {
      stateProps[prop] =
        type({ string: props[prop] })
        ? props[prop]
        : prop;
      return;
    }
    if (type({ function: props[prop] })) {
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
