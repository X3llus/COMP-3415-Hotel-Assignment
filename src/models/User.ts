import { Schema, model, connect  } from 'mongoose';
import type { IGuest } from './Guest';

interface User {
    email: string,
    password: string,
    guest: IGuest,
}

const schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    guest: { type: 'ObjectId', ref: 'Guest', required: true },
});

const UserModel = model<User>('User', schema);
