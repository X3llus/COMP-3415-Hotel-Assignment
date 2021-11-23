import type { model, Schema, connect } from "mongodb";
export default class Package {
    constructor(public breakfast: string, public holiday: string, public discount: string, 
                public desc: string, public id?: ObjectId) {}
}