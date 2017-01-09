import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './header';

const App = ({ children }) => (
  <MuiThemeProvider>
    <div className='h-max w-max fcn aic'>
      <Header />
      {children}
    </div>
  </MuiThemeProvider>
);

export default App;

App.propTypes = {
  children: React.PropTypes.element
};
