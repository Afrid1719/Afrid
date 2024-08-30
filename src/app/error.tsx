"use client";
import React, { useEffect } from "react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="p-4 md:p-5 flex justify-center">
      <button
        onClick={() => reset()}
        className="px-5 py-3 border-2 border-app-primary rounded-xl shadow shadow-app-primary transition-all hover:scale-105 hover:shadow-md hover:shadow-app-primary"
      >
        Try again
      </button>
    </div>
  );
}
