"use client";
import React, { useReducer } from "react";
import Card from "./Card";

const initialState = {
  name: "",
  email: "",
  message: "",
  isSubmitting: false
};

type ACTIONTYPE =
  | { type: "set_name"; payload: string }
  | { type: "set_email"; payload: string }
  | { type: "set_message"; payload: string }
  | { type: "set_is_submitting"; payload: boolean };

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
    default:
      return state;
  }
};

export default function GetInTouch() {
  const [state, dispatch] = useReducer(reducers, initialState);
  const { email, name, message, isSubmitting } = state;
  return (
    <Card className="p-4 md:p-5 mt-4 lg:w-3/5 lg:ml-auto">
      <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-extrabold mb-2">
        Get In Touch
      </h2>
      <form action="">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row gap-2 mb-2">
            <div className="md:w-1/2">
              <label
                className="block text-gray-200 text-sm font-bold mb-2 ml-4"
                htmlFor="Name"
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
          <div className="">
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
              required
              onChange={(e) =>
                dispatch({ type: "set_message", payload: e.target.value })
              }
              className={`w-full px-4 py-2 text-black border border-slate-500 rounded appearance-none`}
            />
          </div>
        </div>
        <button className="w-full md:w-auto block ml-auto mt-4 bg-app-tertiary hover:bg-app-tertiary-dark text-white font-bold py-2 px-4 rounded">
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </Card>
  );
}
