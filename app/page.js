"use client";
import { logIn, logOut } from "./redux/slices/auth";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  //
  const dispatch = useDispatch();
  const username = useSelector((state) => state.authReducer.value.username);
  //

  //
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>hello: {username}</h1>
      <a href="/auth">auth</a>
      <a href="/dashboard">dashboard</a>
      <button
        onClick={() =>
          dispatch(
            logIn({
              username: "username-111",
              email: "email",
              user_id: "uid-1",
              role: "free user",
              isAuth: true,
            })
          )
        }
      >
        login
      </button>
      <button
        onClick={() => {
          dispatch(logOut());
        }}
      >
        logout
      </button>
      <a href="/auth/signin">auth - signin</a>
      <a href="/auth/signup">auth - signup</a>
    </main>
  );
}
