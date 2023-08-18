import { Bet } from "../models/bet";
import * as UserRepository from "../storage/user-repository";
import * as BetRepository from "../storage/bet-repository";
import { adjectives, animals, colors, uniqueNamesGenerator } from "unique-names-generator";
import logger from "../utils/logger";

interface GetBetQuery {
    id: number;
}

interface GetBestBetPerUserQuery {
    limit: number;
}

interface CreateBetMutation {
    userId: number | undefined,
    betAmount: number | undefined,
    chance: number | undefined
}

const BetResolvers = {
    Query: {
        getBet: async (_: any, args: GetBetQuery): Promise<Bet> => {
            let bet = await BetRepository.get(args.id);
            if (!bet) {
                throw Error(`Bet with id ${args.id} is not found.`);
            }
            return bet;
        },
        getBetList: async (_: any): Promise<Bet[]> => {
            return await BetRepository.getAll();
        },
        getBestBetPerUser: async (_: any, args: GetBestBetPerUserQuery): Promise<Bet[]> => {
            return await BetRepository.getBestBetPerUser(args.limit);
        },
    },
    Mutation: {
        createBet: async (_: any, args: CreateBetMutation): Promise<Bet> => {
            if (!args.userId) {
                throw Error("UserId should be an integer, but nothing is provided");
            }
            if (!args.betAmount) {
                throw Error("UserId should be a float number, but nothing is provided");
            }
            if (!args.chance || args.chance < 0 || args.chance > 100) {
                throw Error("Chance should be provided as a number from 0 to 100");
            }

            let user = await UserRepository.get(args.userId);

            if (!user) {
                const randomName = uniqueNamesGenerator({
                                                            dictionaries: [adjectives, colors, animals],
                                                            style: "capital",
                                                            separator: " "
                                                        });
                user = await UserRepository.create(args.userId, randomName, 0.00);
                logger.info(`New user created with id ${user.id}`);
            }

            // Simulate the roll of the dice using Math.random()
            const roll = Math.random() * 100;

            // Calculate win based on chance
            const win = roll <= args.chance;

            // Calculate payout
            const payout = win ? args.betAmount * (100 / args.chance) : 0;

            // Create the bet
            const bet = await BetRepository.create(
                args.userId,
                args.betAmount,
                args.chance,
                payout,
                win,
            );

            if (win) {
                // Increase user balance if it's a win
                await UserRepository.increaseBalance(user, payout);
            } else {
                // Decrease user balance if it's a loss
                await UserRepository.decreaseBalance(user, args.betAmount);
            }

            logger.info(`New bet created with id ${bet.id}`);
            return {
                id: bet.id,
                betAmount: bet.betAmount,
                win: bet.win,
                payout: bet.payout,
                chance: bet.chance,
                userId: bet.userId
            };
        }
    }
};

export default BetResolvers;
