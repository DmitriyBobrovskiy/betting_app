import { DataTypes, Sequelize } from "sequelize";
import { User } from "./user";
import logger from "../utils/logger";
import { Bet } from "./bet";
import config from "../config";

const Database = new Sequelize({
                                  dialect: "postgres",
                                  username: config.dbUsername,
                                  password: config.dbPassword,
                                  host: config.dbHost,
                                  port: config.dbPort,
                                  database: config.dbDatabase,
                                  logging: (msg) => logger.verbose(`[POSTGRES] ${msg}`)
                              });

User.init({
              id: {
                  type: DataTypes.INTEGER.UNSIGNED,
                  primaryKey: true
              },
              balance: {
                  type: DataTypes.DECIMAL
              },
              name: {
                  type: DataTypes.STRING
              },
          }, {
              sequelize: Database,
              tableName: "users"
          });

// although it's said that balance and other stuff is float,
// but float has much less precision that decimal and
// in money related questions it matters a lot, so I used decimal

Bet.init({
             id: {
                 type: DataTypes.INTEGER.UNSIGNED,
                 primaryKey: true,
                 autoIncrement: true
             },
             userId: {
                 type: DataTypes.INTEGER.UNSIGNED,
                 allowNull: false,
                 references: {
                     model: User,
                     key: "id",
                 },
             },
             win: {
                 type: DataTypes.BOOLEAN
             },
             payout: {
                 type: DataTypes.DECIMAL
             },
             chance: {
                 type: DataTypes.DECIMAL
             },
             betAmount: {
                 type: DataTypes.DECIMAL
             }
         }, {
             sequelize: Database,
             tableName: "bets"
         });


export default Database;
