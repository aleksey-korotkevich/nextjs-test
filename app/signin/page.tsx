"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate, signUpAndAuthenticate } from "@/app/lib/actions";
import styles from "./page.module.css";
import { useState } from "react";

export default function Login() {
  const [state, setState] = useState<"signin" | "signup">("signin");
  const [errorMessage, dispatchAuth] = useFormState(authenticate, undefined);

  const handleDispatch = (payload: FormData) => {
    if (state === "signin") {
      dispatchAuth(payload);
    } else {
      signUpAndAuthenticate(payload);
    }
  };

  return (
    <div className="flex min-h-screen w-full h-48 flex-col items-center justify-between p-24 pt-0">
      <div className="grid-cols-2 grid gap-8 h-full w-full">
        <div className="w-full">
          <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
              <h1 className="text-3xl font-bold text-center text-gray-700">
                {state === "signin" ? "Sign in" : "Sign up"}
              </h1>
              <form action={handleDispatch} className="mt-6">
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mt-2">
                  <LoginButton state={state} />
                </div>

                <div
                  className="flex h-8 items-end space-x-1"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {errorMessage && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  )}
                </div>
              </form>

              {state === "signin" ? (
                <p className="mt-4 text-sm text-center text-gray-700">
                  Don't have an account?{" "}
                  <a
                    onClick={() => setState("signup")}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Sign up
                  </a>
                </p>
              ) : (
                <p className="mt-4 text-sm text-center text-gray-700">
                  Already have an account?{" "}
                  <a
                    onClick={() => setState("signin")}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Sign in
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className={`w-full ${styles.brandImage}`} />
      </div>
    </div>
  );
}

function LoginButton({ state }: { state: "signin" | "signup" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
      aria-disabled={pending}
    >
      {state === "signin" ? "Sign in" : "Sign up"}
    </button>
  );
}
