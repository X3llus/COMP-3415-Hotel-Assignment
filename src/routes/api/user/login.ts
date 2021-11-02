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
    const loggedin: boolean = await user.login(req.body.email, req.body.password);
    return {
        body: {
            loggedin
        }
    };
}