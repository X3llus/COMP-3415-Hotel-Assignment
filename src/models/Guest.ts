import { Schema, model, connect } from 'mongoose';

export declare interface IGuest {
    fName: string,
    lName: string,
    title: string,
    phoneNum: number,
    address: string,
}

export const schema = new Schema({
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    title: { type: String, required: true },
    phoneNum: { type: Number, required: true },
    address: { type: String, required: true },
});

export const GuestModel = model<IGuest>('Guest', schema);
