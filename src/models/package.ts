import { Schema, model, connect } from 'mongoose';
import type { IGuest } from './Guest';
import dotenv from 'dotenv';
dotenv.config()
const uri = process.env['VITE_MONGO_URI'];
export declare interface Package{
    breakfast: string,
    holiday: string,
    discount: string,
    description: string,
}
// export default class Package {
//     constructor(public breakfast: string, public holiday: string, public discount: string, 
//                 public desc: string, public id?: connect) {}
// }