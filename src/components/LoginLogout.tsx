"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const LoginLogout = () => {
  const { status } = useSession();
  const router = useRouter();

  const handleLogout = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    try {
      await signOut({ callbackUrl: "/" });
    } catch (e) {
      console.error(e);
    }
  };
  return status === "authenticated" ? (
    <Link
      onClick={handleLogout}
      href="/logout"
      className="mr-5 hover:text-app-tertiary-dark text-app-tertiary text-xl"
    >
      <FontAwesomeIcon icon={faSignOutAlt} />
    </Link>
  ) : (
    <Link
      href="/login"
      className="mr-5 hover:text-app-tertiary-dark text-app-tertiary text-xl"
    >
      <FontAwesomeIcon icon={faSignInAlt} />
    </Link>
  );
};

export default LoginLogout;
