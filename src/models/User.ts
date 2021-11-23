import { Schema, model, connect, ObjectId } from 'mongoose';
import type { IGuest } from './Guest';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();
const saltRounds: number = 10;

const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 60000,
};
const uri = process.env['VITE_MONGO_URI'];
connect(uri, options);
export interface User {
    _id?: ObjectId;
    email?: string;
    password?: string;
    manager?: boolean;
    token?: string;

    guest?: ObjectId | IGuest;

    register?(email: string, password: string): Promise<User>;
    login?(email: string, password: string): Promise<User>;
    checkToken?(token: string): Promise<User>;
}

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    guest: { type: 'ObjectId', ref: 'Guest', required: false },
    manager: { type: Boolean, required: true, default: false },
    token: { type: String, unique: true},
});
UserSchema.index({ email: 1 });

UserSchema.methods.register = async function (email: string, password: string): Promise<User> {
    const hashedPass = await bcrypt.hash(password, saltRounds);

    const token = uuidv4();

    const newDoc: User = {
        email,
        password: hashedPass,
        token,
    };

    const newUser = new UserModel(newDoc);
    const savedUser: User = await newUser.save();
    return savedUser;
}

UserSchema.methods.login = async function (email: string, password: string): Promise<boolean>  {
    const checkUser: User = await UserModel.findOne({
        email
    });
    const checkPass: boolean = await bcrypt.compare(password, checkUser.password);
    return checkPass;
}

UserSchema.methods.checkToken = async function (token: string): Promise<User> {
    const user: User = await UserModel.findOne({
        token
    });
    return user;
}

export const UserModel = model<User>('User', UserSchema);
