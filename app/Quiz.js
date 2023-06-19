import React, { useState, useRef } from "react";
import { ImCheckboxChecked } from "react-icons/im";
import { MdLibraryAddCheck } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";

export default function Quiz() {
  //
  const num_of_que_ref = useRef(2);
  const num_of_opt_ref = useRef(2);
  const name_ref = useRef("");
  const desc_ref = useRef("");
  const duration_ref = useRef(0);
  const retake_ref = useRef(0);
  const price_ref = useRef(0);
  //
  const [quiz_settings, set_quiz_settings] = useState({
    name: "imaginary name",
    description: "",
    num_of_que: 2,
    num_of_opt: 2,
    time_limit: 30,
    retake: 0,
    price: 0,
    is_quiz_free: true,
    is_time_limit_per_que: false,
  });
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [count, setCount] = useState(0);
  const [que_add_mode, set_que_add_mode] = useState(false);
  const [error_msg, set_error_msg] = useState("...");

  function add_single_quiz(quetext, opt) {
    setQuestions([...questions, quetext]);
    setOptions([...options, opt]);
    setCount((prev) => prev + 1);
    console.log(JSON.stringify(opt));
  }

  function handle_submit(e) {
    e.preventDefault();
    let error = false;
    let name = name_ref.current.value;
    let description = desc_ref.current.value;
    let num_of_que = num_of_que_ref.current.value;
    let num_of_opt = num_of_opt_ref.current.value;
    let retake = retake_ref.current.value;
    let time_limit = duration_ref.current.value;
    let price = price_ref.current.value;
    //
    console.log("price: " + price);
    if (name == "") {
      error = true;
      set_error_msg("Must Enter A Name");
    }
    if (error == false && (time_limit < 1 || time_limit > 180)) {
      error = true;
      set_error_msg("Check quiz duration");
    }
    if (error == false && quiz_settings.is_quiz_free == false && price == 0) {
      error = true;
      set_error_msg("Paid quiz must have a price");
    }
    if (error == false) {
      set_quiz_settings({
        ...quiz_settings,
        num_of_que,
        num_of_opt,
        price,
        time_limit,
        retake,
      });
      set_que_add_mode(true);
    }
    setTimeout(() => {
      set_error_msg("");
    }, 5000);
  }

  function save_the_quiz() {
    try {
      fetch("https://quiz-back-end.vercel.app/quizes/add", {
        method: "post",
        body: JSON.stringify({
          questions: questions,
          options: options,
          settings: quiz_settings,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          set_error_msg(JSON.stringify(json));
          console.log(json.data + " :  " + JSON.stringify(json));
        });
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }

  return (
    <div className=" bg-slate-100 min-h-screen md:container mx-auto">
      <span className="text-red-600 font-semibold text-center h-8 block">
        {error_msg}
      </span>
      {que_add_mode == false ? (
        <form
          onSubmit={handle_submit}
          className="gap-5 flex flex-col md:bg-slate-200 sm:bg-slate-300 bg-slate-400 rounded-md py-3  px-2 w-full mx-auto"
        >
          <div className="flex flex-col  ">
            <span className="mx-auto font-semibold">Name</span>
            <input
              type="text"
              ref={name_ref}
              value={quiz_settings.name}
              onChange={() =>
                set_quiz_settings({
                  ...quiz_settings,
                  name: name_ref.current.value,
                })
              }
              className="text-center w-full rounded-md"
            ></input>
          </div>
          <div className="flex flex-col  ">
            <span className="mx-auto font-semibold">Description</span>
            <textarea
              ref={desc_ref}
              value={quiz_settings.description}
              onChange={() =>
                set_quiz_settings({
                  ...quiz_settings,
                  description: desc_ref.current.value,
                })
              }
              rows={3}
              cols={40}
              className="text-center w-full rounded-md"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-7 ">
            <span className="  ">Total Quiz Duration:</span>
            <span>
              <input
                type="number"
                min="0"
                max="180"
                ref={duration_ref}
                value={quiz_settings.time_limit}
                onChange={() =>
                  set_quiz_settings({
                    ...quiz_settings,
                    time_limit: duration_ref.current.value,
                  })
                }
                className="text-center rounded-md"
              ></input>
              <span className="px-2 text-amber-800 drop-shadow-sm ">
                Minutes
              </span>
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-7  ">
            <span className="  ">Time Limit ?</span>
            <span className="bg-slate-300 px-2 rounded-md text-amber-800 drop-shadow-sm ">
              <input
                type="checkbox"
                value={false}
                onChange={() =>
                  set_quiz_settings({
                    ...quiz_settings,
                    is_time_limit_per_que: !quiz_settings.is_time_limit_per_que,
                  })
                }
                checked={quiz_settings.is_time_limit_per_que}
              />
              <span className="px-2">Per Question</span>
            </span>
            <span className="bg-slate-300 px-2 rounded-md text-amber-800 drop-shadow-sm ">
              <input
                type="checkbox"
                value={true}
                onChange={() =>
                  set_quiz_settings({
                    ...quiz_settings,
                    is_time_limit_per_que: !quiz_settings.is_time_limit_per_que,
                  })
                }
                checked={!quiz_settings.is_time_limit_per_que}
              />
              <span className="px-2">Whole Quiz</span>
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:gap-5 sm:gap-1">
            <span className="  ">Paid or Free ?</span>

            <span className="bg-slate-300 px-2 rounded-md text-amber-800 drop-shadow-sm ">
              <input
                type="checkbox"
                value={true}
                onChange={() =>
                  set_quiz_settings({
                    ...quiz_settings,
                    is_quiz_free: !quiz_settings.is_quiz_free,
                  })
                }
                checked={!quiz_settings.is_quiz_free}
              />
              <span className="px-2">Paid</span>
              <span
                style={{
                  display: quiz_settings.is_quiz_free ? "none" : "inline",
                }}
              >
                <input
                  type="number"
                  min="0"
                  max="100000"
                  ref={price_ref}
                  value={quiz_settings.price}
                  onChange={() =>
                    set_quiz_settings({
                      ...quiz_settings,
                      price: price_ref.current.value,
                    })
                  }
                  className="text-center rounded-md"
                ></input>
                BDT
              </span>
            </span>
            <span className="bg-slate-300 px-2 rounded-md text-amber-800 drop-shadow-sm  ">
              <input
                type="checkbox"
                value={false}
                onChange={() =>
                  set_quiz_settings({
                    ...quiz_settings,
                    is_quiz_free: !quiz_settings.is_quiz_free,
                  })
                }
                checked={quiz_settings.is_quiz_free}
              />
              <span className="px-2">Free</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-7">
            <span>Retake:</span>

            <span>
              <input
                type="number"
                min="0"
                max="10"
                ref={retake_ref}
                value={quiz_settings.retake}
                onChange={() =>
                  set_quiz_settings({
                    ...quiz_settings,
                    retake: retake_ref.current.value,
                  })
                }
                className="text-center rounded-md"
              ></input>
              <span className="px-2 text-amber-800 drop-shadow-sm ">Times</span>
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:gap-5 gap-3">
            <span>
              Number Of Que:
              <input
                type="number"
                min="0"
                max="100"
                ref={num_of_que_ref}
                value={quiz_settings.num_of_que}
                onChange={() =>
                  set_quiz_settings({
                    ...quiz_settings,
                    num_of_que: num_of_que_ref.current.value,
                  })
                }
                className="text-center ms-2 w-20 rounded-md"
              ></input>
            </span>

            <span>
              Options Per Que:
              <input
                type="number"
                min="1"
                max="6"
                ref={num_of_opt_ref}
                value={quiz_settings.num_of_opt}
                onChange={() =>
                  set_quiz_settings({
                    ...quiz_settings,
                    num_of_opt: num_of_opt_ref.current.value,
                  })
                }
                className="text-center ms-2 w-20 rounded-md"
              ></input>
            </span>
          </div>

          <button
            type="submit"
            className="bg-slate-300 rounded-md px-5 hover:bg-amber-800 sm:w-1/2 me-auto"
          >
            <span className="text-amber-800 bg-slate-200 px-3 rounded-sm font-bold">
              SAVE
            </span>
          </button>
        </form>
      ) : (
        <div className=" text-black ">
          <ul className=" ">
            <li>
              <span className="font-mono font-semibold text-amber-900 me-2">
                Name:
              </span>
              {quiz_settings.name}
            </li>
            <li>
              <span className="font-mono font-semibold text-amber-900 me-2">
                Description:
              </span>
              {quiz_settings.description}
            </li>
            <li>
              <span className="font-mono font-semibold text-amber-900 me-2">
                {quiz_settings.num_of_que + "-Questions,"}
              </span>
              <span className="font-mono font-semibold text-amber-900 me-2">
                {quiz_settings.num_of_opt + "-Options,"}
              </span>
              <span className="font-mono font-semibold text-amber-900 me-2">
                {quiz_settings.retake + "-Retake,"}
              </span>
              <span className="font-mono font-semibold text-amber-900 me-2">
                {quiz_settings.is_quiz_free == true
                  ? "Free"
                  : "Paid-" + quiz_settings.price + "-BDT"}
              </span>
              <span className="font-mono font-semibold text-amber-900 me-2">
                {quiz_settings.time_limit + "-Minutes,"}
              </span>
            </li>
          </ul>
          <button
            onClick={() => {
              set_que_add_mode(false);
            }}
          >
            <CiEdit
              size={28}
              className=" bg-slate-300   px-1 py-1 rounded-md"
            />
          </button>
        </div>
      )}
      {que_add_mode && count < quiz_settings.num_of_que && (
        <QueItem
          num_of_que={quiz_settings.num_of_que}
          num_of_opt={quiz_settings.num_of_opt}
          add_single_quiz={add_single_quiz}
          count={count}
        />
      )}
      {count == quiz_settings.num_of_que && que_add_mode == true && (
        <button
          onClick={save_the_quiz}
          className="mt-10 text-xl font-mono font-semibold bg-slate-200 text-slate-200 bg-gradient-to-t from-teal-800 hover:bg-teal-500 mx-auto w-fit px-5  drop-shadow-sm rounded-sm "
        >
          Save Quiz
        </button>
      )}

      <div className="my-5 flex flex-col gap-5 px-2">
        {questions.map((queItem, ind) => {
          return (
            <ul className="">
              <span>{queItem}</span>
              {options[ind].map((itm, index) => {
                return (
                  <li className="block">
                    {itm.option + "  Ans:" + itm.is_right}
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
}

function QueItem({ num_of_que, num_of_opt, add_single_quiz, count }) {
  // const [questions, setQuestions] = useState([]);
  // const [options, setOptions] = useState([]);

  const [msg, setMsg] = useState("");
  let arr = [];
  for (let i = 0; i < num_of_opt; i++) {
    arr.push(0);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let option_set = [],
      option,
      is_right,
      is_valid = true,
      right_ans_checked = false,
      quetext;

    quetext = e.target[`quetext`].value;
    if (quetext == "") {
      is_valid = false;
      setMsg("Question can't be empty ");
    }
    if (is_valid == true) {
      for (let i = 0; i < num_of_opt; i++) {
        option = e.target[`opt-text-${i}`].value;
        is_right = e.target[`opt-status-${i}`].checked;
        if (option == "") {
          is_valid = false;
          setMsg("An option can't be empty ");
          break;
        }
        if (is_right == true) {
          right_ans_checked = true;
        }
        option_set.push({
          option,
          is_right,
        });
      }
    }
    if (is_valid == true && right_ans_checked == false) {
      is_valid = false;
      setMsg("At least one option should be answer ");
    }
    if (is_valid == true) {
      // setQuestions([...questions, quetext]);
      // setOptions([...options, option_set]);
      // setCount((prev) => prev + 1);
      add_single_quiz(quetext, option_set);
      document.getElementById("myForm").reset();
    }

    // setTimeout(() => {
    //   try {
    //     fetch("http://localhost:5000/quizes/add", {
    //       method: "post",
    //       body: JSON.stringify({
    //         questions: questions,
    //         options: options,
    //       }),
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //     })
    //       .then((res) => res.json())
    //       .then((json) => {
    //         console.log(json.data + "  pokath:  " + JSON.stringify(json));
    //       });
    //   } catch (err) {
    //     console.log(JSON.stringify(err));
    //   }
    // }, 2000);
  }

  return (
    <div className="bg-slate-100 p-3 flex flex-col sm:mt-5">
      <div className="flex sm:flex-row flex-col justify-between">
        <span className="font-semibold w-12 text-center">
          {count + 1}/{num_of_que}
          <hr className="shadow-md shadow-amber-600 w-12 h-1  "></hr>
        </span>{" "}
        <span>{msg}</span>
      </div>

      <form onSubmit={handleSubmit} id="myForm">
        <div className="flex flex-col rounded-md  mb-2">
          <span className="mx-auto font-bold text-teal-700 font-serif mb-1">
            Question:
          </span>
          <input
            type="text"
            name="quetext"
            placeholder="Write que here"
            className="text-center rounded-md "
          ></input>
        </div>
        <div className="flex flex-col  ">
          {arr.map((item, ind) => {
            return (
              <div
                className="my-3 flex sm:flex-row flex-col sm:gap-5"
                key={"spn-" + ind}
              >
                <span className="rounded-lg bg-teal-600  px-1 font-serif">
                  Ans Option-{ind + 1}
                </span>
                <span className="bg-slate-100 px-2 rounded-md">
                  Correct as answer ?
                  <input
                    type="checkbox"
                    className="mx-2"
                    //key={"chk-" + ind}
                    name={"opt-status-" + ind}
                  ></input>
                </span>

                <input
                  type="text"
                  className="text-center flex-grow rounded-md"
                  key={"txt-" + ind}
                  name={"opt-text-" + ind}
                ></input>
              </div>
            );
          })}
        </div>
        <button
          type="submit"
          className="mx-auto bg-slate-300  text-teal-800 px-1 rounded-md block text-lg font-bold font-mono drop-shadow-sm"
        >
          <ImCheckboxChecked
            size={15}
            className="inline mx-1 mb-1 text-amber-700 rounded-lg"
          />
          Done
        </button>
      </form>
    </div>
  );
}
