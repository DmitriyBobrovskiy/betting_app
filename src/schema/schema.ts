// if it gets too big it can be split to multiple files
// that's why folder is called schema

const typeDefs = `#graphql
    type User {
        id: Int!
        name: String
        balance: Float
    }
    type Bet {
        id: Int!,
        userId: Int!,
        betAmount: Float,
        chance: Float,
        payout: Float,
        win: Boolean
    }
    
    type Query {
        getUser(id: Int!): User
        getUserList: [User!]
        
        getBet(id: Int!): Bet
        getBetList: [Bet!]
        getBestBetPerUser(limit: Int): [Bet!]
    }
    
    type Mutation {
        createBet(userId: Int, betAmount: Float, chance: Float): Bet
    }
`;

export default typeDefs;
