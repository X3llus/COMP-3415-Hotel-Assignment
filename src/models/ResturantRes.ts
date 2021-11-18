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
    //id: IGuest
    date: Date;
    guestNb: number;
    // createResturantRes?(date: Date, guestNb: number): Promise<IResturantRes>;
    // getResturantRes?(link: IGuest): Promise<IResturantRes[]>;
    // updateResturantRes?(res: IResturantRes): Promise<IResturantRes>;
    // deleteResturantRes?(res: IResturantRes): Promise<IResturantRes>;
}

const ResturantResSchema: Schema = new Schema({
    //id: { type: 'ObjectId', ref: 'Guest', required: true },
    date: { type: Date, required: true },
    guestNb: {type: Number, required: true} 
});

ResturantResSchema.methods.createResturantRes = async function (/*id: IGuest, */date: Date, guestNb: number): Promise<IResturantRes> {
    await connect(uri),options ;
    
    const res = new ResturantResModel({
        //id: IGuest
        date: date,
        guestNb: guestNb
    });
    
    // Create and save id for reservation here

    const reservation: IResturantRes =  await res.save();
    return reservation;
}

ResturantResSchema.methods.getResturantRes = async function (link: IGuest): Promise<IResturantRes[]> {
    await connect(uri), options;

    const reservations: IResturantRes[] = await ResturantResModel.find({
        link: link
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