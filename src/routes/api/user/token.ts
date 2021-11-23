import { UserModel, User } from '../../../models/User';
import * as cookie from 'cookie';
import type { Address } from '$models/Guest';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export async function get(req: ServerRequest) {
    const cookies = cookie.parse(req.headers.cookie || "")
    console.log(cookies);
}