"use client";
import React, { useRef, useState } from "react";
import { logIn, logOut } from "./redux/slices/auth";
import { useSelector, useDispatch } from "react-redux";
import Quiz from "./Quiz";

export default function Home() {
  //
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passRef = useRef();
  const unameRef = useRef();
  const confirmPassRef = useRef();
  //
  const dispatch = useDispatch();
  const username = useSelector((state) => state.authReducer.value.username);
  //
  let handleSubmit = async (e) => {
    e.preventDefault();
    //
    if (passRef.current.value !== confirmPassRef.current.value) {
      setError("Passwords don't match");
      return;
    }
    if (passRef.current.value.length < 6) {
      setError("Password too short");
      return;
    } else {
      setError("");
      //
      try {
        fetch("http://localhost:5000/auth/signup", {
          method: "post",
          body: JSON.stringify({
            user_name: unameRef.current.value,
            email: emailRef.current.value,
            password: passRef.current.value,
          }),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json.data + "  pokath:  " + JSON.stringify(json));
          });

        // let res = await fetch("http://localhost:5000/auth/signup", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     user_name: unameRef.current.value,
        //     email: emailRef.current.value,
        //     password: passRef.current.value,
        //   }),
        // });
        // let resJson = await res.json();
        // console.log("...> "+resJson);
        // if (res.status === 200) {
        //   unameRef.current.value = "";
        //   emailRef.current.value = "";
        //   confirmPassRef.current.value = "";
        //   //
        //   setError("User created successfully");
        // } else {
        //   setError("Some error occured");
        // }
      } catch (err) {
        console.log(JSON.stringify(err));
      }
    }
  };
  //

  const inpClasses = "bg-slate-100 font-mono text-yellow-600";
  //
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Quiz />
      {/* <h1>hello: {username}</h1>
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
      <div className="theForm">
        <button
          onClick={() => {
            emailRef.current.value = "masum498673@gmail.com";
            passRef.current.value = "123456";
            confirmPassRef.current.value = "123456";
          }}
          className="btn btn-sm bg-slate-300"
        >
          test data
        </button>
        <form onSubmit={handleSubmit}>
          <div className="   text-start mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required={true}
              ref={emailRef}
              className={inpClasses}
              placeholder="Enter Email"
            />
          </div>
          <div className=" text-start mb-3">
            <label htmlFor="password ">Password</label>
            <input
              type="password"
              required={true}
              ref={passRef}
              className={inpClasses}
              placeholder="Password ?"
            />
          </div>
          <div className=" text-start mb-3">
            <label htmlFor="confirmpassword ">Confirm Password</label>
            <input
              type="password"
              required={true}
              ref={confirmPassRef}
              className={inpClasses}
              placeholder="Password again ... "
            />
          </div>

          <button type="submit">Register</button>

          <div className="message">{error ? <p>{error}</p> : null}</div>
        </form>
      </div> */}
    </main>
  );
}
