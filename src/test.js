import React, { Component } from 'react';
import { fetchData } from './actions';

// const { stateProp1, stateProp2 } = {};

// @pass({ prop1, prop2, fetchData })
class App extends Component {
  render() {
    const { articles, search } = this.props;

    return (
      <div>
        <label>
          Wiki search: <input type='text' onChange={e => search(e.target.value)} />
        </label>

        { articles && (
          <ul>
            { articles.map(({ title, url }) => (
              <li><a href={url}>{title}</a></li>
            )) }
          </ul>)
        }
      </div>
    );
  }
}
// let App = () => {}
// class $App extends Component{}
// App = {
//   ...App,
//   connect
// };

// const app = Object.assign(App, connect);

// app props
// -------------------
// ------------connect
// reduxStateProps
// selfStateProps
// actionCreatorsProps
// ---------invocation
// invocationProps
//

// return App.connect({ stateProp1, stateProp2, fetchData });

// export default App.connect({
//   appProp1: 'storeProp1',
//   appProp2: 'storeProp2',
//   fetchData, // action creator
//   search // rxJS
// });


export default connect({
  appProp1: 'storeProp1',
  appProp2: 'storeProp2',
  fetchData, // action creator
  search // rxJS
})(App);
// return connect(storeProps)(App);

const search = (eventData) => {
  // search stream of events --> make request, recieve responce --> dispatch responce
  const search = new Rx.Subject();
  search
    .debounce(500)
    .pluck(0)
    .flatMapLatest(eventData => searchWikipedia(search).startWith(undefined)) // <-- clear articles before we receive the response
    .dispatch(responce => receiveResponce(response));

  return search;
// const search = dispatch => event => {
  // dispatch(requestCards(object));
  // return axios
  //   .post(
  //     makeURL('/dropboxAPI/folder_list_new.php'),
  //     `params=${JSON.stringify(object)}`
  //   )
  //   .then(response => response.data)
  //   .then(cards => dispatch(receiveCards(cards));
// }
};

// props = {
//   appProp1: undefined || String,
//   appProp2: undefined || String,
//   appAction: function
// }
function type(typeObj) {
  const type = Object.keys(typeObj)[0];
  return typeof typeObj[type] === type;
  // types
  //   .map(type => typeof typeObj[type] === type)
  //   .some(type => type === true)
  //   .every(type => type === true)
}
const connect = props => (Component) => {
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

  const mapStateToProps = state => Object
    .keys(stateProps)
    .reduce((props, prop) => {
      const newProp = {};
      newProp[prop] = state[prop];
      return ({
        ...props,
        newProp
      });
    }, {});

  const mapDispatchToProps = (dispatch) => {
    const newProps = Object
      .keys(dispatchProps)
      .reduce((props, prop) => {
        const newProp = {};
        newProp[prop] = dispatch(dispatchProps[prop]);
        return ({
          ...props,
          newProp
        });
      }, {});

    return bindActionCreators(newProps, dispatch);
  };

  return connect(mapStateToProps, mapDispatchToProps)(Component);
};

const connect = (props) => {
  const connect = (props) => {
    // props = {
    //   appProp1: undefined || String,
    //   appProp2: undefined || String,
    //   appAction: function
    // }

    Object.keys(props)
      .map((appProp) => {
        if (type({ undefined: props[appProp] }) || type({ string: props[appProp] })) {

          // take from store.getState()
        }
        if (typeof props[appProp] === Function) {
          // dispatch(props[appProp])
          // pass as it is if .despatch
        }
        return null;
      });
  };
  // for each type of function action1 = store.dispatch(action1);

  // this === Component;
  // state = store.getSate();
  // dispatch = store.dispatch()

  return ({
    connect
  });
};
