import { model, Schema, connect } from 'mongoose';
import type { IGuest } from './Guest';
import dotenv from 'dotenv';
dotenv.config()
const uri = process.env['VITE_MONGO_URI'];

export interface IResturantRes {
    date: Date;
    guest?: IGuest;
    createResturantRes?(date: Date, guest?: IGuest): Promise<IResturantRes>;
}

const ResturantResSchema: Schema = new Schema({
    date: { type: Date, required: true },
    guest: { type: 'ObjectId', ref: 'Guest', required: false }
});

ResturantResSchema.methods.createResturantRes = async function (date: Date, guest?: IGuest): Promise<IResturantRes> {
    await connect(uri), {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    
    const res = new ResturantResModel({
        date: date,
        // guest: guest
    });
    
    const reservation: IResturantRes =  await res.save();
    return reservation;
}

export const ResturantResModel = model<IResturantRes>('ResturantRes', ResturantResSchema);