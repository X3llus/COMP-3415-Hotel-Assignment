import { model, Schema, connect} from 'mongoose';
import type { IGuest } from './Guest';
import dotenv from 'dotenv';
dotenv.config()
const uri = process.env['MONGODB_URI'];

declare interface IResturantRes {
    date: Date,
    guest: IGuest
}

const ResturantResSchema: Schema = new Schema({
    date: { type: Date, required: true },
    guest: { type: 'ObjectId', ref: 'Guest', required: true }
});

const ResturantResModel = model<IResturantRes>('ResturantRes', ResturantResSchema);

ResturantResSchema.methods.createResturantRes = async function(date:Date, guest:IGuest) {
        await connect(uri), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        const res = new ResturantResModel({
            date: date,
            guest: guest
        });

        await res.save()
    }