import { User } from "../models/user";
import * as UserRepository from "../storage/user-repository";

interface UserQuery {
    id: number | undefined;
}

const UserResolvers = {
    Query: {
        getUser: async (_: any, args: UserQuery): Promise<User> => {
            if (!args.id) {
                throw Error("UserId should be an integer, but nothing is provided");
            }
            let user = await UserRepository.get(args.id);

            if (!user) {
                throw Error(`User with id: ${args.id} is not found.`);
            }

            return user;
        },
        getUserList: async (_: any): Promise<User[]> => {
            return await UserRepository.getAll();
        }
    }
};

export default UserResolvers;
