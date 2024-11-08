"use client";

import { User } from "@/types/types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import InputForm from "@/components/form/InputForm";
import Link from "next/link";
import { UseUserStore } from "@/store/useUserStore";

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<User>();
  const router = useRouter();
  const { data: session, status } = useSession();
  const {createUser} = UseUserStore()

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/inventory-management/home/dashboard");
    }
  }, [status, router]);

  const onSubmit = async (data: User) => {
    await createUser(data);
    router.push("/sign-in");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          label="Username"
          name="username"
          placeholder="Enter your username"
          register={register}
          error={errors.username?.message}
          
        />
        <InputForm
          label="Email"
          name="email"
          placeholder="Enter your email"
          type="email"
          register={register}
          error={errors.email?.message}
          
        />
        <InputForm
          label="Password"
          name="password"
          placeholder="Enter your password"
          type="password"
          register={register}
          error={errors.password?.message}
          
        />
        <div className="flex justify-center gap-2 items-center">

            <Button type="submit" variant="outline" className="w-full mt-4">
                Sign In
            </Button>
            <Button type="submit" variant="default" className="w-full mt-4" onClick={() => signIn("github")}>
                Sign In With Github
            </Button>
        </div>
        <Link href="/sign-in">Have an account? <span className="text-blue-500">Sign In</span></Link>
      </form>
    </div>
  );
};

export default SignIn;
