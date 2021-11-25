import type { Guest } from '$models/Guest';
import { HotelResModel, HotelRes } from '../../models/HotelRes';

interface Body {
    guest: Guest;
    date: Date;
    guestNb: number;
};

export async function post({body}) {
    const {
        guest,
        date,
        guestNb
    }: Body = body;
    const resDoc: HotelRes = {
        guest, date, guestNb
    };
    const reservation = new HotelResModel(resDoc);
    const reserved: HotelRes = await reservation.createHotelRes(guest, date, guestNb);
    return {
        status: 200,
        body: {
            reserved
        }
    };
}

export async function get(req: Guest) {
    const reservation = new HotelResModel();
    const res: HotelRes[] = await reservation.getHotelRes(req);
    return {
        body: {
            res
        }
    }
}

export async function put(body) {
    const {
        guest,
        date,
        guestNb
    }: Body = body;
    const resDoc: HotelRes = {
        guest, date, guestNb
    };

    const reservation = new HotelResModel(resDoc);
    const reserved: HotelRes = await reservation.updateHotelRes(reservation);
    return {
        status: 200,
        body: {
            reserved
        }
    };
}