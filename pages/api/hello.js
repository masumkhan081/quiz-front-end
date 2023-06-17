// import client from "./connection";

// export default async function (req, res) {
//   // client.connect().then(() => {
//   //   console.log("connected");
//   client.query(
//     `Select * from users where email = 'email@gmail'`,
//     (err, result) => {
//       if (result) {
//         let data = result.rows;
//         console.log("something ...." + JSON.stringify(data));
//         if (data.length == 0) {
//           res.json({ msg: "no user found" });
//         } else {
//           res.json({ msg: "user found" });
//         }
//       }
//       if (err) {
//         res.send("error !");
//       }
//     }
//   );
//   client.end;
//   // });

//   // client.connect((err) => {
//   //   client.query("SELECT $1::text as message", ["Hello world!"], (err, res) => {
//   //     console.log(err ? err.stack : res.rows[0].message); // Hello World!
//   //     client.end();
//   //   });
//   // });
// }

// export const config = {
//   api: {
//     bodyParser: false,
//     responseLimit: false,
//     externalResolver: true,
//   },
// };
