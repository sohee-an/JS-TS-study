import { setupCounter } from "./counter.js";

const res = fetch("https://jsonplaceholder.typicode.com/todos/1");
console.log(
  "res",
  res.then((res) => console.log(res))
);

function returnPromise() {
  return new Promise((resolve, reject) => {
    resolve("hi");
    reject("bye");
  });
}

setTimeout(() => {
  returnPromise().then((res) => console.log("res", res));
}, 3000);

document.querySelector("#app").innerHTML = `
  <div>
    <h1>hi</h1>
  </div>
`;

setupCounter(document.querySelector("#counter"));
