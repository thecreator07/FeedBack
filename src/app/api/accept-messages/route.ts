import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth"


export async function POST(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user
    if (!session || !session.user) {
        return Response.json(
            {
                success: true,
                message: 'Not authenticated',
            },
            { status: 200 }
        );
    }

    const userId = user._id
    const { acceptMessage } = await request.json()


    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, {
            isAcceptingMessages: acceptMessage
        }, { new: true })

        if (!updatedUser) {
            return Response.json(
                {
                    success: false,
                    message: 'Failed to update user Status to Accept messsage',
                },
                { status: 401 }
            );
        }
        return Response.json(
            {
                success: true,
                message: 'Message acceptance status updated Successfully',
                updatedUser
            },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Error Getting Accept Message',
            },
            { status: 500 }
        );
    }
}


export async function GET() {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user
    if (!session || !session.user) {
        return Response.json(
            {
                success: true,
                message: 'Not authenticated',
            },
            { status: 200 }
        );
    }

    const userId = user._id


    try {
        const foundUser = await UserModel.findById(userId)
        if (!foundUser) {
            return Response.json(
                {
                    success: false,
                    message: 'Failed to found the user ',
                },
                { status: 404 }
            );
        }
        return Response.json(
            {
                success: true,
                isAcceptingMessage: foundUser.isAcceptingMessages



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