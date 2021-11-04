import { UserModel, User } from '../../../models/User';

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
    return {
        body: {
            registered
        }
    };
}