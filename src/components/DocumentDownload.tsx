"use client";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import toast from "react-hot-toast";

export default function DocumentDownload() {
  const handleClick = () => {
    toast.custom(
      <div className="bg-blue-500 p-3  rounded-lg relative">
        Download not implemented yet
      </div>
    );
  };
  return (
    <button
      className="mr-2 text-app-tertiary hover:text-app-tertiary-dark"
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faDownload} />
    </button>
  );
}