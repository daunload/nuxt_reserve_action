import { Schema, Document, model, InferSchemaType } from 'mongoose';

export interface User extends Document {
	email: string;
	name: string;
}

const UserSchema: Schema = new Schema({
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true },
});

export type Schedule = InferSchemaType<typeof UserSchema>;
export const UserModel = model<User>('User', UserSchema);
