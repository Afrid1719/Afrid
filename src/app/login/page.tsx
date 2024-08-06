"use client";

import { useState, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { status } = useSession();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [error, setError] = useState("");
  const router = useRouter();

  if (status === "authenticated") {
    return router.push("/");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      let res = await signIn("credentials", {
        redirect: false,
        email: formData.get("email"),
        password: formData.get("password"),
      });
      if (res?.error) {
        setError(res.error as string);
      }
      if (res?.ok) {
        return router.push("/");
      }
      setIsLoggedIn(res?.ok);
    } catch (e) {
      console.error(e);
    }
  }

  const socialLogins = [
    {
      providerName: "google",
      icon: "google-icon.svg",
      url: "/",
    },
    {
      providerName: "facebook",
      icon: "fb-icon.svg",
      url: "/",
    },
    {
      providerName: "instagram",
      icon: "insta-icon.svg",
      url: "/",
    },
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSocialLogin = (
    evt: React.MouseEvent<HTMLAnchorElement>,
    provider: string,
  ) => {
    evt.preventDefault();
    signIn(provider);
  };

  return (
    <div className="flex items-center justify-center m-8">
      <div className="p-8 rounded w-full sm:w-8/12 md:w-7/12 lg:w-5/12 bg-app-primary">
        <h2 className="text-2xl font-semibold mb-6 text-center">Log in</h2>
        {isLoggedIn === false && (
          <p className="py-2 px-4 mb-3 text-white bg-red-600 rounded-md">
            Invalid credentials
          </p>
        )}

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
              required
              onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-black border overflow-ellipsis border-slate-500 rounded-full appearance-none"
              />
              <button
                type="button"
                className="absolute text-black top-1/2 transform -translate-y-1/2 right-3"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-app-tertiary text-white font-semibold py-2 rounded-full hover:bg-app-tertiary-dark my-4"
          >
            Login
          </button>
        </form>
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
        </div>
        <div className="my-4 text-center text-sm flex flex-col mt-5 space-y-4">
          <Link href="/" className="text-app-tertiary">
            Forgot Login or Password?
          </Link>
          <Link href="/register" className="text-app-tertiary">
            Don&apos;t have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
