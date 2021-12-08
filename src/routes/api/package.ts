import type { Guest } from '$models/Guest';
import { PackageResModel, Package } from '../../models/Package';

interface Body {
    guest: Guest;
    dateString: string;
    guestNb: number;
};

//GET
export async function get() {

    const reservation = new PackageResModel();
    const res: Package[] = await reservation.getPackageRes();
    return {
        body: {
            res
        }
    }
}

export async function post() {
    const date: Date = new Date();
    const reservation = new PackageResModel();
    const reserved: Package = await reservation.createPackageRes();
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
    // const resDoc: Package = {
    //     guest, dateString, guestNb
    // };

    const reservation = new PackageResModel();//(resDoc);
    const reserved: Package = await reservation.updatePackageRes();//(reservation);
    return {
        status: 200,
        body: {
            reserved
        }
    };
}