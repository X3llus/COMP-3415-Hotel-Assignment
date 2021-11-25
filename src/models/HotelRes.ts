import { model, Schema, connect } from 'mongoose';
import type { Guest } from './Guest';
import dotenv from 'dotenv';
dotenv.config()
const uri = process.env['MONGO_URI'];
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

export interface HotelRes {
    //id: Guest
    date: Date;
    guestNb: number;
    createHotelRes?(date: Date, guestNb: number): Promise<HotelRes>;
    getHotelRes?(link: Guest): Promise<HotelRes[]>;
    updateHotelRes?(res: HotelRes): Promise<HotelRes>;
    deleteHotelRes?(res: HotelRes): Promise<HotelRes>;
}

const HotelResSchema: Schema = new Schema({
    date: { type: Date, required: true },
    guestNb: {type: Number, required: true} 
});

HotelResSchema.methods.createHotelRes = async function ( date: Date, guestNb: number): Promise<HotelRes> {
    await connect(uri), options ;

    const res = new HotelResModel({
        date: date,
        guestNb: guestNb
    });

    // Creates and saves the id for the hotel reservation
    const reservation: HotelRes = await res.save();
    return reservation;
}

HotelResSchema.methods.getHotelRes = async function (link: Guest): Promise<HotelRes[]> {
    await connect(uri), options;

    const reservation: HotelRes[] = await HotelResModel.find({
        link:link
    });
    return reservation;
}

HotelResSchema.methods.updateHotelRes = async function ( res: HotelRes): Promise<HotelRes> {
    await connect(uri), options;

    const reservation: HotelRes = await HotelResModel.findOneAndUpdate(res, res);
    return reservation;
}

HotelResSchema.methods.deleteHotelRes = async function (res: HotelRes): Promise<HotelRes> {
    await connect(uri), options;

    const reservation: HotelRes = await HotelResModel.findOneAndDelete(res);
    return reservation;
}

export const HotelResModel = model<HotelRes>('HotelRes', HotelResSchema);