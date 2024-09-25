import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";



export async function POST(request: Request) {
    await dbConnect()
    const { username, content } = await request.json()
    try {

        const user = await UserModel.findOne({ username })
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: 'User Not Found',
                },
                { status: 404 }
            );
        }

        //is User Accepting the messages
        if (!user.isAcceptingMessages) {
            return Response.json(
                {
                    success: false,
                    message: 'User Not Accepting Messages',
                },
                { status: 401 }
            );
        }

        const newMessages = { content, createdAt: new Date() }
        user.messages.push(newMessages as Message)
        await user.save()

        return Response.json(
            {
                success: true,
                message: 'Message Send Successfully',
            },
            { status: 200 }
        );
    } catch (error) {
        console.log("Unexpected Error Occured")
        return Response.json(
            {
                success: false,
                message: 'Unexpected Error Occured During Message Sending',
            },
            { status: 500 }
        );
    }
}