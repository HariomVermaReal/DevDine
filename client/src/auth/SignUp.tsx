"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";

import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { signUpDetails, userSignUpSchema } from "@/schema/userschema";

const SignUp = () => {
  const [input, setInput] = useState<signUpDetails>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<signUpDetails>>({});
  const [firstError, setFirstError] = useState<string | null>(null);

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const signUpSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    // validation
    const res = userSignUpSchema.safeParse(input);
    if (!res.success) {
      const fieldErrors = res.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<signUpDetails>);

      // Get the first error message
      const firstErrorKey = Object.keys(
        fieldErrors
      )[0] as keyof typeof fieldErrors;
      setFirstError(fieldErrors[firstErrorKey]?.[0] || null);

      return;
    }
    //api call
    console.log(input);
  };

  return (
    <section className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-sm p-4 md:rounded-xl md:px-8 md:py-10 md:border md:border-accent-100">
        <div className="flex justify-center mb-8 ">
          <img className="h-8" src="\src\assets\logo.svg" alt="" />
        </div>

        {firstError && (
          <p className="-mt-3 text-sm text-center text-red-500 ">
            {firstError}
          </p>
        )}

        <form
          className="mt-8"
          onChange={() => {
            setErrors({});
            setFirstError(null);
          }}
          onSubmit={signUpSubmitHandler}
        >
          <div className="flex flex-col mb-4 space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                name="firstname"
                id="firstname"
                value={input.firstname}
                onChange={changeEventHandler}
                placeholder="Tyler"
                type="text"
                className={
                  errors.firstname ? "border-red-500 focus-visible:ring-0" : ""
                }
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                name="lastname"
                value={input.lastname}
                id="lastname"
                onChange={changeEventHandler}
                placeholder="Durden"
                type="text"
                className={
                  errors.lastname ? "border-red-500 focus-visible:ring-0" : ""
                }
              />
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              name="email"
              id="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="projectmayhem@fc.com"
              type="text"
              className={
                errors.email ? "border-red-500 focus-visible:ring-0" : ""
              }
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              id="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="••••••••"
              type="password"
              className={
                errors.password ? "border-red-500 focus-visible:ring-0" : ""
              }
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              name="confirmPassword"
              id="confirmPassword"
              value={input.confirmPassword}
              onChange={changeEventHandler}
              placeholder="••••••••"
              type="password"
              className={
                errors.confirmPassword
                  ? "border-red-500 focus-visible:ring-0"
                  : ""
              }
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
        </form>

        <p className="mt-2 text-xs text-center">
          Already have an account?{" "}
          <Link className="font-semibold underline text-zinc-900" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 block w-full h-px transition duration-500 opacity-0 group-hover/btn:opacity-100 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="absolute block w-1/2 h-px mx-auto transition duration-500 opacity-0 group-hover/btn:opacity-100 blur-sm -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default SignUp;
