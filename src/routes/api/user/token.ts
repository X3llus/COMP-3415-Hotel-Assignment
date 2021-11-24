import { UserModel, User } from '../../../models/User';
import * as cookie from 'cookie';
import type { Address } from '$models/Guest';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export async function get(req: ServerRequest) {
    const cookies = cookie.parse(req.headers.cookie || "");
    
    const token = cookies.userToken;
    
    const userDoc: User = {
        token
    };
    
    const user = new UserModel(userDoc);
    const registered: User = await user.checkToken(token);
    
    const {
        email,
        guest
    } = registered;

    return {
        status: 200,
        body: {
            token,
            email,
            guest
        }
    }
}