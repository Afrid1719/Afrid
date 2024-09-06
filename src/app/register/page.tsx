"use client";
import { useReducer, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { register } from "@/actions/register-user";
import toast from "react-hot-toast";

type ACTIONTYPE =
  | { type: "set_password"; payload: string }
  | { type: "set_confirm_password"; payload: string }
  | { type: "set_show_password"; payload: boolean }
  | { type: "set_show_confirm_password"; payload: boolean }
  | { type: "set_is_submitting"; payload: boolean }
  | { type: "reset" };

const initialState = {
  password: "",
  confirmPassword: "",
  showPassword: false,
  showConfirmPassword: false,
  isSubmitting: false
};

const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "set_password":
      return { ...state, password: action.payload };
    case "set_confirm_password":
      return { ...state, confirmPassword: action.payload };
    case "set_show_password":
      return { ...state, showPassword: action.payload };
    case "set_show_confirm_password":
      return { ...state, showConfirmPassword: action.payload };
    case "set_is_submitting":
      return { ...state, isSubmitting: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

export default function Page() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const {
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    isSubmitting
  } = state;

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    if (password !== confirmPassword) {
      return;
    }
    try {
      dispatch({ type: "set_is_submitting", payload: true });
      await register({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        name: formData.get("name") as string
      });
      ref.current?.reset();
      dispatch({ type: "reset" });
      return router.push("/login");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
    } finally {
      dispatch({ type: "set_is_submitting", payload: false });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="p-8 rounded w-full sm:w-8/12 md:w-7/12 lg:w-5/12 xl:w-4/12 md:bg-app-primary">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create an account
        </h2>
        <form onSubmit={handleSubmit} ref={ref} autoComplete="off">
          <div className="mb-4">
            <label
              className="block text-gray-200 text-sm font-bold mb-2 ml-4"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 text-black border border-slate-500 rounded-full appearance-none"
            />
          </div>
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
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 text-black border border-slate-500 rounded-full appearance-none"
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
                required
                disabled={isSubmitting}
                onChange={(e) =>
                  dispatch({ type: "set_password", payload: e.target.value })
                }
                className="w-full px-4 py-2 text-black border overflow-ellipsis border-slate-500 rounded-full appearance-none"
              />
              <button
                type="button"
                className="absolute text-black top-1/2 transform -translate-y-1/2 right-3"
                onClick={() =>
                  dispatch({
                    type: "set_show_password",
                    payload: !showPassword
                  })
                }
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-200 text-sm font-bold mb-2 ml-4"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                required
                disabled={isSubmitting}
                onChange={(e) =>
                  dispatch({
                    type: "set_confirm_password",
                    payload: e.target.value
                  })
                }
                className={`w-full px-4 py-2 text-black border border-slate-500 overflow-ellipsis ${
                  password !== confirmPassword &&
                  !!confirmPassword &&
                  "ring-4 ring-red-500"
                } rounded-full appearance-none`}
              />
              <button
                type="button"
                className="absolute text-black top-1/2 transform -translate-y-1/2 right-3"
                onClick={() =>
                  dispatch({
                    type: "set_show_confirm_password",
                    payload: !showConfirmPassword
                  })
                }
              >
                {showConfirmPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
            </div>
            {password !== confirmPassword && !!confirmPassword && (
              <span className="pl-2 text-red-500 text-sm">
                Passwords do not match
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-app-tertiary text-white font-semibold py-2 rounded-full hover:bg-app-tertiary-dark my-4"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
        {/* TODO: Add Social Registration  */}

        {/* <div className="flex flex-row justify-between w-100 my-4">
          <hr className="max-w-[40%] w-full border-t-2 border-t-slate-500 self-center" />
          <span className=" text-center font-semibold px-2">OR</span>
          <hr className="max-w-[40%] w-full border-t-2 border-t-slate-500 self-center" />
        </div> */}
        {/* <div className="flex justify-center my-2">
          {socialLogins.map((social, idx) => (
            <Link
              href={"#"}
              onClick={(e) => handleSocialLogin(e, social.providerName)}
              className="p-2 mx-2 rounded-[20px] border border-slate-300 bg-white"
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
        </div> */}
        <div className="my-4 text-center text-sm flex flex-col mt-5 space-y-4">
          <Link
            href="/login"
            className={`text-app-tertiary ${
              isSubmitting ? "pointer-events-none" : ""
            }`}
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
