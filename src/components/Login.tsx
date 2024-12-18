"use client";

import React, { FormEvent, useReducer } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { socialLogins } from "@/utils/social-logins";
import { LuEye as Eye, LuEyeOff as EyeOff } from "react-icons/lu";

const initialState = {
  email: "",
  password: "",
  showPassword: false,
  isLoggingIn: false
};

type ACTIONTYPE =
  | { type: "set_email"; payload: string }
  | { type: "set_password"; payload: string }
  | { type: "set_show_password"; payload: boolean }
  | { type: "set_is_logging_in"; payload: boolean }
  | { type: "reset" };

const reducers = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "set_email":
      return { ...state, email: action.payload };
    case "set_password":
      return { ...state, password: action.payload };
    case "set_show_password":
      return { ...state, showPassword: action.payload };
    case "set_is_logging_in":
      return { ...state, isLoggingIn: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

const Login = ({
  title,
  isAdmin = false
}: {
  title: string;
  isAdmin?: boolean;
}) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  const { email, password, showPassword, isLoggingIn } = state;
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      dispatch({ type: "set_is_logging_in", payload: true });
      let res = await signIn("credentials", {
        redirect: false,
        isAdmin,
        email,
        password
      });
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      dispatch({ type: "reset" });
      return router.push("/");
    } catch (e: any) {
      console.error(e);
    } finally {
      dispatch({ type: "set_is_logging_in", payload: false });
    }
  }

  const handleSocialLogin = (
    evt: React.MouseEvent<HTMLAnchorElement>,
    provider: string
  ) => {
    evt.preventDefault();
    signIn(provider);
  };

  return (
    <React.Fragment>
      <h2 className="text-2xl font-semibold mb-6 text-center">{title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2 ml-4"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            disabled={isLoggingIn}
            required
            onChange={(e) =>
              dispatch({ type: "set_email", payload: e.target.value })
            }
            className={`w-full px-4 py-2 text-black border border-slate-500 rounded-full appearance-none`}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2 ml-4"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              disabled={isLoggingIn}
              required
              onChange={(e) =>
                dispatch({ type: "set_password", payload: e.target.value })
              }
              className={`w-full px-4 py-2 text-black border overflow-ellipsis border-slate-500 rounded-full appearance-none`}
            />
            <button
              type="button"
              className="absolute text-black top-1/2 transform -translate-y-1/2 right-3"
              disabled={isLoggingIn}
              onClick={() =>
                dispatch({
                  type: "set_show_password",
                  payload: !showPassword
                })
              }
            >
              {showPassword ? (
                <EyeOff className="w-6 h-6" />
              ) : (
                <Eye className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className={`w-full ${
            isAdmin
              ? "bg-[#111] md:hover:bg-gray-900 text-white border border-white md:border-none shadow-md"
              : "bg-app-tertiary hover:bg-app-tertiary-dark text-white"
          } font-semibold py-2 rounded-full  my-4`}
          disabled={isLoggingIn}
        >
          {isLoggingIn ? "Logging In..." : "Login"}
        </button>
      </form>
      {!isAdmin && (
        <>
          <div className="flex flex-row justify-between w-100 my-4">
            <hr className="max-w-[40%] w-full border-t-2 border-t-slate-500 self-center" />
            <span className=" text-center font-semibold px-2">OR</span>
            <hr className="max-w-[40%] w-full border-t-2 border-t-slate-500 self-center" />
          </div>
          <div className="flex justify-center my-2">
            {socialLogins.map((social, idx) => (
              <Link
                href={"#"}
                onClick={(e) => handleSocialLogin(e, social.providerName)}
                className={`p-2 mx-2 rounded-[20px] border border-slate-300 bg-white ${
                  isLoggingIn ? "pointer-events-none" : ""
                }`}
                key={`provider-${idx}`}
              >
                <Image
                  src={social.icon}
                  width={40}
                  height={40}
                  alt={social.providerName}
                />
              </Link>
            ))}
          </div>

          <div className="my-4 text-center text-sm flex flex-col mt-5 space-y-4">
            <Link
              href="/"
              className={`text-app-tertiary ${
                isLoggingIn ? "pointer-events-none" : ""
              }`}
            >
              Forgot Login or Password?
            </Link>
            <Link
              href="/register"
              className={`text-app-tertiary ${
                isLoggingIn ? "pointer-events-none" : ""
              }`}
            >
              Don&apos;t have an account?
            </Link>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default Login;
