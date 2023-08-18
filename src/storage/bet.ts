import { ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export class Bet extends Model<InferAttributes<Bet>, InferCreationAttributes<Bet>> {
    declare id: number;
    declare userId: ForeignKey<number>;
    declare betAmount: number;
    declare chance: number;
    declare payout: number;
    declare win: boolean;
}
