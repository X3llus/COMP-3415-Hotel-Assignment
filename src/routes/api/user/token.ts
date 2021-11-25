import { UserModel, User } from '../../../models/User';
import * as cookie from 'cookie';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export async function getToken(req: ServerRequest): Promise<User> {
    const cookies = cookie.parse(req.headers.cookie || "");
    
    const token = cookies.userToken;
    
    const userDoc: User = {
        token
    };
    
    const user = new UserModel(userDoc);
    const registered: User = await user.getUsingToken(token);
    return registered;
}

export async function get(req: ServerRequest) {
    
    const registered = await getToken(req);
    
    const {
        email,
        guest,
        manager
    } = registered;

    return {
        status: 200,
        body: {
            token,
            email,
            manager,
            guest
        }
    }
}