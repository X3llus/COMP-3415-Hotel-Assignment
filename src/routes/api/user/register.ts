import { UserModel, User } from '../../../models/User';
import * as cookie from 'cookie';
import type { Address } from '$models/Guest';

interface Body {
    email: string;
    fName: string;
    title: string;
    lName: string;
    number: string;
    address: Address;
    password: string;
    passwordConf: string;
};

export async function post({ body }) {
    const {
        email,
        password,
        passwordConf,
        fName,
        title,
        lName,
        number,
        address,
    }: Body = body;
    console.log(email);
    
    const userDoc: User = {
        email, password
    };
    const user = new UserModel(userDoc);
    const registered: User = await user.register(email, password, fName, lName, title, number, address);
    
    const headers = {
        'Set-Cookie': [
            cookie.serialize(
                'userToken',
                registered.token,
                {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 7,
                    sameSite: 'strict',
                    path: '/'
                }
            ),
        ]
    }
    return {
        status: 200,
        headers,
        body: {
            registered
        }
    };
}