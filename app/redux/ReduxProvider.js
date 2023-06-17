"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
//import { useSession } from "next-auth/client";

export default function ReduxProvider({ children }) {
  // const [session, loading] = useSession();

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (!session) {
  //   return <p>Please sign in</p>;
  // }

  return <Provider store={store}>{children}</Provider>;
}
