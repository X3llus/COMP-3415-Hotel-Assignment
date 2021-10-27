import { model, Schema, connect} from 'mongoose';

export declare interface IResturantRes {
    link: string,
    date: Date,
    guestNb: number
}

export const ResturantResSchema: Schema = new Schema({
    link: String,
    date: { type: Date, required: true },
    guestNb: Number
});

export const ResturantResModel = model<IResturantRes>('ResturantRes', ResturantResSchema);