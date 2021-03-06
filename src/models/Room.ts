import { Schema, model, connect } from 'mongoose';
import type { Guest } from './Guest';
import dotenv from 'dotenv';
dotenv.config()
const uri = process.env['MONGO_URI'];
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

export declare interface Room{
    suite: boolean,
    lakeview: boolean,
    bedQnty: number,
    bedType: string,
    description: string,
}

export const roomSchema = new Schema({
    suite: { type: Boolean, required: false },
    lakeview: { type: Boolean, required: false },
    bedQnty: { type: Number, required: true },
    bedType: { type: String, required: true },
    description: { type: String },
});

roomSchema.methods.createRoom = async function ( suite: boolean, lakeview: boolean, bedQnty: number, bedType: string, description: string): Promise<Room> {
    await connect(uri), options ;
    
    const res = new RoomModel({
        suite: suite,
        lakeview: lakeview,
        bedQnty: bedQnty,
        bedType: bedType,
        description: description
    });

    const room: Room = await res.save();
    return room;
}
 
roomSchema.methods.getRoom = async function (): Promise<Room[]> {
    await connect(uri), options;

    const room: Room[] = await RoomModel.find();
    return room
}

roomSchema.methods.updateRoom = async function (res: Room): Promise<Room> {
    await connect(uri), options;

    const reservation: Room = await RoomModel.findOneAndUpdate(res, res); // Use findOneByIdAndUpdate?
    return reservation;
    
}

roomSchema.methods.deleteRoom = async function (res: Room): Promise<Room> {
    await connect(uri), options;

    const reservation: Room = await RoomModel.findOneAndDelete(res); // Use findOneByIdAndDelete?
    return reservation;
    
}

export const RoomModel = model<Room>('Room', roomSchema);