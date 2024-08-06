"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/actions/registerUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  const [error, setError] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setConfirmShowPassword] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(null);
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    if (password !== confirmPassword) {
      setIsPasswordMatch(false);
      return;
    }
    const r = await register({
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
    });
    ref.current?.reset();
    if (r?.error) {
      setError(r.error);
      return;
    } else {
      return router.push("/login");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  return (
    <div className="flex items-center justify-center m-8">
      <div className="p-8 rounded w-full sm:w-8/12 md:w-7/12 lg:w-5/12 bg-app-primary">
        {error && <div className="text-center text-red-800 mb-3">{error}</div>}
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

        <form action={handleSubmit} ref={ref}>
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
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
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
                value={confirmPassword}
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setIsPasswordMatch(null);
                }}
                className={`w-full px-4 py-2 text-black border border-slate-500 overflow-ellipsis ${
                  isPasswordMatch === false && "ring-4 ring-red-500"
                } rounded-full appearance-none`}
              />
              <button
                type="button"
                className="absolute text-black top-1/2 transform -translate-y-1/2 right-3"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
            </div>
            {isPasswordMatch === false && (
              <span className="pl-2 text-red-500 text-sm">
                Passwords do not match
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-app-tertiary text-white font-semibold py-2 rounded-full hover:bg-app-tertiary-dark my-4"
          >
            Register
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
          <Link href="/login" className="text-app-tertiary">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
