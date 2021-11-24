import type { ObjectId } from 'bson';
import { Schema, model, connect } from 'mongoose';

export interface Address {
    street: string;
    city: string;
    postal: string;
    province: string;
    country: string;
}

export interface Guest {
    _id?: ObjectId;
    fName: string,
    lName: string,
    title: string,
    phoneNum: string,
    address: string,
}

var schema = new Schema({
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    title: { type: String, required: true },
    phoneNum: { type: String, required: true },
    address: { type: String, required: true },
});

export const GuestModel = model<Guest>('Guest', schema);

