import { Schema, model, connect, ObjectId } from 'mongoose';
import type { IGuest } from './Guest';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import * as cookie from 'cookie';
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
    email: string;
    password: string;
    rToken?: string;
    token?: string;

    guest?: ObjectId | IGuest;

    register?(email: string, password: string): Promise<User>;
    login?(email: string, password: string): Promise<boolean>;
    checkToken?(token: string): Promise<boolean>;
    // refreshToken?(rToken: string): Promise<string>;
}

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    guest: { type: 'ObjectId', ref: 'Guest', required: false },
    // rToken: { type: String, unique: true},
    token: { type: String, unique: true},
});
UserSchema.index({ email: 1 });

UserSchema.methods.register = async function (email: string, password: string): Promise<User> {
    const hashedPass = await bcrypt.hash(password, saltRounds);

    const token = uuidv4();
    // const rToken = uuidv4();

    console.log(`token: ${token}`);
    

    const newDoc: User = {
        email,
        password: hashedPass,
        token,
        // rToken,
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

export const UserModel = model<User>('User', UserSchema);
