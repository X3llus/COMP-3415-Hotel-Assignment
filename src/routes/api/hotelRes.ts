import type { Guest } from '$models/Guest';
import { getToken } from './user/token';
import { HotelResModel, HotelRes } from '../../models/HotelRes';

interface Body {
    startDate: Date;
    endDate: Date;
    guestNb: number;
};

export async function post(req) {
    const {
        startDate,
        endDate,
        guestNb
    }: Body = req.body;
    let guest = (await getToken(req)).registered.guest;    
    const resDoc: HotelRes = {
        guest, startDate, endDate, guestNb
    };
    const reservation = new HotelResModel(resDoc);
    const reserved: HotelRes = await reservation.createHotelRes(guest, startDate, endDate, guestNb);
    return {
        status: 200,
        body: {
            reserved
        }
    };
}

export async function get(req) {
    const reservation = new HotelResModel();
    let guest = (await getToken(req)).registered.guest;
    const res: HotelRes[] = await reservation.getHotelRes(guest);    
    return {
        body: {
            res
        }
    }
}

export async function put(body) {
    const {
        guest,
        startDate,
        endDate,
        guestNb
    }: Body = body;
    const resDoc: HotelRes = {
        guest, startDate, endDate, guestNb
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

export async function del(req) {
    const {
        startDate,
        endDate,
        guestNb
    }: Body = req.body;
    let guest = (await getToken(req)).registered.guest;
    const resDoc: HotelRes = {
        guest, startDate, endDate, guestNb
    };
    const reservation = new HotelResModel(resDoc);
    const reserved: HotelRes = await reservation.deleteHotelRes(reservation);
    return {
        status: 200,
        body: {
            reserved
        }
    };
}