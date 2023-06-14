// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function Get() {
//   const [state, setState] = useState("");

//   useEffect(() => {
//     // apiCall();
//     //  get();
//   });

//   const get = () => {
//     axios
//       .get("https://quiz-back-end.vercel.app/hit")
//       .then(function (response) {
//         // handle success
//         let res = JSON.stringify(response);
//         console.log(res);
//         setState(res);
//       })
//       .catch(function (error) {
//         // handle error
//         console.log(error);
//       })
//       .finally(function () {
//         // always executed
//       });
//   };

//   const apiCall = async (e) => {
//     const url = `https://quiz-back-end.vercel.app/quizes`;
//     const req = axios.get(url);
//     const res = await req;
//     let response = JSON.stringify(res.data);
//     setState(response);
//   };

//   return <div>{state}</div>;
// }
