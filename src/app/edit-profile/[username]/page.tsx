"use client";
import React, { useState } from "react";
import ChangeUsernameForm from "../ChangeUsernameForm";
import { Separator } from "@/components/ui/separator";
import { Undo2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { DeleteUser } from "../DeleteUser";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { User } from "next-auth";
import { ApiResponse } from "@/types/ApiResponce";
import SkeletonProfileLoader from "@/components/skeletonLoader/SkeletonProfileLoader";
import ChangePasswordForm from "../ChangePasswordForm";

function EditProfile() {
  const { username } = useParams<{ username: string }>();
  const router = useRouter();
  const { toast } = useToast();

  const { data: session, status } = useSession();
  const user: User = session?.user as User;

  const [toggleDelete, setToggleDelete] = useState<boolean>(true);
  // console.log(toggleDelete);

  const handleDeleteUserConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(`/api/delete-user`);
      if (response.data.success) {
        toast({
          title: response.data.message?.toString(),
        });
        signOut();
      }
    } catch (error: unknown) {
      let errorMessage = "Error getting response from googleAI";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error(error);
      toast({
        title: "Error",
        description: errorMessage ?? "Failed to delete User",
        variant: "destructive",
      });
    }
  };

  const deleteToggle = function () {
    setToggleDelete((prev) => !prev);
  };

  // console.log(status)

  if (status === "loading") {
    return (
      <div className="container">
        <SkeletonProfileLoader />
      </div>
    );
  }
  if (status === "unauthenticated") {
    router.replace(`/sign-in`);
    return (
      <div className="container">
        <SkeletonProfileLoader />
      </div>
    );
  } else if (status === "authenticated" && user?.username !== username) {
    router.replace(`/edit-profile/${user.username}`);
    return (
      <div className="container">
        <SkeletonProfileLoader />
      </div>
    );
  }

  return (
    <div className="pt-40 pb-6 md:pt-24 sm:mx-4 lg:mx-8 xl:mx-auto bg-white w-full max-w-6xl">
      <div className="p-4 md:p-8 space-y-4 border rounded-lg bg-slate-50">
        <div className="flex flex-col justify-center items-center sm:justify-between sm:flex-row gap-4">
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <Link
            href={`/dashboard`}
            className="flex items-center justify-center max-w-[180px] gap-2 text-sm font-semibold bg-white rounded-lg p-2"
          >
            <Undo2 className="h-4 w-4" />
            <p>Back to Dashboard </p>
          </Link>
        </div>
        <Separator />
        <ChangeUsernameForm email={user?.email || ""} />
        <Separator />
        <ChangePasswordForm />
        <Separator />
        <div className="bg-white rounded-lg p-4">
          <h1 className="text-xl font-semibold mb-4">Delete Profile </h1>
          <div className="flex items-center gap-2 mb-4">
            <Input
              type="checkbox"
              className="h-4 w-4 hover:cursor-pointer"
              onClick={deleteToggle}
            />
            <p>
              If you want to <strong>Delete</strong> your account then mark the
              checkbox.
            </p>
          </div>
          <div className="flex justify-end">
            <DeleteUser
              handleDeleteUser={handleDeleteUserConfirm}
              toggleDelete={toggleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
