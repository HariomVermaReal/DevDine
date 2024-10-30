import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { loginDetails, userLoginSchema } from "@/schema/userschema";

const Login = () => {
  const [input, setInput] = useState<loginDetails>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<loginDetails>>({});
  const [firstError, setFirstError] = useState<string | null>(null);

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    // validation
    const res = userLoginSchema.safeParse(input);
    if (!res.success) {
      const fieldErrors = res.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<loginDetails>);

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
          onSubmit={loginSubmitHandler}
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

          <LabelInputContainer>
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

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="mt-1 mb-4 text-sm underline cursor-pointer text-zinc-900"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            className="mt-6 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Log in &rarr;
            <BottomGradient />
          </button>
        </form>
        <p className="mt-2 text-xs text-center">
          Don't have an account?{" "}
          <Link className="font-semibold underline text-zinc-900" to="/signup">
            Sign up
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

export default Login;
