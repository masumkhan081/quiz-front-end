import React, { useState, useRef } from "react";
import { ImCheckboxChecked } from "react-icons/im";
import { MdLibraryAddCheck } from "react-icons/md";
import { GrAdd } from "react-icons/gr";

export default function Quiz() {
  //

  const num_of_que_ref = useRef(2);
  const num_of_opt_ref = useRef(2);
  const [num_of_que, set_num_of_que] = useState();
  const [num_of_opt, set_num_of_opt] = useState();

  const [que_panel, set_que_panel] = useState(false);
  const [is_quiz_free, set_is_quiz_free] = useState(true);
  const [is_time_limit_per_que, set_is_time_limit_per_que] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    set_num_of_que(num_of_que_ref.current.value);
    set_num_of_opt(num_of_opt_ref.current.value);
    set_que_panel(true);
  }
  //

  const chkRef = useRef();
  //
  return (
    <div className="flex flex-col gap-4 bg-slate-200 min-h-screen   mx-auto container py-8">
      <div className="flex flex-col ">
        <span className="mx-auto ">Name:</span>
        <input
          type="text"
          className="text-center sm:w-3/4 sm:mx-auto mx-2 rounded-md"
        ></input>
      </div>
      <div className="flex flex-col ">
        <span className="mx-auto ">Description</span>
        <textarea
          name="quiz_description"
          rows={3}
          cols={40}
          className="text-center sm:w-3/4 sm:mx-auto mx-2 rounded-md"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:w-3/4 sm:mx-auto mx-2 gap-5 ">
        <span className="  ">Total Quiz Duration:</span>
        <span>
          <input type="number" className="text-center rounded-md"></input>
          <span className="px-2 text-amber-800 drop-shadow-sm ">Minutes</span>
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:w-3/4 sm:mx-auto mx-2 justify-between  ">
        <span className="  ">Time Limit ?</span>
        <span className="bg-slate-300 px-2 rounded-md text-amber-800 drop-shadow-sm ">
          <input
            type="checkbox"
            ref={chkRef}
            name="time_limit_per_que"
            value={true}
            onChange={() => set_is_time_limit_per_que(!is_time_limit_per_que)}
            checked={is_time_limit_per_que}
          />
          <span className="px-2">Per Question</span>
        </span>
        <span className="bg-slate-300 px-2 rounded-md text-amber-800 drop-shadow-sm  ">
          <input
            type="checkbox"
            ref={chkRef}
            name="time_limit_whole_quiz"
            value={false}
            onChange={() => set_is_time_limit_per_que(!is_time_limit_per_que)}
            checked={!is_time_limit_per_que}
          />
          <span className="px-2">Whole Quiz</span>
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:w-3/4 sm:mx-auto mx-2 justify-between">
        <span className="  ">Paid or Free ?</span>

        <span className="bg-slate-300 px-2 rounded-md text-amber-800 drop-shadow-sm ">
          <input
            type="checkbox"
            ref={chkRef}
            name="topping"
            value={true}
            onChange={() => set_is_quiz_free(!is_quiz_free)}
            checked={!is_quiz_free}
          />
          <span className="px-2">Paid</span>
        </span>
        <span className="bg-slate-300 px-2 rounded-md text-amber-800 drop-shadow-sm  ">
          <input
            type="checkbox"
            ref={chkRef}
            name="topping"
            value={false}
            onChange={() => set_is_quiz_free(!is_quiz_free)}
            checked={is_quiz_free}
          />
          <span className="px-2">Free</span>
        </span>
      </div>

      {is_quiz_free == false && (
        <div className="flex flex-col sm:flex-row sm:w-3/4 sm:mx-auto mx-2 gap-5">
          <span>Charge:</span>

          <span>
            <input type="number" className="text-center rounded-md"></input>
            <span className="px-2 text-amber-800 drop-shadow-sm ">BDT</span>
          </span>
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:w-3/4 sm:mx-auto mx-2 gap-5">
        <span>Retake:</span>

        <span>
          <input type="number" className="text-center rounded-md"></input>
          <span className="px-2 text-amber-800 drop-shadow-sm ">Times</span>
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row sm:w-3/4 sm:mx-auto mx-2 justify-between "
      >
        <span>
          Number Of Que:
          <input
            type="number"
            min="0"
            max="100"
            onChange={(e) => {}}
            value={2}
            className="text-center w-min ms-2 rounded-md"
            ref={num_of_que_ref}
          ></input>
        </span>

        <span>
          Options Per Que:
          <input
            type="number"
            min="1"
            max="6"
            value={2}
            onChange={(e) => {}}
            ref={num_of_opt_ref}
            className="text-center ms-2 rounded-md"
          ></input>
        </span>
        <button
          type="submit"
          className="bg-slate-300 rounded-md px-5 text-slate-200 hover:bg-slate-400"
        >
          <GrAdd size={22} className="text-slate-200 bg-slate-200 " />
        </button>
      </form>

      {que_panel && <QueItem num_of_que={num_of_que} num_of_opt={num_of_opt} />}
    </div>
  );
}

function QueItem({ num_of_que, num_of_opt }) {
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [count, setCount] = useState(0);
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
      error = false,
      quetext;

    quetext = e.target[`quetext`].value;
    if(quetext==""){
      error = true;
      setMsg("Question can't be empty ");
    }
    for (let i = 0; i < num_of_opt; i++) {
      option = e.target[`opt-text-${i}`].value;
      is_right = e.target[`opt-status-${i}`].checked;
      if (option == "") {
        error = true;
        setMsg("An option can't be empty ");
        break;
      }
      option_set.push({
        option,
        is_right,
      });
    }
    if (error == false) {
      setQuestions([...questions, quetext]);
      setOptions([...options, option_set]);
    }

    setCount((prev) => prev + 1);
    document.getElementById("myForm").reset();

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
  if (count < num_of_que)
    return (
      <div className="bg-slate-100 p-3 flex flex-col sm:mt-5">
        <div className="flex sm:flex-row flex-col justify-between">
          <span className="font-semibold w-12 text-center">
            {questions.length + 1}/{num_of_que}
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
                  className="my-2 flex sm:flex-row flex-col gap-5"
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

        {questions.map((itm, ind) => {
          return <span key={ind}>{itm}</span>;
        })}
      </div>
    );
}
