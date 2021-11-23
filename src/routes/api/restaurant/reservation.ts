import { ResturantResModel, IResturantRes } from '../../../models/ResturantRes';

// export async function post(req) {
//     const {
//         // id,
//         dateString,
//         guestNb
//     } = req.body;
//     const date: Date = new Date(Date.parse(dateString));
//     const resDoc: IResturantRes = {
//         /*id, */date, guestNb
//     };
//     const reservation = new ResturantResModel(resDoc);
//     const reserreved: IResturantRes = await reservation.createResturantRes(/*id,*/date, guestNb);
//     return {
//         body: {
//             reserreved
//         }
//     };
// }

// export async function get(req) {
//     const {
//         id
//     } = req.body;
//     const reservation = new ResturantResModel();
//     const res: IResturantRes[] = await reservation.getResturantRes(id);
//     return {
//         body: {
//             res
//         }
//     }
// }

// export async function put(req) {
//     const {
//         // id,
//         dateString,
//         guestNb
//     } = req.body;
//     const date: Date = new Date(Date.parse(dateString));
//     const resDoc: IResturantRes = {
//         date, guestNb
//     }
// }