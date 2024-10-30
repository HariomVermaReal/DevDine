import { Input } from "@/components/ui/input";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  const [error, setError] = useState<string>("");

  const inputRef: any = useRef([]);

  const changeEventHandler = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOtp(newOTP);
      setError("");

      // Automatically move to the next field
      if (value !== "" && index < otp.length - 1) {
        inputRef.current[index + 1].focus();
      }
    } else {
      setError("Special characters are not allowed.");
    }
  };

  //move to previous field
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  //   const forgotPasswordSubmitHandler = (e: FormEvent) => {
  //     e.preventDefault();
  //     // validation
  //     const res = resetPasswordSchema.safeParse(input);
  //     if (!res.success) {
  //       const fieldErrors = res.error.formErrors.fieldErrors;
  //       setErrors(fieldErrors as Partial<resetPasswordDetails>);

  //       // Get the first error message
  //       const firstErrorKey = Object.keys(
  //         fieldErrors
  //       )[0] as keyof typeof fieldErrors;
  //       setFirstError(fieldErrors[firstErrorKey]?.[0] || null);
  //       return;
  //     }
  //     //api call
  //     console.log(input);
  //   };

  return (
    <section className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-sm p-4 md:rounded-xl md:px-8 md:py-10 md:border md:border-accent-100">
        <div className="flex justify-center mb-2">
          <img className="h-8" src="\src\assets\logo.svg" alt="" />
        </div>
        <p className="flex m-auto  max-w-[300px] text-sm text-center text-gray-500">
          We have sent the verification code to your email address.
        </p>

        {error && (
          <p className="mt-3 text-sm text-center text-red-500 ">{error}</p>
        )}

        <form
          className="mt-8"
          //   onSubmit={forgotPasswordSubmitHandler}
        >
          <div className="flex justify-between">
            {otp.map((letter: string, idx: number) => (
              <Input
                key={idx}
                ref={(element: HTMLInputElement) =>
                  (inputRef.current[idx] = element)
                }
                type="text"
                value={letter}
                maxLength={1}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(idx, e)
                }
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  changeEventHandler(idx, e.target.value)
                }
                className="w-10 h-10 p-2 text-xl font-semibold text-center"
              />
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <p className="mt-4 text-xs text-center cursor-pointer">
              Don't receive the code?{" "}
              <span className="font-semibold underline text-zinc-900">
                Resend Code
              </span>
            </p>
          </div>

          <button
            className="mt-6 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Verify
            <BottomGradient />
          </button>
        </form>
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

export default VerifyEmail;
