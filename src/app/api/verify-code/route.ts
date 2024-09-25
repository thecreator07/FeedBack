import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";



export async function POST(request: Request) {
    await dbConnect()
    try {
        const { username, code } = await request.json()

        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({ username: decodedUsername })
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: 'User Not Found',
                },
                { status: 500 }
            );
        }

        const isCodeValid = user.verifyCode === code
        const isCodenotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if (isCodeValid && isCodenotExpired) {
            user.isVerified = true
            await user.save()
            return Response.json(
                {
                    success: true,
                    message: 'Account Verified successfully',
                },
                { status: 200 }
            );
        } else if (!isCodenotExpired) {
            return Response.json(
                {
                    success: false,
                    message: 'Verification Code Expired! Signup again',
                },
                { status: 400 }
            );
        } else {
            return Response.json(
                {
                    success: false,
                    message: 'Incorrect Verification Code',
                },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('Error Verifying user:', error);
        return Response.json(
            {
                success: false,
                message: 'Error Verifying user',
            },
            { status: 500 }
        );
    }
}