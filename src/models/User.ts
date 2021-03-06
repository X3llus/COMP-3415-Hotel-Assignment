import { Schema, model, connect, ObjectId } from 'mongoose';
import { Address, Guest, GuestModel } from './Guest';
import bcrypt, { genSalt } from 'bcrypt';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();
const saltRounds: number = 10;

const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 60000,
};
const uri = process.env['MONGO_URI'];

connect(uri, options);
export interface User {
    email?: string;
    password?: string;
    manager?: boolean;
    token?: string;

    guest?: ObjectId | Guest;

    register?(email: string, password: string, fName: string, lName: string, title: string, phoneNum: string, address: Address): Promise<User>;
    guestSignin?(email: string, password: string): Promise<User>;
    managerSignin?(email: string, password: string): Promise<User>;
    getUsingToken?(token: string): Promise<User>;
    checkToken?(token: string): Promise<boolean>;
    registerManager?(email: string, password: string): Promise<boolean>;
    checkManager?(token: string): Promise<boolean>
}

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    guest: { type: 'ObjectId', ref: 'Guest', required: false },
    manager: { type: Boolean, required: true, default: false },
    token: { type: String, unique: true},
});
UserSchema.index({ email: 1 });

UserSchema.methods.register = async function (email: string, password: string, fName: string, lName: string, title: string, phoneNum: string, address: Address): Promise<User> {
    const salt = await genSalt(saltRounds);
    const hashedPass = await bcrypt.hash(password, salt);

    const token = uuidv4();

    const newGDoc: Guest = {
        fName,
        lName,
        title,
        phoneNum,
        address: `${address.street}, ${address.city}, ${address.province} ${address.postal}, ${address.country}`,
    }

    const newGuest = new GuestModel(newGDoc);
    const savedGuest: Guest = await newGuest.save();

    const newDoc: User = {
        email,
        password: hashedPass,
        token,
        guest: savedGuest
    };

    const newUser = new UserModel(newDoc);
    const savedUser: User = await newUser.save();
    return savedUser;
}

UserSchema.methods.guestSignin = async function (email: string, password: string): Promise<User>  {
    const checkUser: User = await UserModel.findOne({
        email,
        manager: false
    });
    console.log(await bcrypt.compare(password, checkUser.password));
    const checkPass: boolean = await bcrypt.compare(password, checkUser.password);
    console.log(checkPass);

    if (checkPass) {
        return checkUser;
    }
    return null;
}

UserSchema.methods.managerSignin = async function (email: string, password: string): Promise<User>  {
    const checkUser: User = await UserModel.findOne({
        email,
        manager: true
    });
    console.log(await bcrypt.compare(password, checkUser.password));
    const checkPass: boolean = await bcrypt.compare(password, checkUser.password);
    console.log(checkPass);

    if (checkPass) {
        return checkUser;
    }
    return null;
}

UserSchema.methods.getUsingToken = async function (token: string): Promise<User> {
    const user: User = await UserModel.findOne({
        token
    }).populate('guest');
    return user;
}

UserSchema.methods.checkToken = async function (token: string): Promise<boolean> {
    const user: User = await UserModel.findOne({
        token
    });
    return (user != null);
}

UserSchema.methods.registerManager = async function (email: string, password: string): Promise<boolean> {
    const salt = await genSalt(saltRounds);
    const hashedPass = await bcrypt.hash(password, salt);

    const newDoc: User = {
        email,
        password: hashedPass
    };

    const newUser = new UserModel(newDoc);
    const savedUser: User = await newUser.save();
    return (savedUser != null);
}

UserSchema.methods.checkManager = async function (token: string): Promise<boolean> {
    const user: User = await UserModel.findOne({
        token,
        manager: true
    });
    return (user != null);
}

export const UserModel = model<User>('User', UserSchema);
