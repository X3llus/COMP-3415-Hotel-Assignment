import { model, Schema, connect } from 'mongoose';
import type { IGuest } from './Guest';
import dotenv from 'dotenv';
dotenv.config()
const uri = process.env['VITE_MONGO_URI'];
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

/******************************************
 * Model needs creation of id for both ResturantRes
 * and Guest to function properly
 */

export interface IResturantRes {
    //id: string
    date: Date;
    guest: IGuest;
    createResturantRes?(date: Date, guest: IGuest): Promise<IResturantRes>;
    getResturantRes?(guest: IGuest): Promise<IResturantRes[]>;
    updateResturantRes?(res: IResturantRes): Promise<IResturantRes>;
    deleteResturantRes?(res: IResturantRes): Promise<IResturantRes>;
}

const ResturantResSchema: Schema = new Schema({
    //id: { type: string, required: true },
    date: { type: Date, required: true },
    guest: { type: 'ObjectId', ref: 'Guest', required: true }
});

ResturantResSchema.methods.createResturantRes = async function (/*id: string, */date: Date, guest: IGuest): Promise<IResturantRes> {
    await connect(uri),options ;
    
    const res = new ResturantResModel({
        //id: string
        date: date,
        guest: guest
    });
    
    // Create and save id for reservation here

    const reservation: IResturantRes =  await res.save();
    return reservation;
}

ResturantResSchema.methods.getResturantRes = async function (guest: IGuest): Promise<IResturantRes[]> {
    await connect(uri), options;

    const reservations: IResturantRes[] = await ResturantResModel.find({
        guest: guest
    });

    return reservations
}

ResturantResSchema.methods.updateResturantRes = async function (res: IResturantRes): Promise<IResturantRes> {
    await connect(uri), options;

    const reservation: IResturantRes = await ResturantResModel.findOneAndUpdate(res, res); // Use findOneByIdAndUpdate?
    return reservation;
    
}

ResturantResSchema.methods.deleteResturantRes = async function (res: IResturantRes): Promise<IResturantRes> {
    await connect(uri), options;

    const reservation: IResturantRes = await ResturantResModel.findOneAndDelete(res); // Use findOneByIdAndDelete?
    return reservation;
    
}

export const ResturantResModel = model<IResturantRes>('ResturantRes', ResturantResSchema);