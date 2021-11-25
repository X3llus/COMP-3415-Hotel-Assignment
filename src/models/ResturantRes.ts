import { model, Schema, connect, ObjectId } from 'mongoose';
import type { Guest } from './Guest';
import dotenv from 'dotenv';
dotenv.config()
const uri = process.env['MONGO_URI'];
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

/******************************************
 * Model needs creation of id for both ResturantRes
 * and Guest to function properly
 */

export interface IResturantRes {
    guest: ObjectId | Guest;
    date: Date;
    guestNb: number;
    createResturantRes?(guest: Guest, date: Date, guestNb: number): Promise<IResturantRes>;
    getResturantRes?(guest: Guest): Promise<IResturantRes[]>;
    updateResturantRes?(res: IResturantRes): Promise<IResturantRes>;
    deleteResturantRes?(res: IResturantRes): Promise<IResturantRes>;
}

const ResturantResSchema: Schema = new Schema({
    guest: { type: 'ObjectId', ref: 'Guest', required: true },
    date: { type: Date, required: true },
    guestNb: {tyoe: Number, required: true} 
});

ResturantResSchema.methods.createResturantRes = async function (guest: Guest, date: Date, guestNb: number): Promise<IResturantRes> {
    await connect(uri),options ;
    
    const newRDoc: IResturantRes ={
        guest,
        date,
        guestNb
    }

    const res = new ResturantResModel(newRDoc);
    const savedRes: IResturantRes =  await res.save();
    return savedRes;
}

ResturantResSchema.methods.getResturantRes = async function (guest: Guest): Promise<IResturantRes[]> {
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