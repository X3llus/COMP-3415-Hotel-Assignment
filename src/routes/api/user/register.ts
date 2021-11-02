import { UserModel } from '../../../models/User';

export async function post(req) {

    console.log(req.body);
    console.log(JSON.parse(req.body));
    return {
        body: req.body
    };
}

export async function get() {
    console.log('TEST');
    return {
        body: 'test!'
    };
}