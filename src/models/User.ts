import { Schema, model, connect } from 'mongoose';
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
const uri = process.env['MONGODB_URI'];
connect(uri, options);

interface User {
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

userSchema.methods.register = async function (email: string, password: string) {
    const hashedPass = await bcrypt.hash(password, saltRounds);
    const newDoc: User = {
        email: email,
        password: hashedPass
    };
    const newUser = new UserModel(newDoc);
    newUser.save();
    // return something to signify the user is signed in
}

userSchema.methods.login = async function (email: string, password: string) {

}

const UserModel = model<User>('User', userSchema);
