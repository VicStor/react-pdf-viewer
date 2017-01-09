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
    .delay(2000)
    .mapTo(receiveDocs(fakeFiles));
    // .mergeMap(action => ajax
    //   .getJSON(`https://api.github.com/users/${action.payload}`)
    //   .map(docList => receiveDocs(docList)));

const fakeFiles = [
  {
    dbId: 'test dbId1',
    dbLink: 'test dbLink1',
    fileName: 'test fileName1',
    docName: 'test docName1'
  },
  {
    dbId: 'test dbId2',
    dbLink: 'test dbLink2',
    fileName: 'test fileName2',
    docName: 'test docName2'
  },
  {
    dbId: 'test dbId3',
    dbLink: 'test dbLink3',
    fileName: 'test fileName3',
    docName: 'test docName3'
  }
];
