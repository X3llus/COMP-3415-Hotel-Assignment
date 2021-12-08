import type { Guest } from '$models/Guest';
import { PackageResModel, PackageRes } from '../../../models/Package';

interface Body {
    guest: Guest;
    dateString: string;
    guestNb: number;
};

//GET
export async function get(req: Guest) {

    const reservation = new PackageResModel();
    const res: PackageRes[] = await reservation.getPackageRes(req);
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
    const resDoc: PackageRes = {
        guest, dateString, guestNb
    };
    const reservation = new PackageResModel(resDoc);
    const reserved: PackageRes = await reservation.createPackageRes(guest, dateString, guestNb);
    return {
        status: 200,
        body: {
            reserved
        }
    };
}

export async function put(body) {
    const {
        guest,
        dateString,
        guestNb
    }: Body = body;
    const resDoc: PackageRes = {
        guest, dateString, guestNb
    };

    const reservation = new PackageResModel(resDoc);
    const reserved: PackageRes = await reservation.updatePackageRes(reservation);
    return {
        status: 200,
        body: {
            reserved
        }
    };
}