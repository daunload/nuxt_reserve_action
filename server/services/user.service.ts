import { User, UserModel } from '../models/user.model';

export const findUserByEmail = async (email: string): Promise<User | null> => {
	return await UserModel.findOne({ email });
};
