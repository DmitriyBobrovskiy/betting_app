import { User } from "./user";

export async function create(id: number, name: string, balance: number): Promise<User> {
    return await User.create({
                          balance: balance,
                          id: id,
                          name: name
                      });
}

export async function get(id: number): Promise<User | null> {
    return await User.findOne({where: {id: id}});
}

export async function getAll(): Promise<User[]> {
    return await User.findAll();
}

export async function increaseBalance(user: User, amount: number): Promise<void> {
    await user.increment('balance', {by: amount});
}

export async function decreaseBalance(user: User, amount: number): Promise<void> {
    await user.decrement('balance', {by: amount});
}
