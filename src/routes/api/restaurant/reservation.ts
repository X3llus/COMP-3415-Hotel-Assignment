import { ResturantResModel, IResturantRes } from '../../../models/ResturantRes';

export async function post(req) {
    const {
        dateString
    } = req.body;
    const date: Date = new Date(Date.parse(dateString));
    const resDoc: IResturantRes = {
        date
    };
    const reservation = new ResturantResModel(resDoc);
    const reserreved: IResturantRes = await reservation.createResturantRes(date);
    return {
        body: {
            reserreved
        }
    };
}