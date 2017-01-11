import React from 'react';

const DocCard = ({ docName, thumbnail, dbLink, onClick }) => (
  <button
    className='card btn container raised fn rel'
    onClick={() => { onClick(dbLink); }}
  >
    <div className='w-max h-max'>
      <img className='of-cover w-max h-max abs left_0 top_0' src={thumbnail} alt={docName} />
    </div>
    <div className='caption prim-light abs left_0 bottom_0 w-max'>
      <p className=''>{docName}</p>
    </div>
  </button>
);

DocCard.propTypes = {
  docName: React.PropTypes.string,
  thumbnail: React.PropTypes.string,
  dbLink: React.PropTypes.string,
  onClick: React.PropTypes.func
};

export default DocCard;
// dbId: 'test dbId2',
// dbLink: 'https://dl.dropboxusercontent.com/u/30395115/LIFESTYLE%202015.pdf',
// fileName: 'test fileName2',
// docName: 'LIFESTYLE 2015.pdf',
// thumbnail: 'https://dl.d
