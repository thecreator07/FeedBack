"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
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
import { useToast } from "@/components/ui/use-toast";
import { changePasswordSchema } from "@/schemas/changePasswordSchema";
import { ApiResponse } from "@/types/ApiResponce";

const ChangePasswordForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  //zod implementation  for form validation
  type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    // console.log(data)
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/change-password", data);
      toast({
        title: "Password changed successfully",
        description: response?.data?.message,
      });
      setIsSubmitting(false);
    } catch (error) {
      console.error("Failed to change password", error);
      const AxiosError = error as AxiosError<ApiResponse>;
      const errorMessage = AxiosError?.response?.data?.message;
      toast({
        title: "Failed to Change Password",
        description: errorMessage,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <h1 className="text-xl font-semibold mb-4">Change Password </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col sm:gap-4 sm:items-center sm:flex-row gap-2">
                  <FormLabel className="text-base font-normal sm:w-[150px]">
                    Current Password :
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Your Password"
                      className="py-0 sm:w-[480px]"
                      type="password"
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-xs sm:pl-[158px] md:pl-[164px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password1"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col sm:gap-4 sm:items-center sm:flex-row gap-2">
                  <FormLabel className="text-base font-normal sm:w-[150px]">
                    New Password :
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter New Password"
                      className="py-0 sm:w-[480px]"
                      type="password"
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-xs sm:pl-[158px] md:pl-[164px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password2"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col sm:gap-4 sm:items-center sm:flex-row gap-2">
                  <FormLabel className="text-base font-normal sm:w-[150px]">
                    Confirm Password :
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Confirm New Password"
                      className="py-0 sm:w-[480px]"
                      type="password"
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-xs sm:pl-[158px] md:pl-[164px]" />
              </FormItem>
            )}
          />
          <div className="flex justify-end md:justify-start md:pl-[525px]">
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:text-blue-800 text-sm font-semibold -my-2"
            >
              Forget Password?
            </Link>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto sm:ml-[164px]"
          >
            {isSubmitting ? (
              <div className="flex gap-1">
                <div className="flex justify-center items-center">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
                {"loading..."}
              </div>
            ) : (
              "Change Password"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;