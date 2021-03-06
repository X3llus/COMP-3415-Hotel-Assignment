import type { Guest } from '$models/Guest';
import { ResturantResModel, IResturantRes } from '../../models/ResturantRes';
import { getToken } from './user/token';



interface Body {
    date: Date;
    guestNb: number;
};

export async function post(req) {
    const {
        date,
        guestNb
    }: Body = req.body;
    let guest = (await getToken(req)).registered.guest;
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

export async function get(req) {

    let guest = (await getToken(req)).registered.guest;
    const reservation = new ResturantResModel();
    const res: IResturantRes[] = await reservation.getResturantRes(guest);
    return {
        body: {
            res
        }
    }
}

export async function put(req) {
    const {
        date,
        guestNb
    }: Body = req.body;
    let guest = (await getToken(req)).registered.guest;
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

export async function del(req) {
    const {
        date,
        guestNb
    }: Body = req.body;
    let guest = (await getToken(req)).registered.guest;
    const resDoc: IResturantRes = {
        guest, date, guestNb
    };
    const reservation = new ResturantResModel(resDoc);
    const reserved: IResturantRes = await reservation.deleteResturantRes(reservation);
    return {
        status: 200,
        body: {
            reserved
        }
    };
}