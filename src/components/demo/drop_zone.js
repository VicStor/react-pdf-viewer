import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class DropZone extends Component {
  constructor() {
    super();
    this.state = {
      file: null
    };
  }
  handleChange = (event) => {
    console.log('Selected file:', event.target.files[0]);
  }
  handleDrop = (acceptedFiles) => {
    console.log('handleDrop');
    console.log('Event:', acceptedFiles);
    this.setState({ files: acceptedFiles });
  }
  handleDragEnter = () => {
    console.log('handlerDragEnter');
  }
  handleDragLeave = () => {
    console.log('handlerDragLeave');
  }
  render() {
    const { handleDrop, handleDragEnter, handleDragLeave, handleChange } = this;
    return (
      <Dropzone
        className='card container raised fn rel'
        onDrop={handleDrop}
      >
        <div className='w-max h-max df jcc aic'>
          <p>Drop your pdf file</p>
        </div>
      </Dropzone>
    );
  }
}

DropZone.propTypes = {
  // docName: React.PropTypes.string,
  // thumbnail: React.PropTypes.string,
  // dbLink: React.PropTypes.string,
  // onClick: React.PropTypes.func
};

export default DropZone;
