import { Schema, model, connect, ObjectId } from 'mongoose';
import type { IGuest } from './Guest';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
const saltRounds: number = 10;

const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 60000,
};
const uri = process.env['VITE_MONGO_URI'];
connect(uri, options);

interface User {
    _id?: ObjectId,
    email: string,
    password: string,
    guest?: IGuest,
}

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    guest: { type: 'ObjectId', ref: 'Guest', required: true },
});

userSchema.index({ email: 1 });

userSchema.methods.register = async function (email: string, password: string): Promise<User> {
    const hashedPass = await bcrypt.hash(password, saltRounds);
    const newDoc: User = {
        email: email,
        password: hashedPass
    };
    const newUser = new UserModel(newDoc);
    const savedUser: User = await newUser.save();
    return savedUser;
}

userSchema.methods.login = async function (email: string, password: string): Promise<boolean>  {
    const checkUser: User = await UserModel.findOne({
        email: email
    });
    const checkPass: boolean = await bcrypt.compare(password, checkUser.password);
    return checkPass;
}

export const UserModel = model<User>('User', userSchema);
