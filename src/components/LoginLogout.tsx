"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

type PropTypes = {
  className?: string;
};

const LoginLogout = ({ className = "" }: PropTypes) => {
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
      className={`mr-5 text-app-tertiary text-xl ${className}`}
    >
      <FontAwesomeIcon icon={faSignOutAlt} />
    </Link>
  ) : (
    <Link
      href="/login"
      className={`mr-5 text-app-tertiary text-xl ${className}`}
    >
      <FontAwesomeIcon icon={faSignInAlt} />
    </Link>
  );
};

export default LoginLogout;
