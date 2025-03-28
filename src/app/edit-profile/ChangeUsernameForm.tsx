"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDebounceCallback } from "usehooks-ts";
// import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponse } from "@/types/ApiResponce";
import { changeUsernameSchema } from "@/schemas/changeUsernameSchema";
import SkeletonChangeUsername from "@/components/skeletonLoader/SkeletonChangeUsername";

type mailProps = {
  email?: string;
};

const ChangeUsernameForm = ({ email }: mailProps) => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  // const router = useRouter();

  const debounced = useDebounceCallback(setUsername, 500);
  //zod implementation  for form validation
  type ChangeUsernameFormData = z.infer<typeof changeUsernameSchema>;

  const form = useForm<ChangeUsernameFormData>({
    resolver: zodResolver(changeUsernameSchema),
    defaultValues: {
      email: email || "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/check-unique-username?username=${username}`
          );
          // console.log("response", response)
          setUsernameMessage(response.data?.message);
        } catch (error) {
          const AxiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            AxiosError?.response?.data?.message ?? "An unknown error occurred"
          );
          // console.error("Failed to check username", AxiosError?.response?.data?.message)
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: ChangeUsernameFormData) => {
    // console.log(data)
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/change-username", data);

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Username Changed Successfully",
        });
        setIsSubmitting(false);
        setLoading(true);

        // Update session
        setTimeout(async () => {
          const res = await signIn("credentials", {
            identifier: data.email,
            password: data.password,
            redirect: false, // Do not redirect immediately
          });
          // console.log(res)

          if (res?.error && !res.ok) {
            toast({
              title: "Failed to update session",
              description: res.error,
              variant: "destructive",
            });
            signOut();
          }
          if (res?.ok) {
            setLoading(false);
            toast({
              title: "Success",
              description: "Session updated",
              variant: "default",
            });
            // router.refresh();
            // window.location.reload();
          }
        }, 2000);

        // Optional: Show a toast or any notification
      }
    } catch (error) {
      console.error("Failed to change username: ", error);
      const AxiosError = error as AxiosError<ApiResponse>;
      const errorMessage = AxiosError?.response?.data?.message;
      toast({
        title: "Failed to change",
        description: errorMessage,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <SkeletonChangeUsername />;
  }

  return (
    <div className="bg-white rounded-lg p-4">
      <h1 className="text-xl font-semibold mb-4">Change Username </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col  sm:gap-4 sm:items-center sm:flex-row  gap-2">
                  <FormLabel className="text-base font-normal sm:w-[90px]">
                    Email :
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Your email"
                      className="py-0 sm:w-[480px]"
                      disabled
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col sm:gap-4 sm:items-center sm:flex-row gap-2">
                  <FormLabel className="text-base font-normal sm:w-[90px]">
                    Username :
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter New Username"
                      className="py-0 sm:w-[480px]"
                      autoComplete="off"
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                    />
                  </FormControl>
                </div>
                <div className="text-xs sm:pl-[158px] md:pl-[104px]">
                  {isCheckingUsername && (
                    <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                  )}
                  {username && (
                    <p
                      className={`text-xs ${
                        usernameMessage === "Username is available"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}
                  {!username && <FormMessage className="text-xs" />}
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col  sm:gap-4 sm:items-center sm:flex-row  gap-2">
                  <FormLabel className="text-base font-normal sm:w-[90px]">
                    Password :
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Your Password"
                      autoComplete="off"
                      className="py-0 sm:w-[480px]"
                      type="password"
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-xs sm:ml-[158px] md:ml-[104px]" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto sm:ml-[104px]"
          >
            {isSubmitting ? (
              <div className="flex gap-1">
                <div className="flex justify-center items-center">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
                {"loading..."}
              </div>
            ) : (
              "Change Username"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangeUsernameForm;
