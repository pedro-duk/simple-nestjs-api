import mongoose from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { versionKey: false },
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
