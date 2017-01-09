import {
  GraphQLString
} from 'graphql';

import dbx from '../../dropbox';

const testQuery = {
  type: GraphQLString,
  description: 'Test query',
  resolve: () => {
    console.log('Test request');
    return dbx.filesListFolder({
      path: '/Catalogues/',
      recursive: false,
      include_deleted: false
    })
    .then((res) => {
      console.log('\nDropbox response: ', res);
      return res;
    })
    .catch((err) => {
      console.log('\nDropbox error: ', err);
      return `Dropbox error: ${err.error}`;
    });
    // return 'str';
  }
};

export default testQuery;
