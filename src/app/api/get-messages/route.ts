import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth"
import mongoose, { Aggregate } from "mongoose";


export async function GET(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user
    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: 'Not authenticated',
            },
            { status: 200 }
        );
    }

    const userId = new mongoose.Types.ObjectId(user._id)
    try {
        const user = await UserModel.aggregate([
            {
                $match: {
                    _id: userId
                }
            },
            {
                $unwind: '$messages'
            }, {
                $sort: { 'messages.createdAt': -1 }
            }, {
                $group: { _id: '$_id', messages: { $push: '$messages' } }
            }
        ])

        if (!user || user.length === 0) {
            return Response.json(
                {
                    success: false,
                    message: 'User Not Found',
                },
                { status: 500 }
            );
        }
        return Response.json(
            {
                success: true,
                message: user[0].messages
            },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Error Getting Message acceptance',
            },
            { status: 500 }
        );
    }


}