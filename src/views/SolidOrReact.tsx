//@ts-nocheck

import { Component, createSignal } from "solid-js";
import useState from "../hooks/useState";

export const SolidOrReact: Component = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="">
      {counter}
      <button onClick={() => setCounter((c) => c + 1)}>Increment</button>
    </div>
  );
};

export const ReactOrSolid: Component = () => {
  const [counter, setCounter] = createSignal(0);

  return (
    <div className="">
      {counter()}
      <button onClick={() => setCounter((c) => c + 1)}>Increment</button>
    </div>
  );
};
