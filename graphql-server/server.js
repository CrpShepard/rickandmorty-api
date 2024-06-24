const { ApolloServer, gql } = require('apollo-server');

let characters = [
  { id: '1', name: 'Rick Sanchez', gender: 'Male', status: 'Alive', species: 'Human' },
  { id: '2', name: 'Morty Smith', gender: 'Male', status: 'Alive', species: 'Human' },
];

const typeDefs = gql`
  type Character {
    id: ID!
    name: String!
    gender: String!
    status: String!
    species: String!
  }

  type Query {
    characters: [Character]
  }

  type Mutation {
    addCharacter(name: String!, gender: String!, status: String!, species: String!): Character
    deleteCharacter(id: ID!): Character
  }
`;

const resolvers = {
  Query: {
    characters: () => characters,
  },
  Mutation: {
    addCharacter: (_, { name, gender, status, species }) => {
      const newCharacter = { id: String(characters.length + 1), name, gender, status, species };
      characters.push(newCharacter);
      return newCharacter;
    },
    deleteCharacter: (_, { id }) => {
      const characterIndex = characters.findIndex(char => char.id === id);
      if (characterIndex > -1) {
        return characters.splice(characterIndex, 1)[0];
      }
      return null;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
