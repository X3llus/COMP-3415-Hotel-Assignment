import type { Guest } from '$models/Guest';
import { ResturantResModel, IResturantRes } from '../../models/ResturantRes';

interface Body {
    guest: Guest;
    dateString: string;
    guestNb: number;
};

export async function post({body}) {
    const {
        guest,
        dateString,
        guestNb
    }: Body = body;
    const date: Date = new Date(Date.parse(dateString));
    const resDoc: IResturantRes = {
        guest, date, guestNb
    };
    const reservation = new ResturantResModel(resDoc);
    const reserved: IResturantRes = await reservation.createResturantRes(guest, date, guestNb);
    return {
        status: 200,
        body: {
            reserved
        }
    };
}

export async function get(req: Guest) {

    const reservation = new ResturantResModel();
    const res: IResturantRes[] = await reservation.getResturantRes(req);
    return {
        body: {
            res
        }
    }
}

export async function put(body) {
    const {
        guest,
        dateString,
        guestNb
    }: Body = body;
    const date: Date = new Date(Date.parse(dateString));
    const resDoc: IResturantRes = {
        guest, date, guestNb
    };
    const reservation = new ResturantResModel(resDoc);
    const reserved: IResturantRes = await reservation.updateResturantRes(reservation);
    return {
        status: 200,
        body: {
            reserved
        }
    };
}