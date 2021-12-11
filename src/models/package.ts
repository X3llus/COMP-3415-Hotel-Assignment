import { Schema, model, connect } from 'mongoose';
import type { Guest } from './Guest';
import dotenv from 'dotenv';
dotenv.config()
const uri = process.env['MONGO_URI'];
const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 60000,
};
connect(uri, options);

export declare interface Package{
    breakfast: boolean,
    holiday: boolean,
    discount: boolean,
    description: string,

    //signin?(breakfast: boolean, holiday: boolean, discount: boolean, description: string): Promise<Package>;
}

var packageSchema = new Schema({
    breakfast: { type: Boolean, required: true },
    holiday: { type: Boolean, required: true },
    discount: { type: Boolean, required: true },
    description: { type: String},
});

//CREATE
packageSchema.methods.createPackageRes = async function ( breakfast: boolean, holiday: boolean, discount: boolean,  description: string): Promise<Package> {
    

    const newDoc: Package = {
        breakfast,
        holiday,
        discount,
        description,
    };

    const newPackage = new PackageResModel(newDoc);
    const savedPackage: Package = await newPackage.save();
    return savedPackage;
}

//UPDATE
packageSchema.methods.updatePackageRes = async function (): Promise<Package> {

    const reservation: Package= await PackageResModel.findOneAndUpdate();
    return reservation;
}
//GET
packageSchema.methods.getPackageRes = async function(): Promise<Package[]> {
    

    const savedPackage: Package[] = await PackageResModel.find();
    return savedPackage;
}
//DELETE
packageSchema.methods.deletePackageRes = async function (): Promise<Package> {

    const reservation: Package = await PackageResModel.findOneAndDelete();
    return reservation;
}
//
export const PackageResModel = model<Package>('Package', packageSchema);
// export default class Package {
//     constructor(public breakfast: string, public holiday: string, public discount: string, 
//                 public desc: string, public id?: connect) {}
// }