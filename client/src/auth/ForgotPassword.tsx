import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  forgotPasswordDetails,
  forgotPasswordSchema,
  loginDetails,
} from "@/schema/userschema";

const ForgotPassword = () => {
  const [input, setInput] = useState<forgotPasswordDetails>({
    email: "",
  });

  const [errors, setErrors] = useState<Partial<forgotPasswordDetails>>({});

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const forgotPasswordSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    // validation
    const res = forgotPasswordSchema.safeParse(input);
    if (!res.success) {
      const fieldErrors = res.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<loginDetails>);
      return;
    }
    //api call
    console.log(input);
  };

  return (
    <section className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-sm p-4 md:rounded-xl md:px-8 md:py-10 md:border md:border-accent-100">
        <div className="flex justify-center mb-2">
          <img className="h-8" src="\src\assets\logo.svg" alt="" />
        </div>
        <p className="flex m-auto items-center justify-center max-w-[300px] text-sm text-center text-gray-500">
          Enter your email to reset your password.
        </p>

        {errors.email && (
          <p className="mt-3 text-sm text-center text-red-500 ">
            {errors.email}
          </p>
        )}

        <form
          className="mt-8"
          onChange={() => {
            setErrors({});
          }}
          onSubmit={forgotPasswordSubmitHandler}
        >
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

          <button
            className="mt-6 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Send Reset link &rarr;
            <BottomGradient />
          </button>
        </form>
        <p className="mt-2 text-xs text-center">
          Back to{" "}
          <Link className="font-semibold underline text-zinc-900" to="/login">
            Login
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

export default ForgotPassword;
