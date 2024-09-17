"use client";
import React, { useReducer } from "react";
import Card from "./Card";
import Image from "next/image";

const initialState = {
  name: "",
  email: "",
  message: "",
  isSubmitting: false,
  messageSent: false
};

type ACTIONTYPE =
  | { type: "set_name"; payload: string }
  | { type: "set_email"; payload: string }
  | { type: "set_message"; payload: string }
  | { type: "set_is_submitting"; payload: boolean }
  | { type: "set_message_sent"; payload: boolean };

const reducers = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "set_email":
      return { ...state, email: action.payload };
    case "set_name":
      return { ...state, name: action.payload };
    case "set_message":
      return { ...state, message: action.payload };
    case "set_is_submitting":
      return { ...state, isSubmitting: action.payload };
    case "set_message_sent":
      return { ...state, messageSent: action.payload };
    default:
      return state;
  }
};

export default function GetInTouch() {
  const [state, dispatch] = useReducer(reducers, initialState);
  const { email, name, message, isSubmitting, messageSent } = state;

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch({ type: "set_is_submitting", payload: true });
    console.log(email, name, message);
    // Send data to the server
    setTimeout(() => {
      dispatch({ type: "set_is_submitting", payload: false });
      dispatch({ type: "set_message_sent", payload: true });
    }, 3000);
  };
  return (
    <div className="p-4 md:p-5">
      <Card className="p-4 mt-4 rounded-xl border-2 border-app-primary lg:w-3/5 lg:ml-auto xl:w-1/2 md:shadow-none">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-extrabold mb-2">
          Get In Touch
        </h2>
        <form onSubmit={handleSubmit} className="relative">
          <div
            className={`flex flex-col ${messageSent ? "invisible" : "visible"}`}
          >
            <div className="flex flex-col md:flex-row gap-2 mb-2">
              <div className="md:w-1/2">
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
                  disabled={isSubmitting}
                  required
                  onChange={(e) =>
                    dispatch({ type: "set_name", payload: e.target.value })
                  }
                  className={`w-full px-4 py-2 text-black border border-slate-500 rounded appearance-none`}
                />
              </div>
              <div className="md:w-1/2">
                <label
                  className="block text-gray-200 text-sm font-bold mb-2 ml-4"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  disabled={isSubmitting}
                  required
                  onChange={(e) =>
                    dispatch({ type: "set_email", payload: e.target.value })
                  }
                  className={`w-full px-4 py-2 text-black border border-slate-500 rounded appearance-none`}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-gray-200 text-sm font-bold mb-2 ml-4"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                disabled={isSubmitting}
                maxLength={500}
                required
                onChange={(e) =>
                  dispatch({ type: "set_message", payload: e.target.value })
                }
                className={`w-full px-4 py-2 text-black border border-slate-500 rounded appearance-none`}
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto block ml-auto mt-4 bg-app-secondary hover:bg-app-color-5 text-[#111] transition-all ease-in-out duration-300 font-bold py-2 px-4 rounded"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
          {messageSent && (
            <div
              className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-50 gap-y-2 ${
                messageSent ? "visible" : "invisible"
              }`}
            >
              <div>
                <Image
                  src="https://img.icons8.com/?size=100&id=pIPl8tqh3igN&format=png&color=000000"
                  width={100}
                  height={100}
                  alt="Message success icon"
                />
              </div>
              <div>Message sent successfully!</div>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}
