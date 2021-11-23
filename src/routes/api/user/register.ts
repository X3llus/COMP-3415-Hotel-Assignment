import { UserModel, User } from '../../../models/User';
import * as cookie from 'cookie';

export async function post(req) {
    const {
        email,
        password,
    } = req.body;
    const userDoc: User = {
        email, password
    };
    const user = new UserModel(userDoc);
    const registered: User = await user.register(req.body.email, req.body.password);
    console.log(registered.token, registered.rToken);
    
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
            cookie.serialize(
                'refToken',
                registered.rToken,
                {
                    httpOnly: true,
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