import React from 'react';
import { render } from 'react-dom';

import Viewer from './pdf_viewer';

render(
  <Viewer
    docLink='https://dl.dropboxusercontent.com/u/30395115/In%20The%20Wood%202015.pdf'
  />
  , global.document.getElementById('app-container'));
