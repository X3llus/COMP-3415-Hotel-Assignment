import type { Guest } from '$models/Guest';
import { HotelResModel, HotelRes } from '../../models/HotelRes';

interface Body {
    guest: Guest;
    date: Date;
    guestNum: number;
};

export async function post({body}) {
    const {
        guest,
        date,
        guestNum
    }: Body = body;
    const date: Date = new Date(Date.parse(dateString));
    const resDoc: HotelRes = {
        guest, date, guestNum
    };
    const reservation = new HotelResModel(resDoc);
    const reserved: HotelRes = await reservation.createHotelRes(guest, date, guestNum);
}