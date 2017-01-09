import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

export const fileType = new GraphQLObjectType({
  name: 'fileType',
  description: 'File type',
  fields: () => ({
    dbId: {
      type: GraphQLString,
      resolve: file => file.dbId
    },
    dbLink: {
      type: GraphQLString,
      resolve: file => file.dbLink
    },
    fileName: {
      type: GraphQLString,
      resolve: file => file.fileName
    },
    docName: {
      type: GraphQLString,
      resolve: file => file.docName
    }
  })
});
