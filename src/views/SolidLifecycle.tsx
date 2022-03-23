import { Component, createSignal, onMount, onCleanup, onError } from "solid-js";
import SolidBrokenComponent from "./SolidBrokenComponent";

const SolidLifecycle: Component = () => {
  onMount(() => {
    console.log("mount!");
  });

  const [count, setCount] = createSignal(0);
  const interval = setInterval(() => setCount((c) => c + 1), 1000);
  onCleanup(() => clearInterval(interval));

  return (
    <div className="">
      <div className="">SolidBrokenComponent</div>
      <div>Count value is {count()}</div>
      <SolidBrokenComponent />
    </div>
  );
};

export default SolidLifecycle;
