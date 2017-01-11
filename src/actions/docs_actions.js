import 'rxjs';

export const REQUEST_DOCS = 'REQUEST_DOCS';
export const RECEIVE_DOCS = 'RECEIVE_DOCS';

export const requestDocs = () => ({ type: REQUEST_DOCS });

const receiveDocs = docList => ({
  type: RECEIVE_DOCS,
  docList
});

export const fetchDocs = action$ => action$
    .ofType(REQUEST_DOCS)
    .delay(500)
    .mapTo(receiveDocs(fakeFiles));
    // .mergeMap(action => ajax
    //   .getJSON(`https://api.github.com/users/${action.payload}`)
    //   .map(docList => receiveDocs(docList)));

const fakeFiles = [
  {
    dbId: 'test dbId1',
    dbLink: 'https://dl.dropboxusercontent.com/u/30395115/In%20The%20Wood%202015.pdf',
    fileName: 'test fileName1',
    docName: 'In The Wood 2015.pdf',
    thumbnail: 'https://dl.dropboxusercontent.com/u/30395115/Cats/1.jpg'
  },
  {
    dbId: 'test dbId2',
    dbLink: 'https://dl.dropboxusercontent.com/u/30395115/LIFESTYLE%202015.pdf',
    fileName: 'test fileName2',
    docName: 'LIFESTYLE 2015.pdf',
    thumbnail: 'https://dl.dropboxusercontent.com/u/30395115/Cats/2.jpg'
  },
  {
    dbId: 'test dbId3',
    dbLink: 'https://dl.dropboxusercontent.com/u/30395115/catalogo.pdf',
    fileName: 'test fileName3',
    docName: 'Catalogo.pdf',
    thumbnail: 'https://dl.dropboxusercontent.com/u/30395115/Cats/3.jpg'
  }
];
