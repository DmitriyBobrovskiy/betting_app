import { Bet } from "./bet";
import { QueryTypes } from "sequelize";
import Database from "./database";

export async function create(userId: number, betAmount: number, chance: number, payout: number, win: boolean): Promise<Bet> {
    // TODO: should be handled better way than just suppressing
    // @ts-ignore - id field is auto-increment
    return await Bet.create({
                                userId: userId,
                                betAmount: betAmount,
                                chance: chance,
                                win: win,
                                payout: payout
                            });
}

export async function get(id: number): Promise<Bet | null> {
    return await Bet.findOne({where: {id: id}});
}

export async function getAll(): Promise<Bet[]> {
    return await Bet.findAll();
}

export async function getBestBetPerUser(limit: number | undefined): Promise<Bet[]> {
    let query = `
        SELECT DISTINCT ON (b."userId") b.*
        FROM "bets" b
        ORDER BY b."userId", b."payout" DESC
    `;

    if (limit) {
        query += `LIMIT :limit;
        `;
    }

    return await Database.query(query, {
        replacements: {limit: limit},
        type: QueryTypes.SELECT,
        mapToModel: true,
        model: Bet,
    });
}
