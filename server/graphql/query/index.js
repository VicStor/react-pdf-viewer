import {
  GraphQLObjectType
} from 'graphql';

import testQuery from './test_query';
import getFileList from './get_filelist';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query type',
  fields: () => ({
    testQuery,
    getFileList
  })
});

export default QueryType;
