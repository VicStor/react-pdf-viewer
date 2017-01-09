import {
  GraphQLList
} from 'graphql';

import { fileType } from '../types';
import fakeFiles from '../fake_data';
// import models from '../../models';

const getFileList = {
  type: new GraphQLList(fileType),
  description: 'Test query',
  resolve: () => fakeFiles
};

export default getFileList;
