import { UserModel, User } from '../../../models/User';
import * as cookie from 'cookie';
import type { Address } from '$models/Guest';

interface Body {
    email: string;
    password: string;
};

export async function post({ body }) {
    const {
        email,
        password
    }: Body = body;
    
    const userDoc: User = {
        email, password
    };
    const user = new UserModel(userDoc);
    const registered: boolean = await user.registerManager(email, password);

    if (registered) {
        return {
            status: 200,
            body: {
                message: 'success'
            }
        }
    }
    return {
        status: 400,
        body: {
            message: 'registration failed'
        }
    }
}