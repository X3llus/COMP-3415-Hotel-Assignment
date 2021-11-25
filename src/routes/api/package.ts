import type { Guest } from '$models/Guest';
import { PackageResModel } from 'src/Models/package';
import { PackageModel, Package } from '../../../models/Package';

interface Body {
    guest: Guest;
    dateString: string;
    guestNb: number;
};

//GET
export async function get(req: Guest) {

    const reservation = new PackageResModel();
    const res: Package[] = await reservation.getPackageRes(req);
    return {
        body: {
            res
        }
    }
}

export async function post({body}) {
    const {
        guest,
        dateString,
        guestNb
    }: Body = body;
    const date: Date = new Date(Date.parse(dateString));
    const resDoc: Package = {
        guest, date, guestNb
    };
    const reservation = new PackageResModel(resDoc);
    const reserved: Package = await reservation.createPackageRes(guest, date, guestNb);
    return {
        status: 200,
        body: {
            reserved
        }
    };
}