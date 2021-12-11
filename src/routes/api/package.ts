import type { Guest } from '$models/Guest';
import type { ErrorDescription } from 'mongodb';
import { PackageResModel, Package } from '../../models/package';

// interface Body {
//     breakfast: Breakfast;
//     holiday: Holiday;
//     discount: Discount;
//     description: Description;
// };

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

export async function post(req) {
    const {
        breakfast,
        holiday,
        discount,
        description,
    } = req.body;
    const reservation = new PackageResModel();
    console.log(req.body);
    const reserved: Package = await reservation.createPackageRes(breakfast, holiday, discount, description);
    return {
        status: 200,
        body: {
            reserved
        }
    };
}

export async function put(body) {
    const {
        breakfast,
        holiday,
        discount,
        description
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