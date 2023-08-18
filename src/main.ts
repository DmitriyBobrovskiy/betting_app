import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schema/schema";
import { merge } from "lodash";
import UserResolvers from "./resolvers/user-resolvers";
import BetResolvers from "./resolvers/bet-resolvers";
import Database from "./storage/database";
import logger from "./utils/logger";

async function main() {
    const combinedResolvers = merge(UserResolvers, BetResolvers);
    const server = new ApolloServer({
                                        typeDefs,
                                        resolvers: combinedResolvers,
                                    });

    await Database.sync();

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    logger.info(`🚀  Server ready at: ${url}`);
}

main().catch(error => {
    logger.error("An error occurred:", error);
});
