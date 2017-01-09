import { GraphQLSchema } from 'graphql';

import QueryType from './query';
// import MutationType from './mutation';

// import {
//   TagCategoryType,
//   TagType,
//   BrandType,
//   FileType,
//   FolderType
// } from './types';

// console.log('Types: ', [TagCategoryType, TagType, BrandType, FileType, FolderType]);

export default new GraphQLSchema({
  // types: [TagCategoryType, TagType, BrandType, FolderType, FileType],
  query: QueryType
  // mutation: MutationType
});
