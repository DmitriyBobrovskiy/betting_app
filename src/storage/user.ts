import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: number;
    declare name: string;
    declare balance: number;
}
