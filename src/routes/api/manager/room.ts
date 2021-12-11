import { RoomModel, Room } from '../../../models/Room';

interface Body {
    suite: boolean,
    lakeview: boolean,
    bedQnty: number,
    bedType: string,
    description: string,
};

export async function post(req) {
    const {
        suite,
        lakeview,
        bedQnty,
        bedType,
        description
    }: Body = req.body;
    const newRoom: Room = {
        suite, lakeview, bedQnty, bedType, description
    };
    const room = new RoomModel(newRoom);
    const roomCreate: Room = await room.createRoom(suite, lakeview, bedQnty, bedType, description);
    return {
        status: 200,
        body: {
            roomCreate
        }
    };
}

export async function get(req) {
    const newRoom = new RoomModel();
    const room: Room[] = await newRoom.getRoom();
    return {
        body: {
            room
        }
    }
}

export async function put(body) {
    const {
        suite,
        lakeview,
        bedQnty,
        bedType,
        description
    }: Body = body;
    const roomDoc: Room = {
        suite, lakeview, bedQnty, bedType, description
    };
    const newRoom = new RoomModel(roomDoc);
    const room: Room = await newRoom.updateRoom(newRoom);
    return {
        status: 200,
        body: {
            room
        }
    };
}

export async function del(req) {
    const {
        suite,
        lakeview,
        bedQnty,
        bedType,
        description
    }: Body = req.body;
    const roomDoc: Room = {
        suite, lakeview, bedQnty, bedType, description
    };
    const newRoom = new RoomModel(roomDoc);
    const room: Room = await newRoom.deleteRoom(newRoom);
    return {
        status: 200,
        body: {
            room
        }
    }
}
