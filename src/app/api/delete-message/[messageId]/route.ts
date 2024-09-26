import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth"
import mongoose, { Aggregate } from "mongoose";


export async function DELETE(request: Request, { params }: { params: { messageid: string } }) {
    await dbConnect()
    const messageId = params.messageid
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

    try {
        const updateResult = await UserModel.updateOne({ _id: user._id }, { $pull: { messages: { _id: messageId } } })

        if (updateResult.modifiedCount == 0) {
            return Response.json(
                {
                    success: false,
                    message: 'Message Not Found And Already Deleted',
                },
                { status: 404 }
            );
        }
        return Response.json(
            {
                success: true,
                message: 'Message Deleted',
            },
            { status: 200 }
        );

    } catch (error) {
        console.log("Error dut=ring Deleting",error)
        return Response.json(
            {
                success: false,
                message: 'Error Deleting Message',
            },
            { status: 200 }
        );
    }

}