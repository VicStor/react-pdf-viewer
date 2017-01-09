import React from 'react';
import Toggle from 'material-ui/Toggle';

import SidebarSection from './sidebar_section';
import Form from '../helpers/form';
import Input from '../helpers/input';

const SideMenu = ({ renderToggleHandler, renderToSvg, setPreviewURI }) => (
  <div className='demo-menu m_l-20 fn'>
    <SidebarSection
      headerPrimary='Viewer render properties'
      headerSecondary='Select viewer properties for demo'
      className='fcn'
    >
      <div className='sb-input w-max'>
        <Form
          className='frn'
          onSubmit={(inputs) => {
            console.log('Form inputs: ', inputs);
            setPreviewURI(inputs.pdfURI);
          }}
        >
          <Input
            name='pdfURI'
            className='input fm m_r-10 prim-light'
            type='text'
            placeholder='URI of pdf document'
          />
          <button
            type='submit'
            className='button text-button prim-dark fn'
          >
            <span className='btn-text'>GO</span>
          </button>
        </Form>
      </div>
      <div className='sb-input w-max'>
        <div>Select render option</div>
        <div className='frn jcc'>
          <div className='fn'>CANVAS</div>
          <div className='fn m_r-10'>
            <Toggle
              onToggle={renderToggleHandler}
              toggled={renderToSvg}
            />
          </div>
          <div className='fn'>SVG</div>
        </div>
      </div>
    </SidebarSection>

    <SidebarSection
      headerPrimary='Upload your document'
      headerSecondary='Drag your document to the container'
    >
      <div>
        <p>Drop zone</p>
      </div>
    </SidebarSection>
  </div>
);
SideMenu.propTypes = {
  renderToggleHandler: React.PropTypes.function,
  renderToSvg: React.PropTypes.function,
  setPreviewURI: React.PropTypes.function
};
export default SideMenu;
